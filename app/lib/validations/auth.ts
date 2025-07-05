import {z} from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
	display_name: z.string().min(1, "Display name is required").min(2, "Display name must be at least 2 characters").max(50, "Display name must be less than 50 characters"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
