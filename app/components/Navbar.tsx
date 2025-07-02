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
		<nav className='fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border/50 shadow-sm'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-14 sm:h-16'>
					{/* Logo - Left Side */}
					<div className='flex-shrink-0'>
						<Link
							href={LOGO_CONFIG.href}
							className='flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200'
							onClick={closeMenu}
						>
							<div className='w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center'>
								<span className='text-primary-foreground font-bold text-sm sm:text-lg'>A</span>
							</div>
							<span className='text-lg sm:text-xl font-bold text-foreground'>{LOGO_CONFIG.text}</span>
						</Link>
					</div>

					{/* Desktop Navigation - Right Side */}
					<div className='hidden lg:flex items-center space-x-1'>
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='text-foreground/80 hover:text-foreground hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
								onClick={closeMenu}
								{...(item.external && {target: "_blank", rel: "noopener noreferrer"})}
							>
								{item.label}
							</Link>
						))}

						{/* Account Section */}
						<div className='flex items-center space-x-3 pl-4 ml-2 border-l border-border/40'>
							<Link
								href={ACCOUNT_ITEM.href}
								className='flex items-center space-x-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 px-3 py-2 rounded-lg transition-all duration-200'
								onClick={closeMenu}
							>
								<div className='w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center'>
									<svg
										className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary'
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
								<span className='text-sm font-medium hidden sm:block'>{ACCOUNT_ITEM.label}</span>
							</Link>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className='lg:hidden'>
						<button
							onClick={toggleMenu}
							className='inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-secondary transition-all duration-200'
							aria-expanded={isMenuOpen}
							aria-label='Toggle navigation menu'
						>
							<span className='sr-only'>Open main menu</span>
							{/* Hamburger Icon */}
							<svg
								className={`${isMenuOpen ? "hidden" : "block"} h-5 w-5`}
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
								className={`${isMenuOpen ? "block" : "hidden"} h-5 w-5`}
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
			<div
				className={`${
					isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
				} lg:hidden bg-secondary/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 ease-in-out overflow-hidden`}
			>
				<div className='px-4 py-3 space-y-1'>
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className='text-foreground/80 hover:text-foreground hover:bg-accent/50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200'
							onClick={closeMenu}
							{...(item.external && {target: "_blank", rel: "noopener noreferrer"})}
						>
							{item.label}
						</Link>
					))}
					<div className='pt-3 pb-2 border-t border-border/40 mt-3'>
						<Link
							href={ACCOUNT_ITEM.href}
							className='flex items-center space-x-3 text-foreground/80 hover:text-foreground hover:bg-accent/50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200'
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
							<span>{ACCOUNT_ITEM.label}</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
