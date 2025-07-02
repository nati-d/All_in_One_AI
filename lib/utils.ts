import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTimestamp(date: Date): string {
	const now = new Date();
	const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

	// If less than 1 hour ago, show relative time
	if (diffInMinutes < 60) {
		if (diffInMinutes < 1) {
			return "Just now";
		}
		return `${diffInMinutes}m ago`;
	}

	// If less than 24 hours ago, show hours
	if (diffInMinutes < 1440) {
		const hours = Math.floor(diffInMinutes / 60);
		return `${hours}hr ago`;
	}

	// If more than 24 hours ago, show time format (HH:MM)
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}
