import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from "axios";

// API Configuration
const API_BASE_URL = "https://all-in-one-619052101442.northamerica-northeast1.run.app";
const API_TIMEOUT = 10000; // 10 seconds

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
			// Unauthorized - redirect to login
			localStorage.removeItem("auth_token");
			window.location.href = "/login";
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
