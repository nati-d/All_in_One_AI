"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import apiClient from "../lib/axiosConfig";
import {useAuth} from "../contexts/AuthContext";

export default function SignupPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		fullName: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const {login} = useAuth();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError(""); // Clear error when user starts typing
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await apiClient.post("/auth/signup", formData);

			if (response.data.token) {
				login(response.data.token, response.data.user);
				router.push("/");
			}
		} catch (err: any) {
			console.error("Signup error:", err);
			setError(err.response?.data?.message || "Signup failed. Please try again.");
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

					<h1 className='text-2xl font-semibold text-foreground mb-2'>Create your account</h1>
					<p className='text-muted-foreground'>Get started with All In One AI</p>
				</div>

				{/* Form */}
				<div className='bg-card border border-border rounded-2xl p-8 shadow-xl'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						{/* Full Name Field */}
						<div>
							<label
								htmlFor='fullName'
								className='block text-sm font-medium text-foreground mb-2'
							>
								Full name
							</label>
							<input
								id='fullName'
								name='fullName'
								type='text'
								autoComplete='name'
								required
								value={formData.fullName}
								onChange={handleInputChange}
								className='w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
								placeholder='Enter your full name'
							/>
						</div>

						{/* Email Field */}
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-foreground mb-2'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={formData.email}
								onChange={handleInputChange}
								className='w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
								placeholder='Enter your email'
							/>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-foreground mb-2'
							>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='new-password'
								required
								value={formData.password}
								onChange={handleInputChange}
								className='w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
								placeholder='Create a password'
							/>
							<p className='text-xs text-muted-foreground mt-2'>Password must be at least 8 characters long</p>
						</div>

						{/* Error Message */}
						{error && (
							<div className='bg-destructive/10 border border-destructive/20 rounded-xl p-4'>
								<p className='text-destructive text-sm'>{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed'
						>
							{isLoading ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin'></div>
									<span>Creating account...</span>
								</div>
							) : (
								"Create account"
							)}
						</button>
					</form>

					{/* Divider */}
					<div className='relative my-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-border'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-2 bg-card text-muted-foreground'>or</span>
						</div>
					</div>

					{/* Sign In Link */}
					<div className='text-center'>
						<p className='text-muted-foreground text-sm'>
							Already have an account?{" "}
							<Link
								href='/login'
								className='text-primary hover:text-primary/80 font-medium transition-colors duration-200'
							>
								Sign in
							</Link>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className='text-center'>
					<p className='text-muted-foreground text-xs'>
						By creating an account, you agree to our{" "}
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
