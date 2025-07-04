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
	login: (token: string, user: User) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for existing auth token on app load
		const token = localStorage.getItem("auth_token");
		const userData = localStorage.getItem("user");

		if (token && userData) {
			try {
				const parsedUser = JSON.parse(userData);
				setUser(parsedUser);
			} catch (error) {
				console.error("Error parsing user data:", error);
				localStorage.removeItem("auth_token");
				localStorage.removeItem("user");
			}
		}
		setLoading(false);
	}, []);

	const login = (token: string, userData: User) => {
		localStorage.setItem("auth_token", token);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user");
		setUser(null);
	};

	const value = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
		loading,
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
