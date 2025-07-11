import React from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
	input: string;
	setInput: (input: string) => void;
	onSendMessage: () => void;
	isLoading: boolean;
}

export function MessageInput({ input, setInput, onSendMessage, isLoading }: MessageInputProps) {
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSendMessage();
		}
	};

	return (
		<div className='bg-background p-2 sm:p-3 md:p-4'>
			<div className='max-w-4xl mx-auto relative'>
				<div className='bg-card rounded-xl sm:rounded-2xl shadow-lg border border-border overflow-hidden flex items-center p-1.5 sm:p-2'>
					<Input
						className='border-none bg-transparent py-2.5 sm:py-3 md:py-4 px-2.5 sm:px-3 md:px-6 flex-grow focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base'
						placeholder='Message All In One AI...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						disabled={isLoading}
					/>
					<Button
						size='icon'
						className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full mr-1 sm:mr-2 bg-transparent hover:bg-muted'
						variant='ghost'
						onClick={() => {
							// File sharing functionality
						}}
					>
						<Paperclip className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground hover:text-foreground' />
					</Button>
					<Button
						size='icon'
						className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full mr-0.5 sm:mr-1 bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
						variant='ghost'
						onClick={onSendMessage}
						disabled={isLoading || !input.trim()}
					>
						<Send
							className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-foreground'
							strokeWidth={2.5}
						/>
					</Button>
				</div>
			</div>
		</div>
	);
} 