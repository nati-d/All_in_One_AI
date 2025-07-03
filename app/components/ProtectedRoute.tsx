"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "../contexts/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
	const {isAuthenticated, loading} = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, loading, router]);

	// Show loading state while checking authentication
	if (loading) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<div className='flex items-center space-x-2'>
					<div className='w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin'></div>
					<span className='text-foreground'>Loading...</span>
				</div>
			</div>
		);
	}

	// Don't render children if not authenticated
	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
