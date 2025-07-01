import Link from "next/link";

export default function PricingPage() {
	return (
		<div className='min-h-screen bg-background pt-24'>
			{/* Hero Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10'></div>
				<div className='relative max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
						Simple, Transparent <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Pricing</span>
					</h1>
					<p className='text-xl text-foreground/80 mb-8 leading-relaxed'>
						Choose the plan that fits your needs. No hidden fees, no surprises. Start free and scale as you grow.
					</p>
					<div className='flex items-center justify-center space-x-4 mb-8'>
						<span className='text-foreground/70'>Monthly</span>
						<div className='relative'>
							<input
								type='checkbox'
								id='billing-toggle'
								className='sr-only'
							/>
							<label
								htmlFor='billing-toggle'
								className='flex items-center cursor-pointer'
							>
								<div className='relative'>
									<div className='w-14 h-7 bg-secondary rounded-full shadow-inner'></div>
									<div className='absolute left-1 top-1 bg-primary w-5 h-5 rounded-full transition-transform duration-300 ease-in-out transform translate-x-0'></div>
								</div>
							</label>
						</div>
						<span className='text-foreground/70'>
							Yearly <span className='text-primary font-semibold'>Save 20%</span>
						</span>
					</div>
				</div>
			</section>

			{/* Pricing Plans */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{/* Starter Plan */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105'>
							<div className='text-center'>
								<h3 className='text-2xl font-bold text-foreground mb-4'>Starter</h3>
								<div className='text-5xl font-bold text-primary mb-2'>
									$9<span className='text-lg text-foreground/70'>/month</span>
								</div>
								<p className='text-foreground/70 mb-8'>Perfect for individuals and small projects</p>
								<ul className='text-left space-y-4 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Standard AI models
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										API access
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Basic analytics
									</li>
								</ul>
								<Link
									href='/playground'
									className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Get Started Free
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
								<div className='text-5xl font-bold text-primary mb-2'>
									$29<span className='text-lg text-foreground/70'>/month</span>
								</div>
								<p className='text-foreground/70 mb-8'>Ideal for growing businesses and teams</p>
								<ul className='text-left space-y-4 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Advanced AI models
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Advanced analytics
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Team collaboration
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Custom branding
									</li>
								</ul>
								<Link
									href='/playground'
									className='w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Start Pro Trial
								</Link>
							</div>
						</div>

						{/* Enterprise Plan */}
						<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105'>
							<div className='text-center'>
								<h3 className='text-2xl font-bold text-foreground mb-4'>Enterprise</h3>
								<div className='text-5xl font-bold text-primary mb-2'>Custom</div>
								<p className='text-foreground/70 mb-8'>For large organizations with specific needs</p>
								<ul className='text-left space-y-4 mb-8'>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Custom AI models
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										On-premise deployment
									</li>
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
									<li className='flex items-center text-foreground/80'>
										<svg
											className='w-5 h-5 text-primary mr-3 flex-shrink-0'
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
										Security compliance
									</li>
								</ul>
								<Link
									href='#contact'
									className='w-full border-2 border-primary hover:bg-primary/10 text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center'
								>
									Contact Sales
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Feature Comparison */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-t from-secondary/5 via-background to-primary/5'></div>
				<div className='relative max-w-6xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-foreground mb-6'>
							Feature <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Comparison</span>
						</h2>
						<p className='text-xl text-foreground/80 max-w-3xl mx-auto'>
							Compare features across all plans to find the perfect fit for your needs.
						</p>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='border-b border-border/20'>
									<th className='text-left py-4 px-6 font-semibold text-foreground'>Feature</th>
									<th className='text-center py-4 px-6 font-semibold text-foreground'>Starter</th>
									<th className='text-center py-4 px-6 font-semibold text-foreground'>Pro</th>
									<th className='text-center py-4 px-6 font-semibold text-foreground'>Enterprise</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-border/20'>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>Conversations per month</td>
									<td className='py-4 px-6 text-center text-foreground/80'>1,000</td>
									<td className='py-4 px-6 text-center text-foreground/80'>10,000</td>
									<td className='py-4 px-6 text-center text-foreground/80'>Unlimited</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>AI Models</td>
									<td className='py-4 px-6 text-center text-foreground/80'>Standard</td>
									<td className='py-4 px-6 text-center text-foreground/80'>Advanced</td>
									<td className='py-4 px-6 text-center text-foreground/80'>Custom</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>API Access</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>Custom Integrations</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>Team Collaboration</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>SLA Guarantee</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
								</tr>
								<tr>
									<td className='py-4 px-6 text-foreground/80'>On-premise Deployment</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center text-foreground/50'>-</td>
									<td className='py-4 px-6 text-center'>
										<svg
											className='w-5 h-5 text-primary mx-auto'
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
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='max-w-4xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-foreground mb-6'>
							Frequently Asked <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Questions</span>
						</h2>
						<p className='text-xl text-foreground/80'>Everything you need to know about All In On pricing and features.</p>
					</div>

					<div className='space-y-6'>
						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>Can I change my plan at any time?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing
								adjustments.
							</p>
						</div>

						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>What happens if I exceed my monthly limit?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								If you exceed your monthly conversation limit, we'll notify you and you can either upgrade your plan or wait until the next
								billing cycle. No surprise charges.
							</p>
						</div>

						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>Is there a free trial available?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								Yes! All plans come with a 14-day free trial. No credit card required to start. You can explore all features before committing
								to a paid plan.
							</p>
						</div>

						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>What kind of support do you offer?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								Starter plans include email support, Pro plans get priority support with faster response times, and Enterprise plans include
								dedicated support with phone and video calls.
							</p>
						</div>

						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>Can I cancel my subscription anytime?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the
								end of your current billing period.
							</p>
						</div>

						<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
							<h3 className='text-lg font-semibold text-foreground mb-3'>Do you offer refunds?</h3>
							<p className='text-foreground/80 leading-relaxed'>
								We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team for a full refund.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Enterprise Contact Form */}
			<section
				id='contact'
				className='py-16 px-4 sm:px-6 lg:px-8 relative'
			>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5'></div>
				<div className='relative max-w-4xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-foreground mb-6'>
							Need a <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Custom Solution?</span>
						</h2>
						<p className='text-xl text-foreground/80 mb-8'>Let's discuss how All In On can be tailored to your enterprise needs.</p>
					</div>

					<div className='bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20'>
						<form className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										htmlFor='first-name'
										className='block text-sm font-medium text-foreground mb-2'
									>
										First Name
									</label>
									<input
										type='text'
										id='first-name'
										className='w-full px-4 py-3 bg-secondary/20 border border-border/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent'
										placeholder='Enter your first name'
									/>
								</div>
								<div>
									<label
										htmlFor='last-name'
										className='block text-sm font-medium text-foreground mb-2'
									>
										Last Name
									</label>
									<input
										type='text'
										id='last-name'
										className='w-full px-4 py-3 bg-secondary/20 border border-border/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent'
										placeholder='Enter your last name'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-foreground mb-2'
								>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									className='w-full px-4 py-3 bg-secondary/20 border border-border/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent'
									placeholder='Enter your email address'
								/>
							</div>

							<div>
								<label
									htmlFor='company'
									className='block text-sm font-medium text-foreground mb-2'
								>
									Company
								</label>
								<input
									type='text'
									id='company'
									className='w-full px-4 py-3 bg-secondary/20 border border-border/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent'
									placeholder='Enter your company name'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-foreground mb-2'
								>
									Tell us about your needs
								</label>
								<textarea
									id='message'
									rows={4}
									className='w-full px-4 py-3 bg-secondary/20 border border-border/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none'
									placeholder='Describe your requirements, expected usage, and any specific features you need...'
								></textarea>
							</div>

							<div className='text-center'>
								<button
									type='submit'
									className='bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25'
								>
									Contact Sales Team
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl font-bold text-foreground mb-6'>
						Ready to Get <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Started?</span>
					</h2>
					<p className='text-xl text-foreground/80 mb-8 leading-relaxed'>
						Join thousands of users who have transformed their conversations with All In On.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href='/playground'
							className='group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25'
						>
							Start Free Trial
						</Link>
						<Link
							href='/docs'
							className='group border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-accent/20'
						>
							View Documentation
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
