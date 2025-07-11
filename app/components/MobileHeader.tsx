import React from "react";
import { Menu, X, Bot } from "lucide-react";

interface MobileHeaderProps {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

export function MobileHeader({ sidebarOpen, setSidebarOpen }: MobileHeaderProps) {
	return (
		<div className='lg:hidden relative overflow-hidden'>
			{/* Gradient Background */}
			<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10'></div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background'></div>

			{/* Glassmorphism Header */}
			<div className='relative backdrop-blur-xl bg-background/60 border-b border-border/30 p-3 sm:p-4'>
				<div className='flex items-center justify-between'>
					{/* Logo Section */}
					<div className='flex items-center space-x-2 sm:space-x-3'>
						<div className='relative'>
							<div className='w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg'>
								<span className='text-primary-foreground font-bold text-xs sm:text-sm'>A</span>
							</div>
							<div className='absolute -inset-1 bg-gradient-to-r from-primary/50 to-transparent rounded-xl blur-sm opacity-50'></div>
						</div>
						<div>
							<h1 className='text-base sm:text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
								All In One AI
							</h1>
							<p className='text-xs text-muted-foreground'>Your AI Assistant</p>
						</div>
					</div>

					{/* Menu Toggle */}
					<div
						className='relative group cursor-pointer'
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						{/* Glow Effect */}
						<div className='absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

						{/* Button Background */}
						<div className='relative bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
							{sidebarOpen ? (
								<X className='h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover:text-primary transition-colors duration-300' />
							) : (
								<Menu className='h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover:text-primary transition-colors duration-300' />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 