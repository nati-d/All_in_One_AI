"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "../contexts/AuthContext";
import {loginSchema, type LoginFormData} from "../lib/validations/auth";
import {Form, FormField, FormLabel, FormInput, FormError, FormButton} from "../components/ui/form";
import {loginUser} from "../api/auth";

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const {login} = useAuth();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await loginUser(data);

			if (response.token) {
				login(response.token, response.user);
				router.push("/");
			} else {
				setError("Invalid response from server. Please try again.");
			}
		} catch (err: any) {
			console.error("Login error:", err);

			// Extract error message from backend response
			let errorMessage = "Login failed. Please check your credentials and try again.";

			if (err.response?.data?.detail) {
				// Extract msg from detail array
				const details = err.response.data.detail;
				if (Array.isArray(details) && details.length > 0) {
					// Get all msg values from the detail array
					const messages = details.map((detail: any) => detail.msg).filter(Boolean);
					errorMessage = messages.join(", ");
				} else if (typeof details === "string") {
					errorMessage = details;
				}
			} else if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err.response?.data) {
				errorMessage = JSON.stringify(err.response.data, null, 2);
			} else if (err.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-background flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8'>
			<div className='max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8'>
				{/* Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<Link
						href='/'
						className='inline-block mb-4 sm:mb-6'
					>
						<div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center'>
							<span className='text-primary-foreground font-bold text-base sm:text-lg'>A</span>
						</div>
					</Link>

					<h1 className='text-xl sm:text-2xl font-semibold text-foreground mb-2'>Welcome back</h1>
					<p className='text-sm sm:text-base text-muted-foreground'>Sign in to your account</p>
				</div>

				{/* Form */}
				<div className='bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl'>
					<Form onSubmit={form.handleSubmit(onSubmit)}>
						{/* Email Field */}
						<FormField>
							<FormLabel htmlFor='email'>Email address</FormLabel>
							<FormInput
								id='email'
								type='email'
								autoComplete='email'
								placeholder='Enter your email'
								{...form.register("email")}
							/>
							{form.formState.errors.email && <FormError>{form.formState.errors.email.message}</FormError>}
						</FormField>

						{/* Password Field */}
						<FormField>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<FormInput
								id='password'
								type='password'
								autoComplete='current-password'
								placeholder='Enter your password'
								{...form.register("password")}
							/>
							{form.formState.errors.password && <FormError>{form.formState.errors.password.message}</FormError>}
						</FormField>

						{/* Error Message */}
						{error && (
							<div className='bg-destructive/10 border border-destructive/20 rounded-xl p-4'>
								<p className='text-destructive text-sm'>{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<FormButton
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin'></div>
									<span>Signing in...</span>
								</div>
							) : (
								"Sign in"
							)}
						</FormButton>
					</Form>

					{/* Divider */}
					<div className='relative my-4 sm:my-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-border'></div>
						</div>
						<div className='relative flex justify-center text-xs sm:text-sm'>
							<span className='px-2 bg-card text-muted-foreground'>or</span>
						</div>
					</div>

					{/* Sign Up Link */}
					<div className='text-center'>
						<p className='text-muted-foreground text-xs sm:text-sm'>
							Don't have an account?{" "}
							<Link
								href='/signup'
								className='text-primary hover:text-primary/80 font-medium transition-colors duration-200'
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className='text-center'>
					<p className='text-muted-foreground text-xs'>
						By signing in, you agree to our{" "}
						<Link
							href='/terms'
							className='text-primary hover:text-primary/80'
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href='/privacy'
							className='text-primary hover:text-primary/80'
						>
							Privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
