import React, { useState, useRef } from "react";
import { Send, Paperclip, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FileAttachment } from "@/app/types/query";

interface MessageInputProps {
	input: string;
	setInput: (input: string) => void;
	onSendMessage: (files?: FileAttachment[]) => void;
	isLoading: boolean;
}

export function MessageInput({ input, setInput, onSendMessage, isLoading }: MessageInputProps) {
	const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleSendMessage = () => {
		onSendMessage(attachedFiles);
		setAttachedFiles([]);
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		
		const newAttachments: FileAttachment[] = files.map(file => ({
			id: crypto.randomUUID(),
			name: file.name,
			type: file.type,
			size: file.size,
			file: file
		}));
		
		setAttachedFiles(prev => [...prev, ...newAttachments]);
		
		// Clear input
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const removeFile = (fileId: string) => {
		setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	return (
		<div className='bg-background p-2 sm:p-3 md:p-4'>
			<div className='max-w-4xl mx-auto relative'>
				{/* File Attachments Preview */}
				{attachedFiles.length > 0 && (
					<div className='mb-2 p-2 bg-card rounded-lg border border-border'>
						<div className='flex flex-wrap gap-1'>
							{attachedFiles.map((file) => (
								<div
									key={file.id}
									className='flex items-center gap-1.5 bg-muted/50 rounded-md p-1.5 max-w-48'
								>
									<File className='w-3 h-3 text-muted-foreground flex-shrink-0' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs font-medium text-foreground truncate'>{file.name}</p>
										<p className='text-xs text-muted-foreground'>{formatFileSize(file.size)}</p>
									</div>
									<Button
										size='icon'
										variant='ghost'
										className='h-4 w-4 hover:bg-destructive/10 hover:text-destructive'
										onClick={() => removeFile(file.id)}
									>
										<X className='w-2.5 h-2.5' />
									</Button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Message Input */}
				<div className='bg-card rounded-xl sm:rounded-2xl shadow-lg border border-border overflow-hidden flex items-center p-1.5 sm:p-2'>
					<Input
						className='border-none bg-transparent py-2.5 sm:py-3 md:py-4 px-2.5 sm:px-3 md:px-6 flex-grow focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base'
						placeholder='Message All In One AI...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						disabled={isLoading}
					/>
					
					{/* Hidden file input */}
					<input
						ref={fileInputRef}
						type='file'
						multiple
						className='hidden'
						accept='.pdf,.doc,.docx,.txt,.csv,.json,.xml,.xls,.xlsx,.ppt,.pptx,.rtf,.odt,.ods,.odp'
						onChange={handleFileSelect}
					/>
					
					<Button
						size='icon'
						className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full mr-1 sm:mr-2 bg-transparent hover:bg-muted cursor-pointer'
						variant='ghost'
						onClick={() => fileInputRef.current?.click()}
						disabled={isLoading}
					>
						<Paperclip className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground hover:text-foreground cursor-pointer' />
					</Button>
					
					<Button
						size='icon'
						className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full mr-0.5 sm:mr-1 bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
						variant='ghost'
						onClick={handleSendMessage}
						disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
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