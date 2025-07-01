"use client";

import {MessageSquare, Zap, HardDrive, Calendar} from "lucide-react";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar} from "recharts";

export default function UsagePage() {
	// Sample data for charts
	const conversationData = [
		{name: "Mon", conversations: 120, apiCalls: 450},
		{name: "Tue", conversations: 180, apiCalls: 520},
		{name: "Wed", conversations: 150, apiCalls: 480},
		{name: "Thu", conversations: 220, apiCalls: 600},
		{name: "Fri", conversations: 280, apiCalls: 720},
		{name: "Sat", conversations: 200, apiCalls: 550},
		{name: "Sun", conversations: 160, apiCalls: 480},
	];

	const apiCallData = [
		{name: "00:00", calls: 45},
		{name: "04:00", calls: 32},
		{name: "08:00", calls: 78},
		{name: "12:00", calls: 120},
		{name: "16:00", calls: 95},
		{name: "20:00", calls: 65},
		{name: "24:00", calls: 48},
	];

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-foreground mb-2'>Usage Dashboard</h1>
				<p className='text-foreground/70'>Manage your usage and monitor your All In On experience.</p>
			</div>

			{/* Usage Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-foreground/70 text-sm'>Conversations Used</p>
							<p className='text-3xl font-bold text-foreground'>2,847</p>
						</div>
						<div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
							<MessageSquare className='w-6 h-6 text-primary' />
						</div>
					</div>
					<div className='mt-4 flex items-center text-sm'>
						<span className='text-foreground/70'>of 10,000 limit</span>
					</div>
				</div>

				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-foreground/70 text-sm'>API Calls</p>
							<p className='text-3xl font-bold text-foreground'>15,234</p>
						</div>
						<div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center'>
							<Zap className='w-6 h-6 text-blue-500' />
						</div>
					</div>
					<div className='mt-4 flex items-center text-sm'>
						<span className='text-foreground/70'>this month</span>
					</div>
				</div>

				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-foreground/70 text-sm'>Storage Used</p>
							<p className='text-3xl font-bold text-foreground'>2.4 GB</p>
						</div>
						<div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center'>
							<HardDrive className='w-6 h-6 text-green-500' />
						</div>
					</div>
					<div className='mt-4 flex items-center text-sm'>
						<span className='text-foreground/70'>of 10 GB limit</span>
					</div>
				</div>

				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-foreground/70 text-sm'>Usage Period</p>
							<p className='text-3xl font-bold text-foreground'>23 days</p>
						</div>
						<div className='w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center'>
							<Calendar className='w-6 h-6 text-purple-500' />
						</div>
					</div>
					<div className='mt-4 flex items-center text-sm'>
						<span className='text-foreground/70'>remaining</span>
					</div>
				</div>
			</div>

			{/* Usage Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<h3 className='text-lg font-semibold text-foreground mb-4'>Conversation Usage</h3>
					<div className='h-64'>
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<AreaChart data={conversationData}>
								<defs>
									<linearGradient
										id='conversationGradient'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='#3b82f6'
											stopOpacity={0.3}
										/>
										<stop
											offset='95%'
											stopColor='#3b82f6'
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray='3 3'
									stroke='#374151'
									opacity={0.3}
								/>
								<XAxis
									dataKey='name'
									stroke='#9ca3af'
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke='#9ca3af'
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "8px",
										color: "#f9fafb",
									}}
								/>
								<Area
									type='monotone'
									dataKey='conversations'
									stroke='#3b82f6'
									strokeWidth={2}
									fill='url(#conversationGradient)'
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl border border-border/20'>
					<h3 className='text-lg font-semibold text-foreground mb-4'>API Call Trends</h3>
					<div className='h-64'>
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<BarChart data={apiCallData}>
								<CartesianGrid
									strokeDasharray='3 3'
									stroke='#374151'
									opacity={0.3}
								/>
								<XAxis
									dataKey='name'
									stroke='#9ca3af'
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke='#9ca3af'
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "8px",
										color: "#f9fafb",
									}}
								/>
								<Bar
									dataKey='calls'
									fill='#10b981'
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Usage Details Table */}
			<div className='bg-gradient-to-br from-background to-secondary/10 rounded-xl border border-border/20 overflow-hidden'>
				<div className='p-6 border-b border-border/20'>
					<h3 className='text-lg font-semibold text-foreground'>Usage Breakdown</h3>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-secondary/10'>
							<tr>
								<th className='text-left py-4 px-6 font-semibold text-foreground'>Service</th>
								<th className='text-left py-4 px-6 font-semibold text-foreground'>Used</th>
								<th className='text-left py-4 px-6 font-semibold text-foreground'>Limit</th>
								<th className='text-left py-4 px-6 font-semibold text-foreground'>Percentage</th>
								<th className='text-left py-4 px-6 font-semibold text-foreground'>Status</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border/20'>
							<tr className='hover:bg-secondary/5 transition-colors'>
								<td className='py-4 px-6 text-foreground font-medium'>Conversations</td>
								<td className='py-4 px-6 text-foreground/80'>2,847</td>
								<td className='py-4 px-6 text-foreground/80'>10,000</td>
								<td className='py-4 px-6 text-foreground/80'>28.5%</td>
								<td className='py-4 px-6'>
									<span className='px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500'>Good</span>
								</td>
							</tr>
							<tr className='hover:bg-secondary/5 transition-colors'>
								<td className='py-4 px-6 text-foreground font-medium'>API Calls</td>
								<td className='py-4 px-6 text-foreground/80'>15,234</td>
								<td className='py-4 px-6 text-foreground/80'>50,000</td>
								<td className='py-4 px-6 text-foreground/80'>30.5%</td>
								<td className='py-4 px-6'>
									<span className='px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500'>Good</span>
								</td>
							</tr>
							<tr className='hover:bg-secondary/5 transition-colors'>
								<td className='py-4 px-6 text-foreground font-medium'>Storage</td>
								<td className='py-4 px-6 text-foreground/80'>2.4 GB</td>
								<td className='py-4 px-6 text-foreground/80'>10 GB</td>
								<td className='py-4 px-6 text-foreground/80'>24.0%</td>
								<td className='py-4 px-6'>
									<span className='px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500'>Good</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
