"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface User {
	id: string;
	email: string;
	display_name: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string, refreshToken: string, user: User) => void;
	logout: () => void;
	loading: boolean;
	updateTokens: (token: string, refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
	const [user, setUser] = useState<User | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for existing auth token on app load
		const checkAuthState = () => {
			const token = localStorage.getItem("auth_token");
			const storedRefreshToken = localStorage.getItem("refresh_token");
			const userData = localStorage.getItem("user");

			if (token && userData) {
				try {
					const parsedUser = JSON.parse(userData);
					setUser(parsedUser);
					setRefreshToken(storedRefreshToken);
				} catch (error) {
					console.error("Error parsing user data:", error);
					localStorage.removeItem("auth_token");
					localStorage.removeItem("refresh_token");
					localStorage.removeItem("user");
					setUser(null);
					setRefreshToken(null);
				}
			} else {
				// Clear state if no token found
				setUser(null);
				setRefreshToken(null);
			}
			setLoading(false);
		};

		checkAuthState();

		// Listen for storage changes (e.g., when axios interceptor clears localStorage)
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "auth_token" && !e.newValue) {
				// Token was removed, clear user state
				setUser(null);
				setRefreshToken(null);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		// Also listen for custom events in case the change happens in the same tab
		const handleAuthClear = () => {
			console.log("🔥 Auth cleared event received - logging out user");
			setUser(null);
			setRefreshToken(null);
		};

		// Listen for token updates from axios interceptor
		const handleTokensUpdated = (event: any) => {
			console.log("🔄 Tokens updated event received - updating AuthContext");
			const { refresh_token } = event.detail;
			setRefreshToken(refresh_token);
		};

		window.addEventListener("auth-cleared", handleAuthClear);
		window.addEventListener("tokens-updated", handleTokensUpdated);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("auth-cleared", handleAuthClear);
			window.removeEventListener("tokens-updated", handleTokensUpdated);
		};
	}, []);

	const login = (token: string, refreshTokenValue: string, userData: User) => {
		localStorage.setItem("auth_token", token);
		localStorage.setItem("refresh_token", refreshTokenValue);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		setRefreshToken(refreshTokenValue);
	};

	const logout = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		setUser(null);
		setRefreshToken(null);
	};

	const updateTokens = (token: string, refreshTokenValue: string) => {
		localStorage.setItem("auth_token", token);
		localStorage.setItem("refresh_token", refreshTokenValue);
		setRefreshToken(refreshTokenValue);
	};

	const value = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
		loading,
		updateTokens,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
