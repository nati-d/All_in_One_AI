"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Slider} from "@/components/ui/slider";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronDown, Send, User, Bot, Settings} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export default function Playground() {
	const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.");
	const [temperature, setTemperature] = useState([0.7]);
	const [message, setMessage] = useState("");
	const [selectedModel, setSelectedModel] = useState("codiris-v1-mini");
	const [showSettings, setShowSettings] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "assistant",
			content: "Hello! I'm your AI assistant. How can I help you today?",
			timestamp: new Date(Date.now() - 300000),
		},
		{
			id: "2",
			role: "user",
			content: "Can you explain what machine learning is?",
			timestamp: new Date(Date.now() - 240000),
		},
		{
			id: "3",
			role: "assistant",
			content:
				"Machine learning is a subset of artificial intelligence (AI) that enables computers to learn and make decisions from data without being explicitly programmed for every task. Instead of following pre-written instructions, ML algorithms identify patterns in data and use these patterns to make predictions or decisions on new, unseen data.\n\nThere are three main types:\n• **Supervised Learning**: Learning from labeled examples\n• **Unsupervised Learning**: Finding patterns in unlabeled data\n• **Reinforcement Learning**: Learning through trial and error with rewards",
			timestamp: new Date(Date.now() - 180000),
		},
	]);

	const models = ["codiris-v1-mini", "codiris-v1-standard", "codiris-v1-pro"];

	const handleSendMessage = async () => {
		if (!message.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: message,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setMessage("");

		// Simulate AI response
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content:
					"I understand your question. This is a simulated response from the AI model. In a real implementation, this would be connected to the actual AI service.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, assistantMessage]);
		}, 1000);
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
	};

	return (
		<div className='min-h-screen bg-background flex flex-col pt-16'>
			{/* Main Content */}
			<div className='flex-1 flex max-w-7xl mx-auto w-full'>
				{/* Chat Area */}
				<div className='flex-1 flex flex-col min-h-0'>
					{/* Model Selection */}
					<div className='p-4 border-b border-border bg-secondary'>
						<div className='max-w-4xl mx-auto'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='outline'
										className='text-foreground bg-background border-border hover:bg-accent'
									>
										<span className='mr-2'>{selectedModel}</span>
										<ChevronDown className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='bg-background border-border'>
									{models.map((model) => (
										<DropdownMenuItem
											key={model}
											onClick={() => setSelectedModel(model)}
											className='text-foreground hover:bg-accent'
										>
											{model}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					{/* Messages */}
					<ScrollArea className='flex-1 p-4'>
						<div className='space-y-6 max-w-4xl mx-auto'>
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
								>
									{msg.role === "assistant" && (
										<Avatar className='w-8 h-8 bg-primary/20 flex-shrink-0'>
											<AvatarFallback className='bg-primary/20 text-primary'>
												<Bot className='h-4 w-4' />
											</AvatarFallback>
										</Avatar>
									)}
									<div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
										<div
											className={`rounded-lg px-4 py-3 ${
												msg.role === "user"
													? "bg-primary text-primary-foreground ml-auto"
													: "bg-secondary border border-border text-foreground"
											}`}
										>
											<div className='whitespace-pre-wrap text-sm leading-relaxed'>{msg.content}</div>
										</div>
										<div className={`text-xs text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
											{formatTime(msg.timestamp)}
										</div>
									</div>
									{msg.role === "user" && (
										<Avatar className='w-8 h-8 bg-accent flex-shrink-0'>
											<AvatarFallback className='bg-accent text-foreground'>
												<User className='h-4 w-4' />
											</AvatarFallback>
										</Avatar>
									)}
								</div>
							))}
						</div>
					</ScrollArea>

					{/* Message Input */}
					<div className='border-t border-border bg-background p-4'>
						<div className='max-w-4xl mx-auto'>
							<div className='flex gap-3 items-end'>
								<div className='flex-1'>
									<Textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder='Type your message...'
										className='min-h-[44px] max-h-32 resize-none border-border focus:border-primary focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground'
										onKeyPress={(e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												handleSendMessage();
											}
										}}
									/>
								</div>
								<Button
									onClick={handleSendMessage}
									disabled={!message.trim()}
									className='bg-primary hover:bg-primary/90 px-4 py-2 h-11 text-primary-foreground'
								>
									<Send className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Settings Sidebar */}
				<div className={`w-80 border-l border-border bg-background ${showSettings ? "block" : "hidden lg:block"}`}>
					<div className='p-6 space-y-6'>
						<div>
							<h3 className='text-lg font-semibold text-foreground mb-4'>Settings</h3>
						</div>

						{/* System Prompt */}
						<Card className='bg-secondary border-border'>
							<CardHeader className='pb-3'>
								<CardTitle className='text-sm font-medium text-foreground'>System Prompt</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Textarea
									value={systemPrompt}
									onChange={(e) => setSystemPrompt(e.target.value)}
									placeholder='Enter system instructions...'
									className='min-h-[100px] text-sm bg-background text-foreground border-border placeholder:text-muted-foreground'
								/>
								<Button
									onClick={() => setSystemPrompt("")}
									variant='outline'
									size='sm'
									className='w-full text-foreground bg-background border-border hover:bg-accent'
								>
									Clear
								</Button>
							</CardContent>
						</Card>

						{/* Temperature */}
						<Card className='bg-secondary border-border'>
							<CardHeader className='pb-3'>
								<CardTitle className='text-sm font-medium text-foreground'>Temperature</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-muted-foreground'>Creativity</span>
									<span className='text-sm font-mono text-foreground'>{temperature[0]}</span>
								</div>
								<Slider
									value={temperature}
									onValueChange={setTemperature}
									max={2}
									min={0}
									step={0.1}
									className='w-full'
								/>
								<div className='flex justify-between text-xs text-muted-foreground'>
									<span>Precise</span>
									<span>Creative</span>
								</div>
							</CardContent>
						</Card>

						{/* Clear Chat */}
						<Button
							onClick={() => setMessages([])}
							variant='outline'
							className='w-full text-destructive border-destructive/20 hover:bg-destructive/10 bg-background'
						>
							Clear Chat
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
