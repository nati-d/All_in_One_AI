import Link from "next/link";

export default function Home() {
	return (
		<div className='min-h-screen bg-background overflow-hidden pt-16'>
			{/* Hero Section with Gradient Background */}
			<section
				className='relative pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden'
				style={{paddingTop: "var(--navbar-height, 4rem)"}}
			>
				{/* Animated Gradient Background */}
				<div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse'></div>
				<div className='absolute inset-0 bg-gradient-to-tl from-background via-transparent to-primary/10'></div>

				<div className='relative max-w-7xl mx-auto'>
					<div className='text-center'>
						{/* Main Heading */}
						<h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight'>
							Welcome to{" "}
							<span className='bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent animate-pulse'>
								All In On
							</span>
						</h1>

						{/* Subtitle */}
						<p className='text-xl sm:text-2xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed'>
							Experience the future of AI-powered conversations. Advanced language models designed for intelligent, contextual interactions.
						</p>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
							<Link
								href='/playground'
								className='group relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25'
							>
								<span className='relative z-10'>Try All In On</span>
								<div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							</Link>
							<Link
								href='/docs'
								className='group border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-accent/20'
							>
								View Documentation
							</Link>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
							<div className='text-center'>
								<div className='text-3xl font-bold text-primary mb-2'>99.9%</div>
								<div className='text-foreground/70'>Uptime</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl font-bold text-primary mb-2'>50M+</div>
								<div className='text-foreground/70'>Conversations</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl font-bold text-primary mb-2'>24/7</div>
								<div className='text-foreground/70'>Support</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
				{/* Background Pattern */}
				<div className='absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background'></div>

				<div className='relative max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-foreground mb-6'>
							Why Choose <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>All In On?</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-3xl mx-auto'>
							Built with cutting-edge technology to deliver intelligent, context-aware conversations.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/10'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative'>
								<div className='w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
									<svg
										className='w-7 h-7 text-primary-foreground'
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
								<p className='text-foreground/70 leading-relaxed'>
									Experience near-instant responses with our optimized AI models and infrastructure.
								</p>
							</div>
						</div>

						{/* Feature 2 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/10'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative'>
								<div className='w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
									<svg
										className='w-7 h-7 text-primary-foreground'
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
								<p className='text-foreground/70 leading-relaxed'>
									Your conversations are protected with enterprise-grade encryption and security protocols.
								</p>
							</div>
						</div>

						{/* Feature 3 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/10'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative'>
								<div className='w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
									<svg
										className='w-7 h-7 text-primary-foreground'
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
								<p className='text-foreground/70 leading-relaxed'>
									Advanced context understanding for more natural and intelligent conversations.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-l from-primary/5 via-background to-secondary/5'></div>
				<div className='relative max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-foreground mb-6'>
							Simple, Transparent <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Pricing</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-3xl mx-auto'>Choose the plan that fits your needs. No hidden fees, no surprises.</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
						{/* Starter Plan */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105'>
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
									className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Get Started
								</Link>
							</div>
						</div>

						{/* Pro Plan */}
						<div className='group relative bg-gradient-to-br from-primary/10 to-secondary/20 p-8 rounded-2xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 transform hover:scale-105'>
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<span className='bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold'>Most Popular</span>
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
									className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Get Started
								</Link>
							</div>
						</div>

						{/* Enterprise Plan */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105'>
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
									className='w-full border-2 border-primary hover:bg-primary/10 text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Contact Sales
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-r from-secondary/5 via-background to-primary/5'></div>
				<div className='relative max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-foreground mb-6'>
							What Our <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Users Say</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-3xl mx-auto'>
							Join thousands of satisfied customers who have transformed their workflows with All In On.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Testimonial 1 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-6 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-4'>
									<span className='text-primary-foreground font-bold text-lg'>S</span>
								</div>
								<div>
									<div className='font-semibold text-foreground'>Sarah Chen</div>
									<div className='text-sm text-foreground/70'>Product Manager</div>
								</div>
							</div>
							<p className='text-foreground/80 leading-relaxed'>
								"All In On has revolutionized how we handle customer support. The AI responses are incredibly accurate and our team can focus on
								complex cases."
							</p>
						</div>

						{/* Testimonial 2 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-6 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-4'>
									<span className='text-primary-foreground font-bold text-lg'>M</span>
								</div>
								<div>
									<div className='font-semibold text-foreground'>Mike Rodriguez</div>
									<div className='text-sm text-foreground/70'>CTO</div>
								</div>
							</div>
							<p className='text-foreground/80 leading-relaxed'>
								"The integration was seamless and the performance is outstanding. We've seen a 40% improvement in response times."
							</p>
						</div>

						{/* Testimonial 3 */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-6 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-4'>
									<span className='text-primary-foreground font-bold text-lg'>E</span>
								</div>
								<div>
									<div className='font-semibold text-foreground'>Emma Thompson</div>
									<div className='text-sm text-foreground/70'>Developer</div>
								</div>
							</div>
							<p className='text-foreground/80 leading-relaxed'>
								"Perfect for prototyping and testing AI features. The playground is intuitive and the API is well-documented."
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10'></div>
				<div className='relative max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl sm:text-5xl font-bold text-foreground mb-6'>
						Ready to Experience <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>All In On?</span>
					</h2>
					<p className='text-xl text-foreground/80 mb-8 leading-relaxed'>
						Join thousands of users who have transformed their conversations with intelligent AI assistance.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href='/playground'
							className='group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25'
						>
							Start Chatting Now
						</Link>
						<Link
							href='/pricing'
							className='group border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-accent/20'
						>
							View Pricing
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='py-16 px-4 sm:px-6 lg:px-8 border-t border-border/20'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div className='col-span-1 md:col-span-2'>
							<div className='flex items-center mb-4'>
								<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3'>
									<span className='text-primary-foreground font-bold text-lg'>A</span>
								</div>
								<span className='text-xl font-bold text-foreground'>All In On</span>
							</div>
							<p className='text-foreground/70 mb-4 max-w-md'>
								Advanced AI-powered conversations for the modern world. Experience intelligent, context-aware interactions.
							</p>
							<div className='flex space-x-4'>
								<a
									href='#'
									className='text-foreground/70 hover:text-primary transition-colors'
								>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
									</svg>
								</a>
								<a
									href='#'
									className='text-foreground/70 hover:text-primary transition-colors'
								>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' />
									</svg>
								</a>
								<a
									href='#'
									className='text-foreground/70 hover:text-primary transition-colors'
								>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
									</svg>
								</a>
							</div>
						</div>
						<div>
							<h3 className='font-semibold text-foreground mb-4'>Product</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Features
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										API
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Documentation
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='font-semibold text-foreground mb-4'>Company</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										About
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Blog
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Careers
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-foreground/70 hover:text-primary transition-colors'
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='border-t border-border/20 mt-12 pt-8 text-center'>
						<p className='text-foreground/70'>© 2024 All In On. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
