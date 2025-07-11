import React from "react";
import {
	Search,
	LogOut,
	Bot,
	Zap,
	HelpCircle,
	BookOpen,
	Users,
	Lightbulb,
	PlusCircle,
	MessageSquare,
	CheckCircle,
	Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
	isOpen: boolean;
	onQuickAction: (action: string) => void;
	onLogout: () => void;
}

export function Sidebar({ isOpen, onQuickAction, onLogout }: SidebarProps) {
	const { user } = useAuth();
	
	return (
		<div
			className={cn(
				"fixed inset-y-0 left-0 z-30 w-72 sm:w-60 bg-card border-r border-border flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static",
				isOpen ? "translate-x-0" : "-translate-x-full"
			)}
		>
			<div className='p-3 sm:p-4'>
				<div className='flex items-center gap-2 mb-3 sm:mb-4'>
					<Bot className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
					<h2 className='font-semibold text-base sm:text-lg text-foreground'>All In One AI</h2>
				</div>
				<div className='relative'>
					<Search className='w-4 h-4 absolute left-3 top-3 text-muted-foreground' />
					<Input
						className='pl-9 bg-muted border-border text-sm sm:text-base'
						placeholder='Search chats'
					/>
				</div>
			</div>

			<div className='flex-1 overflow-auto p-3 sm:p-4 shadow-inner'>
				<div className='space-y-4 sm:space-y-6'>
					{/* Quick Actions Section */}
					<div>
						<div className='text-xs sm:text-sm font-medium mb-2 sm:mb-3 flex items-center text-foreground'>
							<Zap className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary' />
							Quick Actions
						</div>
						<div className='space-y-1.5 sm:space-y-2'>
							<div
								className='text-xs sm:text-sm hover:bg-muted p-1.5 sm:p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
								onClick={() => onQuickAction("Show me my available agents")}
							>
								<Users className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary' />
								View My Agents
							</div>
							<div
								className='text-xs sm:text-sm hover:bg-muted p-1.5 sm:p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
								onClick={() => onQuickAction("Help me create a new AI agent")}
							>
								<Lightbulb className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary' />
								Create Agent
							</div>
							<div
								className='text-xs sm:text-sm hover:bg-muted p-1.5 sm:p-2 rounded cursor-pointer flex items-center text-foreground transition-colors shadow-sm'
								onClick={() => onQuickAction("Start a new conversation")}
							>
								<PlusCircle className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary' />
								New Chat
							</div>
						</div>
					</div>

					{/* Recent Conversations */}
					<div>
						<div className='text-xs sm:text-sm font-medium mb-2 sm:mb-3 flex items-center text-foreground'>
							<MessageSquare className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary' />
							Recent Chats
						</div>
						<div className='space-y-1.5 sm:space-y-2'>
							<div className='text-xs sm:text-sm text-muted-foreground p-1.5 sm:p-2 rounded'>
								No recent conversations
							</div>
						</div>
					</div>

					{/* Available Agent Types */}
					<div>
						<div className='text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-foreground'>Available Agents</div>
						<div className='space-y-1.5 sm:space-y-2'>
							<div className='text-xs sm:text-sm text-muted-foreground hover:text-foreground p-1.5 sm:p-2 rounded hover:bg-muted cursor-pointer transition-colors flex items-center'>
								<HelpCircle className='w-4 h-4 mr-2 text-primary' />
								GPT Assistant
							</div>
							<div className='text-xs sm:text-sm text-muted-foreground hover:text-foreground p-1.5 sm:p-2 rounded hover:bg-muted cursor-pointer transition-colors flex items-center'>
								<BookOpen className='w-4 h-4 mr-2 text-primary' />
								Research Agent
							</div>
							<div className='text-xs sm:text-sm text-muted-foreground hover:text-foreground p-1.5 sm:p-2 rounded hover:bg-muted cursor-pointer transition-colors flex items-center'>
								<CheckCircle className='w-4 h-4 mr-2 text-primary' />
								Task Manager
							</div>
							<div className='text-xs sm:text-sm text-muted-foreground hover:text-foreground p-1.5 sm:p-2 rounded hover:bg-muted cursor-pointer transition-colors flex items-center'>
								<Star className='w-4 h-4 mr-2 text-primary' />
								Creative Writer
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* User Section */}
			<div className='p-3 sm:p-4 border-t border-border'>
				<div className='flex items-center gap-2 sm:gap-3'>
					{/* User Avatar */}
					<div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center shrink-0'>
						<span className='text-primary-foreground font-medium text-xs sm:text-sm'>
							{user?.display_name ? user.display_name.charAt(0).toUpperCase() : 'U'}
						</span>
					</div>
					
					{/* User Info */}
					<div className='flex-1 min-w-0'>
						<div className='text-xs sm:text-sm font-medium text-foreground truncate'>
							{user?.display_name || 'User'}
						</div>
						<div className='text-xs text-muted-foreground truncate'>
							{user?.email || ''}
						</div>
					</div>
					
					{/* Logout Button */}
					<Button
						variant='ghost'
						size='sm'
						onClick={onLogout}
						className='text-muted-foreground hover:text-foreground p-1.5 sm:p-2 shrink-0'
					>
						<LogOut className='w-3 h-3 sm:w-4 sm:h-4' />
					</Button>
				</div>
			</div>
		</div>
	);
} 