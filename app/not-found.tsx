"use client";

import Link from "next/link";
import {Home, ArrowLeft} from "lucide-react";
import {useState, useEffect} from "react";

export default function NotFound() {
	const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({x: e.clientX, y: e.clientY});
		};

		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, []);

	const handleGoBack = () => {
		if (typeof window !== "undefined") {
			window.history.back();
		}
	};

	return (
		<div
			className='min-h-screen bg-background relative overflow-hidden'
			style={{paddingTop: "var(--navbar-height, 4rem)"}}
		>
			{/* Animated background elements */}
			<div className='absolute inset-0'>
				<div
					className='absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse'
					style={{
						left: isClient ? mousePosition.x * 0.02 + "px" : "50%",
						top: isClient ? mousePosition.y * 0.02 + "px" : "50%",
					}}
				/>
				<div
					className='absolute w-80 h-80 bg-gradient-to-r from-secondary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000'
					style={{
						right: isClient ? (window.innerWidth - mousePosition.x) * 0.015 + "px" : "20%",
						bottom: isClient ? (window.innerHeight - mousePosition.y) * 0.015 + "px" : "20%",
					}}
				/>
				<div className='absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-primary/15 to-cyan-500/15 rounded-full blur-2xl animate-bounce delay-500' />
			</div>

			{/* Main content */}
			<div className='relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,4rem))] px-4'>
				{/* 404 Number with vibrant gradient */}
				<div className='mb-8 relative'>
					<h1 className='text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse'>
						404
					</h1>
					<div className='absolute inset-0 text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 bg-clip-text text-transparent blur-sm animate-pulse delay-300'>
						404
					</div>
				</div>

				{/* Message */}
				<div className='mb-12 text-center max-w-md'>
					<h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>Oops! Page not found</h2>
					<p className='text-lg text-foreground/70 leading-relaxed'>The page you're looking for seems to have wandered off into the digital void.</p>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<Link
						href='/'
						className='group flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25'
					>
						<Home className='w-5 h-5 mr-3 group-hover:animate-bounce' />
						Go Home
					</Link>

					<button
						onClick={handleGoBack}
						className='group flex items-center px-8 py-4 bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border/20 hover:border-primary/30 text-foreground hover:text-primary font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl'
					>
						<ArrowLeft className='w-5 h-5 mr-3 group-hover:animate-pulse' />
						Go Back
					</button>
				</div>

				{/* Floating elements */}
				<div className='absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-ping' />
				<div className='absolute top-32 right-32 w-3 h-3 bg-blue-500 rounded-full animate-ping delay-1000' />
				<div className='absolute bottom-32 left-32 w-5 h-5 bg-purple-500 rounded-full animate-ping delay-500' />
				<div className='absolute bottom-20 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-1500' />
			</div>

			{/* Bottom decorative wave */}
			<div className='absolute bottom-0 left-0 right-0'>
				<svg
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
					className='w-full h-20'
					style={{fill: "var(--secondary)"}}
				>
					<path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' />
				</svg>
			</div>
		</div>
	);
}
