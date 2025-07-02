"use client";

import {useState, useRef, useEffect} from "react";
import {
	Search,
	LogOut,
	ArrowRight,
	Send,
	Menu,
	X,
	Bot,
	Zap,
	Settings,
	HelpCircle,
	BookOpen,
	Sparkles,
	Users,
	Lightbulb,
	PlusCircle,
	MessageSquare,
	CheckCircle,
	Star,
	Paperclip,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn, formatTimestamp} from "@/lib/utils";
import {SendQuery} from "@/app/api/query";
import type {SendQueryResponse} from "@/app/types/query";

interface Message {
	sender: "user" | "assistant";
	text: string;
	timestamp: Date;
	llm_used?: string;
}

// Static responses for All In One AI
const getStaticResponse = (userMessage: string): string => {
	return "I'm currently experiencing high traffic and can't process your request right now. Please try again in a few minutes. Our team is working to restore full functionality.";
};

export default function AllInOneAIPage() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(true);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom of messages when new messages are added
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
	}, [messages]);

	// Add function to handle sending messages
	const handleSendMessage = async (messageText?: string) => {
		const textToSend = messageText || input.trim();
		if (!textToSend) return;

		setInput("");
		setMessages((prev) => [...prev, {sender: "user", text: textToSend, timestamp: new Date()}]);
		setIsLoading(true);

		try {
			// Call the backend API
			const response: SendQueryResponse = await SendQuery(textToSend);

			// Reset connection status on successful API call
			setIsConnected(true);
			setError(null);

			setMessages((prev) => [
				...prev,
				{
					sender: "assistant",
					text: response.response,
					timestamp: new Date(),
					llm_used: response.llm_used,
				},
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			setError("Failed to connect to AI service. Using fallback response.");
			setIsConnected(false);

			// Fallback to static response if API fails
			const fallbackResponse = getStaticResponse(textToSend);
			setMessages((prev) => [
				...prev,
				{
					sender: "assistant",
					text: fallbackResponse,
					timestamp: new Date(),
				},
			]);

			// Clear error after 5 seconds
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle clicking on example prompts
	const handlePromptClick = (prompt: string) => {
		setInput(prompt);
		// Don't automatically send, let user review and send
	};

	// Handle quick action clicks
	const handleQuickAction = (action: string) => {
		handleSendMessage(action);
	};

	return (
		<div className='flex h-screen bg-background'>
			{/* Mobile Overlay */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 bg-black/20 z-20 lg:hidden'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar - Replaced with Agent Capabilities Panel */}
			<div
				className={cn(
					"fixed inset-y-0 left-0 z-30 w-80 bg-card border-r border-border flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static",
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<div className='p-4'>
					<div className='flex items-center gap-2 mb-4'>
						<Bot className='w-6 h-6 text-primary' />
						<h2 className='font-semibold text-lg text-foreground'>All In One AI</h2>
					</div>
					<div className='relative'>
						<Search className='w-4 h-4 absolute left-3 top-3 text-muted-foreground' />
						<Input
							className='pl-9 bg-muted border-border'
							placeholder='Search chats'
						/>
					</div>
				</div>

				<div className='flex-1 overflow-auto p-4 shadow-inner'>
					<div className='space-y-6'>
						{/* Quick Actions Section - now at the top */}
						<div>
							<div className='text-sm font-medium mb-3 flex items-center text-foreground'>
								<Zap className='w-4 h-4 mr-2 text-primary' />
								Quick Actions
							</div>
							<div className='space-y-2'>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handleQuickAction("Show me my available agents")}
								>
									<Users className='w-4 h-4 mr-2 text-primary' />
									View My Agents
								</div>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handleQuickAction("What tasks can I automate?")}
								>
									<Lightbulb className='w-4 h-4 mr-2 text-primary' />
									Automation Ideas
								</div>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handleQuickAction("How do I create a new agent?")}
								>
									<PlusCircle className='w-4 h-4 mr-2 text-primary' />
									Create Agent
								</div>
							</div>
						</div>

						{/* Chat History Section - now below Quick Actions */}
						<div>
							<div className='text-sm font-medium mb-3 flex items-center text-foreground'>
								<MessageSquare className='w-4 h-4 mr-2 text-primary' />
								Chat History
							</div>
							<div className='space-y-1'>
								{/* Example chat history items - no icons */}
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>How to create an AI agent</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Automation ideas for business</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Best practices for agents</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Customer service automation</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Data analysis workflow setup</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Email marketing automation</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Social media management</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Lead generation strategies</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Content creation workflow</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Project management automation</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Inventory tracking system</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Financial reporting setup</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>HR process automation</span>
								</div>
								<div className='p-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground transition-colors shadow-sm'>
									<span className='truncate'>Sales pipeline optimization</span>
								</div>
							</div>
						</div>

						<div>
							<div className='text-sm font-medium mb-3 flex items-center text-foreground'>
								<HelpCircle className='w-4 h-4 mr-2 text-primary' />
								Help & Resources
							</div>
							<div className='space-y-2'>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handlePromptClick("How do I get started with All In One AI?")}
								>
									<BookOpen className='w-4 h-4 mr-2 text-primary' />
									Getting Started Guide
								</div>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handlePromptClick("What are the best practices for creating effective agents?")}
								>
									<CheckCircle className='w-4 h-4 mr-2 text-primary' />
									Best Practices
								</div>
								<div
									className='text-sm hover:bg-muted p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
									onClick={() => handlePromptClick("Show me examples of successful agent implementations")}
								>
									<Star className='w-4 h-4 mr-2 text-primary' />
									Success Stories
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='p-4 shadow-lg bg-card'>
					<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer group'>
						{/* Avatar */}
						<div className='relative'>
							<div className='w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg'>
								<span className='text-primary-foreground font-semibold text-sm'>JD</span>
							</div>
							<div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card'></div>
						</div>

						{/* User Info */}
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-medium text-foreground truncate'>John Doe</p>
							<p className='text-xs text-muted-foreground truncate'>john.doe@example.com</p>
						</div>

						{/* Logout Button */}
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground'
						>
							<LogOut className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col h-screen'>
				{/* Mobile Header */}
				<div className='lg:hidden relative overflow-hidden'>
					{/* Gradient Background */}
					<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10'></div>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background'></div>

					{/* Glassmorphism Header */}
					<div className='relative backdrop-blur-xl bg-background/60 border-b border-border/30 p-4'>
						<div className='flex items-center justify-between'>
							{/* Logo Section */}
							<div className='flex items-center space-x-3'>
								<div className='relative'>
									<div className='w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg'>
										<span className='text-primary-foreground font-bold text-sm'>A</span>
									</div>
									<div className='absolute -inset-1 bg-gradient-to-r from-primary/50 to-transparent rounded-xl blur-sm opacity-50'></div>
								</div>
								<div>
									<h1 className='text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
										All In One AI
									</h1>
									<p className='text-xs text-muted-foreground'>Your AI Assistant</p>
								</div>
							</div>

							{/* Connection Status */}
							<div className='flex items-center gap-2 mr-4'>
								<div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-500" : "bg-red-500")} />
								<span className='text-xs text-muted-foreground'>{isConnected ? "Connected" : "Offline"}</span>
							</div>

							{/* Menu Toggle */}
							<div
								className='relative group cursor-pointer'
								onClick={() => setSidebarOpen(!sidebarOpen)}
							>
								{/* Glow Effect */}
								<div className='absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

								{/* Button Background */}
								<div className='relative bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
									{sidebarOpen ? (
										<X className='h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300' />
									) : (
										<Menu className='h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300' />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='flex-1 flex flex-col min-h-0'>
					{/* Error Notification */}
					{error && <div className='bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 text-sm text-center'>{error}</div>}

					{/* Chat Messages or Welcome Content */}
					{messages.length === 0 ? (
						<div className='flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4'>
							<div className='w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mb-6'>
								<Bot className='w-8 h-8 sm:w-10 sm:h-10 text-primary' />
							</div>
							<h1 className='text-2xl sm:text-3xl font-semibold mb-2 text-center text-foreground'>
								Welcome to <span className='gradient-text'>All In One AI</span>
							</h1>
							<p className='text-muted-foreground mb-8 sm:mb-12 text-center'>Your All In One AI Assistant</p>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full'>
								{[
									"Hello! Can you tell me about All In One AI and what it offers?",
									"What types of AI agents are available in the system?",
									"How can I create and customize my own AI agent?",
									"What are the key features and capabilities of All In One AI?",
								].map((prompt, i) => (
									<div
										key={i}
										className='p-3 sm:p-4 border border-border rounded-lg hover:bg-muted cursor-pointer group relative transition-colors'
										onClick={() => handlePromptClick(prompt)}
									>
										<p className='text-sm text-foreground line-clamp-4'>{prompt}</p>
										<ArrowRight className='w-4 h-4 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground' />
									</div>
								))}
							</div>
						</div>
					) : (
						<div className='flex-1 overflow-auto'>
							<div className='max-w-4xl mx-auto py-8 px-4 space-y-6'>
								{messages.map((message, index) => (
									<div
										key={index}
										className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
									>
										<div
											className={cn(
												"max-w-[85%] p-4 rounded-2xl",
												message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
											)}
										>
											<p className='whitespace-pre-wrap leading-relaxed'>{message.text}</p>
											<div
												className={cn(
													"flex items-center justify-between mt-2 text-xs opacity-70",
													message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
												)}
											>
												<span>{formatTimestamp(message.timestamp)}</span>
												{message.llm_used && (
													<span className='flex items-center gap-1'>
														<Bot className='w-3 h-3' />
														{message.llm_used}
													</span>
												)}
											</div>
										</div>
									</div>
								))}
								{isLoading && (
									<div className='flex justify-start'>
										<div className='max-w-[85%] p-4 rounded-2xl bg-muted'>
											<div className='flex items-center space-x-3'>
												<div className='flex space-x-2'>
													<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce' />
													<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100' />
													<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200' />
												</div>
												<span className='text-sm text-muted-foreground'>All In One AI is thinking...</span>
											</div>
										</div>
									</div>
								)}
								<div ref={messagesEndRef} />
							</div>
						</div>
					)}

					{/* Input Area */}
					<div className='bg-background p-4'>
						<div className='max-w-4xl mx-auto relative'>
							<div className='bg-card rounded-2xl shadow-lg border border-border overflow-hidden flex items-center p-2'>
								<Input
									className='border-none bg-transparent py-4 px-6 flex-grow focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground'
									placeholder='Message All In One AI...'
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
									disabled={isLoading}
								/>
								<Button
									size='icon'
									className='h-10 w-10 rounded-full mr-2 bg-transparent hover:bg-muted'
									variant='ghost'
									onClick={() => {
										// File sharing functionality
									}}
								>
									<Paperclip className='w-5 h-5 text-muted-foreground hover:text-foreground' />
								</Button>
								<Button
									size='icon'
									className='h-12 w-12 rounded-full mr-1 bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
									variant='ghost'
									onClick={() => handleSendMessage()}
									disabled={isLoading || !input.trim()}
								>
									<Send
										className='w-5 h-5 text-primary-foreground'
										strokeWidth={2.5}
									/>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
