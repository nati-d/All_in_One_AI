import React from "react";
import { Bot, ArrowRight } from "lucide-react";
import { cn, formatTimestamp } from "@/lib/utils";
import { parseAIResponse } from "./AIResponseFormatter";
import { FileDisplay } from "./FileDisplay";
import type { FileAttachment } from "@/app/types/query";

interface Message {
	sender: "user" | "assistant";
	text: string;
	timestamp: Date;
	llm_used?: string;
	files?: FileAttachment[];
}

interface ChatAreaProps {
	messages: Message[];
	isLoading: boolean;
	onPromptClick: (prompt: string) => void;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const EXAMPLE_PROMPTS = [
	"Hello! Can you tell me about All In One AI and what it offers?",
	"What types of AI agents are available in the system?",
	"How can I create and customize my own AI agent?",
	"What are the key features and capabilities of All In One AI?",
];

export function ChatArea({ messages, isLoading, onPromptClick, messagesEndRef }: ChatAreaProps) {
	if (messages.length === 0) {
		return (
			<div className='flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-3 sm:px-4'>
				<div className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-4 sm:mb-6'>
					<Bot className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary' />
				</div>
				<h1 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center text-foreground px-2'>
					Welcome to <span className='gradient-text'>All In One AI</span>
				</h1>
				<p className='text-muted-foreground mb-6 sm:mb-8 md:mb-12 text-center px-2'>Your All In One AI Assistant</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full'>
					{EXAMPLE_PROMPTS.map((prompt, i) => (
						<div
							key={i}
							className='p-2.5 sm:p-3 md:p-4 border border-border rounded-lg hover:bg-muted cursor-pointer group relative transition-colors'
							onClick={() => onPromptClick(prompt)}
						>
							<p className='text-xs sm:text-sm text-foreground line-clamp-4'>{prompt}</p>
							<ArrowRight className='w-3 h-3 sm:w-4 sm:h-4 absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground' />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='flex-1 overflow-auto'>
			<div className='max-w-4xl mx-auto py-3 sm:py-4 md:py-8 px-2 sm:px-4 space-y-3 sm:space-y-4 md:space-y-6'>
				{messages.map((message, index) => (
					<div
						key={index}
						className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
					>
						<div
							className={cn(
								"max-w-[92%] sm:max-w-[88%] md:max-w-[85%] p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl",
								message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
							)}
						>
							{/* File attachments */}
							{message.files && message.files.length > 0 && (
								<div className='mb-2'>
									<FileDisplay files={message.files} />
								</div>
							)}
							
							{/* Message text */}
							{message.text && (
								<div className='whitespace-pre-wrap leading-relaxed text-sm sm:text-base'>
									{message.sender === "assistant" 
										? parseAIResponse(message.text, message.llm_used)
										: message.text
									}
								</div>
							)}
							
							<div
								className={cn(
									"flex items-center justify-between mt-1.5 sm:mt-2 text-xs opacity-70",
									message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
								)}
							>
								<span>{formatTimestamp(message.timestamp)}</span>
								{message.llm_used && (
									<span className='flex items-center gap-1'>
										<Bot className='w-2.5 h-2.5 sm:w-3 sm:h-3' />
										<span className='text-xs'>{message.llm_used}</span>
									</span>
								)}
							</div>
						</div>
					</div>
				))}
				{isLoading && (
					<div className='flex justify-start'>
						<div className='max-w-[92%] sm:max-w-[88%] md:max-w-[85%] p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-muted'>
							<div className='flex items-center space-x-2 sm:space-x-3'>
								<div className='flex space-x-1 sm:space-x-2'>
									<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce' />
									<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce delay-100' />
									<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce delay-200' />
								</div>
								<span className='text-xs sm:text-sm text-muted-foreground'>All In One AI is thinking...</span>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
} 