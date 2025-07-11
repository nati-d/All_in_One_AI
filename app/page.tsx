"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { useMessages } from "./hooks/useMessages";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { ChatArea } from "./components/ChatArea";
import { MessageInput } from "./components/MessageInput";
import { ErrorNotification } from "./components/ErrorNotification";

export default function AllInOneAIPage() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { logout } = useAuth();
	const router = useRouter();
	const { messages, isLoading, error, sendMessage, clearError } = useMessages();

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Handle sending messages
	const handleSendMessage = async (messageText?: string) => {
		const textToSend = messageText || input.trim();
		if (!textToSend) return;

		setInput("");
		await sendMessage(textToSend);
	};

	// Handle clicking on example prompts
	const handlePromptClick = async (prompt: string) => {
		// Auto-send the prompt message directly
		await sendMessage(prompt);
	};

	// Handle quick action clicks
	const handleQuickAction = (action: string) => {
		handleSendMessage(action);
	};

	// Handle logout
	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<ProtectedRoute>
			<div className='flex h-[100dvh] bg-background overflow-hidden'>
				{/* Mobile Overlay */}
				{sidebarOpen && (
					<div
						className='fixed inset-0 bg-black/20 z-20 lg:hidden'
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Sidebar */}
				<Sidebar
					isOpen={sidebarOpen}
					onQuickAction={handleQuickAction}
					onLogout={handleLogout}
				/>

				{/* Main Content */}
				<div className='flex-1 flex flex-col min-h-0 w-full'>
					{/* Mobile Header */}
					<MobileHeader
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>

					<div className='flex-1 flex flex-col min-h-0 overflow-hidden'>
						{/* Error Notification */}
						<ErrorNotification error={error} onClear={clearError} />

						{/* Chat Area */}
						<ChatArea
							messages={messages}
							isLoading={isLoading}
							onPromptClick={handlePromptClick}
							messagesEndRef={messagesEndRef}
						/>

						{/* Message Input */}
						<MessageInput
							input={input}
							setInput={setInput}
							onSendMessage={handleSendMessage}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
