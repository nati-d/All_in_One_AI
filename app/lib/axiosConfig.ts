import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from "axios";

// Flag to prevent infinite retry loops
let isRefreshing = false;
let failedQueue: Array<{resolve: Function; reject: Function}> = [];

// Helper function to process the failed request queue
const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(({resolve, reject}) => {
		if (error) {
			reject(error);
		} else {
			resolve(token);
		}
	});

	failedQueue = [];
};

// Helper function to refresh the access token
const refreshAccessToken = async (): Promise<string> => {
	const refreshTokenValue = localStorage.getItem("refresh_token");
	
	if (!refreshTokenValue) {
		throw new Error("No refresh token available");
	}

	try {
		// Make direct axios call to avoid interceptor issues
		const response = await axios.post(
			`${API_BASE_URL}/api/v1/auth/refresh-token`,
			{ refresh_token: refreshTokenValue },
			{
				headers: { "Content-Type": "application/json" },
				timeout: API_TIMEOUT
			}
		);

		const { token, refresh_token } = response.data;
		
		// Update localStorage with new tokens
		localStorage.setItem("auth_token", token);
		localStorage.setItem("refresh_token", refresh_token);
		
		return token;
	} catch (error) {
		// Clear auth data if refresh fails
		localStorage.removeItem("auth_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		window.dispatchEvent(new CustomEvent("auth-cleared"));
		throw error;
	}
};

// API Configuration
const API_BASE_URL = "https://all-in-one-v1-619052101442.northamerica-northeast1.run.app";
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: API_TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Add auth token if available
		const token = localStorage.getItem("auth_token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	},
	(error) => {
		console.error("❌ Request Error:", error);
		return Promise.reject(error);
	}
);

// Response interceptor
apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		console.log(`✅ API Response: ${response.status} ${response.config.url}`);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		console.error(`❌ API Error: ${error.response?.status || "Network"} ${error.config?.url}`, error);

		// Handle 401 errors with token refresh
		if (error.response?.status === 401 && !originalRequest._retry) {
			// Skip refresh for auth endpoints to avoid infinite loops
			if (originalRequest.url?.includes('/auth/login') || 
				originalRequest.url?.includes('/auth/register') || 
				originalRequest.url?.includes('/auth/refresh-token')) {
				return Promise.reject(error);
			}

			originalRequest._retry = true;

			if (isRefreshing) {
				// If already refreshing, queue this request
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				}).then((token) => {
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${token}`;
					}
					return apiClient(originalRequest);
				}).catch((err) => {
					return Promise.reject(err);
				});
			}

			isRefreshing = true;

			try {
				const newToken = await refreshAccessToken();
				processQueue(null, newToken);
				
				// Retry the original request with new token
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
				}
				
				return apiClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		// Handle other error cases
		if (error.response?.status === 403) {
			// Forbidden - show access denied message
			console.error("Access denied");
		}

		if (error.code === "ECONNABORTED") {
			// Timeout error
			console.error("Request timeout");
		}

		return Promise.reject(error);
	}
);

export default apiClient;
