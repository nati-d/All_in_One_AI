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
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

interface Message {
	sender: "user" | "assistant";
	text: string;
}

// Static responses for All In One AI
const getStaticResponse = (userMessage: string): string => {
	const message = userMessage.toLowerCase();

	// Agent-related responses
	if (message.includes("agent") || message.includes("agents")) {
		if (message.includes("available") || message.includes("view") || message.includes("show")) {
			return "I can help you with several types of agents:\n\n• **Task Automation Agents** - Automate repetitive workflows\n• **Data Analysis Agents** - Process and analyze data\n• **Customer Service Agents** - Handle customer inquiries\n• **Content Creation Agents** - Generate articles, emails, and reports\n• **Integration Agents** - Connect with external tools and APIs\n\nWould you like me to help you create a specific type of agent?";
		}
		if (message.includes("create") || message.includes("new")) {
			return "To create a new agent:\n\n1. **Choose Agent Type** - Select from our pre-built templates\n2. **Configure Settings** - Set up triggers, actions, and parameters\n3. **Test & Deploy** - Validate your agent and deploy it\n4. **Monitor & Optimize** - Track performance and make improvements\n\nWhat type of agent would you like to create?";
		}
		return "I'm your All In One AI assistant! I can help you create, manage, and optimize AI agents for various tasks. What would you like to know about agents?";
	}

	// Automation responses
	if (message.includes("automate") || message.includes("automation")) {
		if (message.includes("task") || message.includes("idea")) {
			return "Here are some great automation ideas:\n\n• **Email Management** - Auto-categorize and respond to emails\n• **Data Entry** - Extract data from documents and forms\n• **Social Media** - Schedule posts and engage with followers\n• **Customer Support** - Handle common inquiries automatically\n• **Report Generation** - Create weekly/monthly reports\n• **File Organization** - Sort and categorize files automatically\n\nWhich area interests you most?";
		}
		return "Automation can save you hours every week! I can help you identify repetitive tasks and create agents to handle them automatically. What specific tasks do you find yourself doing repeatedly?";
	}

	// Getting started responses
	if (message.includes("start") || message.includes("getting started") || message.includes("guide")) {
		return "Welcome to All In One AI! Here's how to get started:\n\n1. **Explore Capabilities** - Check out the quick actions in the sidebar\n2. **Create Your First Agent** - Start with a simple automation task\n3. **Connect Integrations** - Link your favorite tools and services\n4. **Monitor Performance** - Track how your agents are performing\n5. **Scale Up** - Create more complex workflows as you get comfortable\n\nWhat's your first goal with AI automation?";
	}

	// Best practices responses
	if (message.includes("best practice") || message.includes("effective")) {
		return "Here are the best practices for creating effective agents:\n\n• **Start Simple** - Begin with basic tasks before complex workflows\n• **Clear Instructions** - Be specific about what you want the agent to do\n• **Test Thoroughly** - Always test in a safe environment first\n• **Monitor Performance** - Regularly check how your agents are performing\n• **Iterate & Improve** - Use feedback to continuously enhance your agents\n• **Security First** - Ensure proper access controls and data protection\n\nWould you like me to help you implement any of these practices?";
	}

	// Success stories responses
	if (message.includes("success") || message.includes("example") || message.includes("story")) {
		return "Here are some inspiring success stories:\n\n• **Marketing Team** - Automated email campaigns increased engagement by 40%\n• **Customer Support** - Reduced response time from 2 hours to 5 minutes\n• **Data Analysis** - Automated weekly reports saved 15 hours per week\n• **Content Creation** - Generated 50+ blog posts per month automatically\n• **Sales Team** - Automated lead qualification improved conversion by 25%\n\nWhich success story resonates with your goals?";
	}

	// Features and capabilities responses
	if (message.includes("feature") || message.includes("capability") || message.includes("what can")) {
		return "All In One AI offers powerful capabilities:\n\n• **Multi-Agent Orchestration** - Coordinate multiple agents for complex tasks\n• **Natural Language Processing** - Understand and respond to human language\n• **Integration Hub** - Connect with 100+ popular tools and services\n• **Custom Training** - Train agents on your specific data and workflows\n• **Analytics Dashboard** - Monitor performance and optimize agents\n• **API Access** - Build custom integrations and applications\n\nWhat specific capability would you like to explore?";
	}

	// Default response
	return "I'm here to help you with All In One AI! I can assist with creating agents, automating tasks, and optimizing your workflows. What would you like to know or accomplish today?";
};

export default function AllInOneAIPage() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom of messages when new messages are added
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
	}, [messages]);

	// Add function to handle sending messages
	const handleSendMessage = (messageText?: string) => {
		const textToSend = messageText || input.trim();
		if (!textToSend) return;

		setInput("");
		setMessages((prev) => [...prev, {sender: "user", text: textToSend}]);
		setIsLoading(true);

		// Simulate loading delay for better UX
		setTimeout(() => {
			const response = getStaticResponse(textToSend);
			setMessages((prev) => [...prev, {sender: "assistant", text: response}]);
			setIsLoading(false);
		}, 1000);
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
					<Button
						variant='ghost'
						className='w-full justify-start text-muted-foreground hover:text-foreground'
					>
						<LogOut className='w-4 h-4 mr-2' />
						Logout
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col h-screen'>
				{/* Mobile Header */}
				<div className='lg:hidden p-4 border-b border-border bg-card'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						{sidebarOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
					</Button>
				</div>

				<div className='flex-1 flex flex-col min-h-0'>
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
										</div>
									</div>
								))}
								{isLoading && (
									<div className='flex justify-start'>
										<div className='max-w-[85%] p-4 rounded-2xl bg-muted'>
											<div className='flex space-x-2'>
												<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce' />
												<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100' />
												<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200' />
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
							<div className='bg-card rounded-2xl shadow-lg border border-border overflow-hidden flex items-center'>
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
									className='h-12 w-12 rounded-full mr-1'
									variant='ghost'
									onClick={() => handleSendMessage()}
									disabled={isLoading}
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
