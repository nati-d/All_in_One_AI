"use client";

import {useState} from "react";
import Link from "next/link";

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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<Link
							href='/'
							className='flex items-center space-x-2'
							onClick={closeMenu}
						>
							<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
								<span className='text-primary-foreground font-bold text-lg'>A</span>
							</div>
							<span className='text-xl font-bold text-foreground'>AIA</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:block'>
						<div className='ml-10 flex items-baseline space-x-8'>
							<Link
								href='/'
								className='text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
								onClick={closeMenu}
							>
								Home
							</Link>
							<Link
								href='/about'
								className='text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
								onClick={closeMenu}
							>
								About
							</Link>
							<Link
								href='/services'
								className='text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
								onClick={closeMenu}
							>
								Services
							</Link>
							<Link
								href='/contact'
								className='text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
								onClick={closeMenu}
							>
								Contact
							</Link>
						</div>
					</div>

					{/* CTA Button */}
					<div className='hidden md:block'>
						<Link
							href='/get-started'
							className='bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
							onClick={closeMenu}
						>
							Get Started
						</Link>
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
					<Link
						href='/'
						className='text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
						onClick={closeMenu}
					>
						Home
					</Link>
					<Link
						href='/about'
						className='text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
						onClick={closeMenu}
					>
						About
					</Link>
					<Link
						href='/services'
						className='text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
						onClick={closeMenu}
					>
						Services
					</Link>
					<Link
						href='/contact'
						className='text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
						onClick={closeMenu}
					>
						Contact
					</Link>
					<div className='pt-4 pb-3 border-t border-border/40'>
						<Link
							href='/get-started'
							className='bg-primary text-primary-foreground hover:bg-primary/90 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							onClick={closeMenu}
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
