import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from "axios";

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
	(error) => {
		console.error(`❌ API Error: ${error.response?.status || "Network"} ${error.config?.url}`, error);

		// Handle specific error cases
		if (error.response?.status === 401) {
			// Unauthorized - clear auth data but don't redirect here
			// Let the components handle navigation through useEffect
			localStorage.removeItem("auth_token");
			localStorage.removeItem("refresh_token");
			localStorage.removeItem("user");
			
			// Dispatch custom event to notify auth context
			window.dispatchEvent(new CustomEvent("auth-cleared"));
		}

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
