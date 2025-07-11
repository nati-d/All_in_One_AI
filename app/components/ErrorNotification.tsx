import React from "react";
import { X } from "lucide-react";

interface ErrorNotificationProps {
	error: string | null;
	onClear: () => void;
}

export function ErrorNotification({ error, onClear }: ErrorNotificationProps) {
	if (!error) return null;

	return (
		<div className='bg-destructive/10 border-l-4 border-destructive text-destructive px-4 py-3 text-sm flex items-center justify-between'>
			<div className='flex items-center space-x-2'>
				<span className='text-destructive'>⚠️</span>
				<span>{error}</span>
			</div>
			<button
				onClick={onClear}
				className='text-destructive hover:text-destructive/80 transition-colors'
			>
				<X className='w-4 h-4' />
			</button>
		</div>
	);
} 