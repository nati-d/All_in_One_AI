"use client";

import {useState} from "react";
import Link from "next/link";
import {NAV_ITEMS, ACCOUNT_ITEM, LOGO_CONFIG} from "../constants/navbar";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-secondary backdrop-blur-sm border-b border-border/40'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo - Left Side */}
					<div className='flex-shrink-0'>
						<Link
							href={LOGO_CONFIG.href}
							className='flex items-center space-x-2'
							onClick={closeMenu}
						>
							<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
								<span className='text-primary-foreground font-bold text-lg'>A</span>
							</div>
							<span className='text-xl font-bold text-foreground'>{LOGO_CONFIG.text}</span>
						</Link>
					</div>

					{/* Desktop Navigation - Right Side */}
					<div className='hidden md:flex items-center space-x-8'>
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
								onClick={closeMenu}
								{...(item.external && {target: "_blank", rel: "noopener noreferrer"})}
							>
								{item.label}
							</Link>
						))}

						{/* Account Section */}
						<div className='flex items-center space-x-3 pl-4 border-l border-border/40'>
							<Link
								href={ACCOUNT_ITEM.href}
								className='flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors duration-200'
								onClick={closeMenu}
							>
								<div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center'>
									<svg
										className='w-4 h-4 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
										/>
									</svg>
								</div>
								<span className='text-sm font-medium'>{ACCOUNT_ITEM.label}</span>
							</Link>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden'>
						<button
							onClick={toggleMenu}
							className='inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>
							{/* Hamburger Icon */}
							<svg
								className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
							{/* Close Icon */}
							<svg
								className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-secondary backdrop-blur-sm border-b border-border/40`}>
				<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className='text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							onClick={closeMenu}
							{...(item.external && {target: "_blank", rel: "noopener noreferrer"})}
						>
							{item.label}
						</Link>
					))}
					<div className='pt-4 pb-3 border-t border-border/40'>
						<Link
							href={ACCOUNT_ITEM.href}
							className='flex items-center space-x-2 text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							onClick={closeMenu}
						>
							<div className='w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center'>
								<svg
									className='w-3 h-3 text-primary'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>
							</div>
							<span>{ACCOUNT_ITEM.label}</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
