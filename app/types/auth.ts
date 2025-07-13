export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	refresh_token: string;
	user: {
		id: string;
		email: string;
		display_name: string;
	};
}

export interface RegisterRequest {
	display_name: string;
	email: string;
	password: string;
}

export interface RegisterResponse {
	token: string;
	refresh_token: string;
	user: {
		id: string;
		email: string;
		display_name: string;
	};
}

export interface RefreshTokenRequest {
	refresh_token: string;
}

export interface RefreshTokenResponse {
	access_token: string;
	refresh_token: string;
	token_type: string;
}
