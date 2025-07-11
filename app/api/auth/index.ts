import apiClient from "../../lib/axiosConfig";
import type {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshTokenRequest, RefreshTokenResponse} from "../../types/auth";

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
	try {
		const response = await apiClient.post("/api/v1/auth/login", credentials);
		console.log("Login response:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Login error:", error);
		throw error;
	}
};

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
	try {
		const response = await apiClient.post("/api/v1/auth/register", userData);
		console.log("Register response:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Register error:", error);
		throw error;
	}
};

export const refreshToken = async (refreshTokenData: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
	try {
		const response = await apiClient.post("/api/v1/auth/refresh-token", refreshTokenData);
		console.log("Refresh token response:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Refresh token error:", error);
		throw error;
	}
};
