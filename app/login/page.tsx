"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import apiClient from "../lib/axiosConfig";
import {useAuth} from "../contexts/AuthContext";
import {loginSchema, type LoginFormData} from "../lib/validations/auth";
import {Form, FormField, FormLabel, FormInput, FormError, FormButton} from "../components/ui/form";

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const {login} = useAuth();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "demo@example.com",
			password: "Demo123!",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError("");

		// Demo mode - default credentials until backend is ready
		const DEMO_CREDENTIALS = {
			email: "demo@example.com",
			password: "Demo123!",
		};

		// Check if using demo credentials
		if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Create demo user data
			const demoUser = {
				id: "demo-user-123",
				email: DEMO_CREDENTIALS.email,
				fullName: "Demo User",
			};

			// Use a demo token
			const demoToken = "demo-token-" + Date.now();

			login(demoToken, demoUser);
			router.push("/");
			return;
		}

		// If not demo credentials, try API call (will fail until backend is ready)
		try {
			const response = await apiClient.post("/auth/login", data);

			if (response.data.token) {
				login(response.data.token, response.data.user);
				router.push("/");
			}
		} catch (err: any) {
			console.error("Login error:", err);
			setError("Login failed. Please use demo credentials: demo@example.com / Demo123!");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				{/* Header */}
				<div className='text-center mb-8'>
					<Link
						href='/'
						className='inline-block mb-6'
					>
						<div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
							<span className='text-primary-foreground font-bold text-lg'>A</span>
						</div>
					</Link>

					<h1 className='text-2xl font-semibold text-foreground mb-2'>Welcome back</h1>
					<p className='text-muted-foreground'>Sign in to your account</p>

					{/* Demo credentials notice */}
					<div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
						<p className='text-blue-800 text-sm'>
							<strong>Demo Mode:</strong> Use demo@example.com / Demo123!
						</p>
					</div>
				</div>

				{/* Form */}
				<div className='bg-card border border-border rounded-2xl p-8 shadow-xl'>
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
					<div className='relative my-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-border'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-2 bg-card text-muted-foreground'>or</span>
						</div>
					</div>

					{/* Sign Up Link */}
					<div className='text-center'>
						<p className='text-muted-foreground text-sm'>
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
