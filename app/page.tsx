import Link from "next/link";

export default function Home() {
	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section
				className='relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8'
				style={{paddingTop: "var(--navbar-height, 4rem)"}}
			>
				{/* Simple Background */}
				<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5'></div>

				<div className='relative max-w-7xl mx-auto w-full'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						{/* Left Column - Content */}
						<div className='text-left'>
							{/* Badge */}
							<div className='inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6'>
								<div className='w-2 h-2 bg-primary rounded-full'></div>
								<span className='text-sm font-medium text-primary'>AI-Powered Platform</span>
							</div>

							{/* Main Heading */}
							<h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight'>
								The Future of <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>AI Conversations</span>
							</h1>

							{/* Subtitle */}
							<p className='text-xl text-foreground/80 mb-8 leading-relaxed'>
								Experience <span className='text-primary font-semibold'>All In One AI</span> - Advanced language models designed for
								intelligent, contextual interactions.
							</p>

							{/* CTA Buttons */}
							<div className='flex flex-col sm:flex-row gap-4 mb-8'>
								<Link
									href='/playground'
									className='bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors'
								>
									Try All In One AI
								</Link>
								<Link
									href='/pricing'
									className='border border-border hover:border-primary/50 bg-background px-8 py-4 rounded-xl text-lg font-semibold transition-colors'
								>
									View Pricing
								</Link>
							</div>

							{/* Stats */}
							<div className='grid grid-cols-3 gap-4'>
								<div className='bg-background/50 border border-border/20 p-4 rounded-xl'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-primary mb-1'>99.9%</div>
										<div className='text-foreground/70 text-sm'>Uptime</div>
									</div>
								</div>
								<div className='bg-background/50 border border-border/20 p-4 rounded-xl'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-primary mb-1'>50M+</div>
										<div className='text-foreground/70 text-sm'>Conversations</div>
									</div>
								</div>
								<div className='bg-background/50 border border-border/20 p-4 rounded-xl'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-primary mb-1'>24/7</div>
										<div className='text-foreground/70 text-sm'>Support</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Simple Visual */}
						<div className='relative flex items-center justify-center'>
							<div className='relative w-80 h-80'>
								{/* Central Circle */}
								<div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl'>
									<svg
										className='w-20 h-20 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
										/>
									</svg>
								</div>

								{/* Simple Nodes */}
								<div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full'></div>
								<div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full'></div>
								<div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full'></div>
								<div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-secondary rounded-full'></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-foreground mb-4'>
							Why Choose <span className='text-primary'>All In One AI?</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-2xl mx-auto'>
							Built with cutting-edge technology to deliver intelligent, context-aware conversations.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='bg-background border border-border/20 p-8 rounded-xl'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6'>
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
							<h3 className='text-xl font-semibold text-foreground mb-3'>Lightning Fast</h3>
							<p className='text-foreground/70'>Experience near-instant responses with our optimized AI models and infrastructure.</p>
						</div>

						{/* Feature 2 */}
						<div className='bg-background border border-border/20 p-8 rounded-xl'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6'>
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
							<h3 className='text-xl font-semibold text-foreground mb-3'>Enterprise Security</h3>
							<p className='text-foreground/70'>Your conversations are protected with enterprise-grade encryption and security protocols.</p>
						</div>

						{/* Feature 3 */}
						<div className='bg-background border border-border/20 p-8 rounded-xl'>
							<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6'>
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
							<h3 className='text-xl font-semibold text-foreground mb-3'>Context Aware</h3>
							<p className='text-foreground/70'>Advanced context understanding for more natural and intelligent conversations.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 bg-background/50'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-foreground mb-4'>
							Simple, Transparent <span className='text-primary'>Pricing</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-2xl mx-auto'>Choose the plan that fits your needs. No hidden fees, no surprises.</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
						{/* Starter Plan */}
						<div className='bg-background border border-border/20 p-8 rounded-xl'>
							<div className='text-center'>
								<h3 className='text-2xl font-bold text-foreground mb-4'>Starter</h3>
								<div className='text-4xl font-bold text-primary mb-2'>
									$9<span className='text-lg text-foreground/70'>/month</span>
								</div>
								<p className='text-foreground/70 mb-6'>Perfect for individuals and small projects</p>
								<ul className='text-left space-y-3 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										1,000 conversations/month
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Basic support
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Standard models
									</li>
								</ul>
								<Link
									href='/pricing'
									className='w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors block text-center'
								>
									Get Started
								</Link>
							</div>
						</div>

						{/* Pro Plan */}
						<div className='bg-background border-2 border-primary p-8 rounded-xl relative'>
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<span className='bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold'>Most Popular</span>
							</div>
							<div className='text-center'>
								<h3 className='text-2xl font-bold text-foreground mb-4'>Pro</h3>
								<div className='text-4xl font-bold text-primary mb-2'>
									$29<span className='text-lg text-foreground/70'>/month</span>
								</div>
								<p className='text-foreground/70 mb-6'>Ideal for growing businesses and teams</p>
								<ul className='text-left space-y-3 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										10,000 conversations/month
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Priority support
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Advanced models
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Custom integrations
									</li>
								</ul>
								<Link
									href='/pricing'
									className='w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors block text-center'
								>
									Get Started
								</Link>
							</div>
						</div>

						{/* Enterprise Plan */}
						<div className='bg-background border border-border/20 p-8 rounded-xl'>
							<div className='text-center'>
								<h3 className='text-2xl font-bold text-foreground mb-4'>Enterprise</h3>
								<div className='text-4xl font-bold text-primary mb-2'>Custom</div>
								<p className='text-foreground/70 mb-6'>For large organizations with specific needs</p>
								<ul className='text-left space-y-3 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Unlimited conversations
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Dedicated support
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Custom models
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										SLA guarantee
									</li>
								</ul>
								<Link
									href='/contact'
									className='w-full border border-primary hover:bg-primary/10 text-primary px-6 py-3 rounded-xl font-semibold transition-colors block text-center'
								>
									Contact Sales
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl font-bold text-foreground mb-6'>
						Ready to Experience <span className='text-primary'>All In One AI?</span>
					</h2>
					<p className='text-xl text-foreground/80 mb-8'>
						Join thousands of users who have transformed their conversations with intelligent AI assistance.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href='/playground'
							className='bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors'
						>
							Start Chatting Now
						</Link>
						<Link
							href='/pricing'
							className='border border-border hover:border-primary/50 bg-background px-8 py-4 rounded-xl text-lg font-semibold transition-colors'
						>
							View Pricing
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='py-12 px-4 sm:px-6 lg:px-8 border-t border-border/20'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<div className='flex items-center mb-4 md:mb-0'>
							<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3'>
								<span className='text-white font-bold text-lg'>A</span>
							</div>
							<span className='text-xl font-bold text-foreground'>All In One AI</span>
						</div>
						<div className='flex space-x-6'>
							<Link
								href='/pricing'
								className='text-foreground/70 hover:text-primary transition-colors'
							>
								Pricing
							</Link>
							<Link
								href='/playground'
								className='text-foreground/70 hover:text-primary transition-colors'
							>
								Playground
							</Link>
							<Link
								href='/dashboard'
								className='text-foreground/70 hover:text-primary transition-colors'
							>
								Dashboard
							</Link>
						</div>
					</div>
					<div className='border-t border-border/20 mt-8 pt-8 text-center'>
						<p className='text-foreground/70'>© 2024 All In One AI. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
