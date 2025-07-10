"use client";

import {useState} from "react";
import {parseAIResponse} from "./AIResponseFormatter";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Slider} from "@/components/ui/slider";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronDown, Send, Paperclip} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export default function Playground() {
	const [systemPrompt, setSystemPrompt] = useState("");
	const [temperature, setTemperature] = useState([0.7]);
	const [message, setMessage] = useState("");
	const [selectedModel, setSelectedModel] = useState("codiris-v1-mini");
	const [messages, setMessages] = useState<Message[]>([]);

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
		// Simulate system/AI response
		setTimeout(() => {
			const systemMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content: "This is a simulated system response.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, systemMessage]);
		}, 900);
	};

	return (
		<div className='min-h-screen  flex flex-col'>
			<div
				className='flex flex-col lg:flex-row flex-1 w-full max-w-full p-4 hidden  px-2 sm:px-4 gap-2 sm:gap-4'
				style={{height: "calc(100vh - 2rem)"}}
			>
				{/* Left: Chat Area */}
				<div className='flex flex-col flex-1 rounded-xl border border-border/10 bg-background/80 overflow-hidden w-full'>
					{/* Top: Model Selector */}
					<div className='flex items-center h-12 sm:h-14 px-3 sm:px-6 border-b border-border/10'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='text-sm sm:text-base font-semibold px-0 text-foreground bg-transparent hover:bg-primary/20 focus:bg-primary/20 transition-colors'
								>
									{selectedModel}
									<ChevronDown className='ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='bg-background border-border mt-2'>
								{models.map((model) => (
									<DropdownMenuItem
										key={model}
										onClick={() => setSelectedModel(model)}
										className='text-sm sm:text-base text-foreground hover:bg-primary/20 focus:bg-primary/30 transition-colors'
									>
										{model}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Chat Messages */}
					<div className='flex-1 flex flex-col justify-end hidden overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4'>
						{messages.length === 0 && <div className='text-center text-muted-foreground text-sm sm:text-base'>No messages yet. Start the conversation!</div>}
						{messages.map((msg, idx) => (
							<div
								key={msg.id}
								className='flex flex-col gap-1'
							>
								<div className={`text-xs sm:text-sm ${msg.role === "user" ? "text-primary-foreground text-right" : "text-foreground text-left"}`}>
									{msg.role === "assistant" 
										? parseAIResponse(msg.content)
										: msg.content
									}
								</div>
								<div className={`text-xs text-muted-foreground ${msg.role === "user" ? "text-right" : "text-left"}`}>
									{msg.timestamp.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
								</div>
							</div>
						))}
					</div>

					{/* Bottom: Message Input */}
					<form
						className='w-full px-3 sm:px-4 pb-3 sm:pb-4 pt-2'
						onSubmit={(e) => {
							e.preventDefault();
							handleSendMessage();
						}}
					>
						<div className='flex items-end gap-2 bg-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border/10'>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='text-foreground/70'
							>
								<Paperclip className='h-4 w-4 sm:h-5 sm:w-5' />
							</Button>
							<Textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder='Message to All In One AI'
								className='flex-1 resize-none bg-transparent text-foreground placeholder:text-foreground/60 min-h-[32px] max-h-32 outline-none border-none ring-0 shadow-none focus:outline-none focus:border-none focus:ring-0 text-sm sm:text-base'
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<Button
								type='submit'
								className='rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center shadow-none'
								disabled={!message.trim()}
							>
								<Send className='h-4 w-4 sm:h-5 sm:w-5' />
							</Button>
						</div>
					</form>
				</div>

				{/* Right: Sidebar */}
				<div className='w-full lg:w-[340px] flex flex-col gap-3 sm:gap-4 rounded-xl border border-border/10 bg-background/80 p-3 sm:p-4'>
					{/* System Prompt */}
					<Card className='bg-background/80 border border-border/10 rounded-xl'>
						<CardHeader className='pb-2'>
							<CardTitle className='text-sm sm:text-base text-foreground'>System Prompt</CardTitle>
						</CardHeader>
						<CardContent>
							<Textarea
								value={systemPrompt}
								onChange={(e) => setSystemPrompt(e.target.value)}
								placeholder='Enter a system instruction'
								className='resize-none border border-border/10 bg-background text-foreground placeholder:text-muted-foreground rounded-lg min-h-[60px] text-sm sm:text-base'
							/>
						</CardContent>
					</Card>

					{/* Spacer */}
					<div className='flex-1' />

					{/* Temperature Slider */}
					<div className='flex flex-col gap-2 rounded-xl border border-border/10 bg-background/80 p-3 sm:p-4'>
						<div className='flex items-center justify-between'>
							<span className='text-xs sm:text-sm text-foreground'>Temperature</span>
							<span className='text-xs sm:text-sm text-foreground'>{temperature[0]}</span>
						</div>
						<Slider
							value={temperature}
							onValueChange={setTemperature}
							max={2}
							min={0}
							step={0.1}
							className='w-full h-1'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
