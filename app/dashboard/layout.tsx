"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {BarChart3, Menu} from "lucide-react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const pathname = usePathname();

	const sidebarItems = [
		{
			name: "Usage",
			icon: BarChart3,
			href: "/dashboard/usage",
			active: pathname === "/dashboard/usage",
		},
	];

	return (
		<div className='min-h-screen bg-background pt-24'>
			<div className='flex'>
				{/* Sidebar */}
				<div
					className={`fixed top-24 left-0 h-screen bg-gradient-to-b from-background to-secondary/10 border-r border-border/20 transition-all duration-300 ${
						sidebarCollapsed ? "w-16" : "w-64"
					}`}
				>
					<div className='p-4'>
						{/* Sidebar Header */}
						<div className='flex items-center justify-between mb-6'>
							{!sidebarCollapsed && (
								<div className='flex items-center'>
									<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3'>
										<span className='text-primary-foreground font-bold text-sm'>A</span>
									</div>
									<span className='text-lg font-bold text-foreground'>All In On</span>
								</div>
							)}
							<button
								onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
								className='p-2 rounded-lg hover:bg-secondary/20 transition-colors'
							>
								<Menu className='w-5 h-5 text-foreground' />
							</button>
						</div>

						{/* Sidebar Navigation */}
						<div className='space-y-2'>
							<div className='space-y-1'>
								{!sidebarCollapsed && <div className='text-xs font-semibold text-foreground/60 uppercase tracking-wider px-3 py-2'>Menu</div>}
								{sidebarItems.map((item, index) => {
									const IconComponent = item.icon;
									return (
										<Link
											key={index}
											href={item.href}
											className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
												item.active
													? "bg-primary text-primary-foreground"
													: "text-foreground/70 hover:bg-secondary/20 hover:text-foreground"
											}`}
										>
											<IconComponent className='w-5 h-5 mr-3' />
											{!sidebarCollapsed && <span className='font-medium'>{item.name}</span>}
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className={`flex-1 p-6 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>{children}</div>
			</div>
		</div>
	);
}
