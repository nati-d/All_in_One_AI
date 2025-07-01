"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to usage page when accessing /dashboard
		router.push("/dashboard/usage");
	}, [router]);

	return (
		<div className='min-h-screen bg-background pt-24 flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
				<p className='text-foreground/70'>Redirecting to dashboard...</p>
			</div>
		</div>
	);
}
