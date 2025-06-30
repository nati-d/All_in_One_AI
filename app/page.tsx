import Link from "next/link";

export default function Home() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center'>
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
							Welcome to <span className='text-primary'>AIA</span>
						</h1>
						<p className='text-xl text-foreground/80 mb-8 max-w-3xl mx-auto'>
							Your gateway to intelligent automation and innovative solutions. We help businesses transform their digital presence with
							cutting-edge technology.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								href='/get-started'
								className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200'
							>
								Get Started
							</Link>
							<Link
								href='/learn-more'
								className='border border-border hover:bg-accent px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200'
							>
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-accent/20'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>Why Choose AIA?</h2>
						<p className='text-lg text-foreground/80 max-w-2xl mx-auto'>
							We provide comprehensive solutions that drive growth and efficiency for your business.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='bg-background p-6 rounded-lg border border-border/40 hover:border-border transition-colors duration-200'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
								<svg
									className='w-6 h-6 text-primary'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 10V3L4 14h7v7l9-11h-7z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-foreground mb-2'>Lightning Fast</h3>
							<p className='text-foreground/70'>Experience blazing fast performance with our optimized solutions and cutting-edge technology.</p>
						</div>

						{/* Feature 2 */}
						<div className='bg-background p-6 rounded-lg border border-border/40 hover:border-border transition-colors duration-200'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
								<svg
									className='w-6 h-6 text-primary'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-foreground mb-2'>Secure & Reliable</h3>
							<p className='text-foreground/70'>Your data is protected with enterprise-grade security and 99.9% uptime guarantee.</p>
						</div>

						{/* Feature 3 */}
						<div className='bg-background p-6 rounded-lg border border-border/40 hover:border-border transition-colors duration-200'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
								<svg
									className='w-6 h-6 text-primary'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-foreground mb-2'>User Friendly</h3>
							<p className='text-foreground/70'>Intuitive interfaces designed with user experience in mind. Easy to use, powerful to operate.</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>Ready to Get Started?</h2>
					<p className='text-lg text-foreground/80 mb-8'>Join thousands of satisfied customers who have transformed their business with AIA.</p>
					<Link
						href='/contact'
						className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200'
					>
						Contact Us Today
					</Link>
				</div>
			</section>
		</div>
	);
}
