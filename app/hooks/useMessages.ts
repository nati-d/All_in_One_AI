import { useState } from "react";
import { SendQuery } from "@/app/api/query";
import type { SendQueryResponse } from "@/app/types/query";
import { extractErrorMessage } from "@/lib/errorUtils";

interface Message {
	sender: "user" | "assistant";
	text: string;
	timestamp: Date;
	llm_used?: string;
}

export function useMessages() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendMessage = async (text: string) => {
		if (!text.trim()) return;

		// Add user message
		setMessages((prev) => [...prev, {
			sender: "user",
			text: text.trim(),
			timestamp: new Date()
		}]);

		setIsLoading(true);
		setError(null);

		try {
			const response: SendQueryResponse = await SendQuery(text);

			// Add assistant message
			setMessages((prev) => [...prev, {
				sender: "assistant",
				text: response.response,
				timestamp: new Date(),
				llm_used: response.llm_used,
			}]);

		} catch (err: any) {
			console.error("Error sending message:", err);
			const errorMessage = extractErrorMessage(err);
			setError(errorMessage);

			// Add error message to chat
			setMessages((prev) => [...prev, {
				sender: "assistant",
				text: `Error: ${errorMessage}`,
				timestamp: new Date(),
			}]);

			// Clear error after 8 seconds
			setTimeout(() => setError(null), 8000);
		} finally {
			setIsLoading(false);
		}
	};

	const clearError = () => setError(null);

	return {
		messages,
		isLoading,
		error,
		sendMessage,
		clearError
	};
} 