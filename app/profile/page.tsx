"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {User, Mail, Edit, Save, X, LogOut, Crown, CheckCircle} from "lucide-react";

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);

	// Mock user data
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		plan: "Pro",
		status: "Active",
	};

	return (
		<div
			className='min-h-screen bg-background'
			style={{paddingTop: "var(--navbar-height, 4rem)"}}
		>
			{/* Hero Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10'></div>
				<div className='relative max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
						Your <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Profile</span>
					</h1>
					<p className='text-xl text-foreground/80 mb-8 leading-relaxed'>
						Manage your account information and preferences. Keep your profile up to date for the best experience.
					</p>
				</div>
			</section>

			{/* Profile Content */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 relative'>
				<div className='max-w-2xl mx-auto'>
					{/* Profile Card */}
					<div className='group relative bg-gradient-to-br from-background to-secondary/10 p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 transform hover:scale-105'>
						<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						<div className='relative'>
							{/* Header */}
							<div className='flex items-center justify-between mb-8'>
								<div>
									<h2 className='text-2xl font-bold text-foreground mb-2'>Personal Information</h2>
									<p className='text-foreground/70'>Update your profile details</p>
								</div>
								<Button
									variant={isEditing ? "destructive" : "outline"}
									size='sm'
									onClick={() => setIsEditing(!isEditing)}
									className='flex items-center gap-2 transition-all duration-200 hover:scale-105'
								>
									{isEditing ? <X className='w-4 h-4' /> : <Edit className='w-4 h-4' />}
									{isEditing ? "Cancel" : "Edit"}
								</Button>
							</div>

							{/* Form Fields */}
							<div className='space-y-6'>
								{/* Name */}
								<div className='space-y-3'>
									<label className='text-sm font-medium text-foreground flex items-center gap-2'>
										<div className='w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center'>
											<User className='w-4 h-4 text-primary-foreground' />
										</div>
										Full Name
									</label>
									<Input
										defaultValue={user.name}
										disabled={!isEditing}
										className='bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-200 h-12 text-foreground placeholder:text-foreground/50'
										placeholder='Enter your full name'
									/>
								</div>

								{/* Email */}
								<div className='space-y-3'>
									<label className='text-sm font-medium text-foreground flex items-center gap-2'>
										<div className='w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center'>
											<Mail className='w-4 h-4 text-primary-foreground' />
										</div>
										Email Address
									</label>
									<Input
										defaultValue={user.email}
										disabled={!isEditing}
										className='bg-background/50 border-border/30 focus:border-primary/50 transition-all duration-200 h-12 text-foreground placeholder:text-foreground/50'
										placeholder='Enter your email address'
									/>
								</div>

								{/* Plan & Status */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
									<div className='space-y-3'>
										<label className='text-sm font-medium text-foreground'>Subscription Plan</label>
										<div className='flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20'>
											<div className='w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center'>
												<Crown className='w-5 h-5 text-primary-foreground' />
											</div>
											<div>
												<Badge
													variant='secondary'
													className='bg-primary/20 text-primary border-primary/30 font-medium'
												>
													{user.plan}
												</Badge>
												<p className='text-xs text-foreground/70 mt-1'>Premium features included</p>
											</div>
										</div>
									</div>
									<div className='space-y-3'>
										<label className='text-sm font-medium text-foreground'>Account Status</label>
										<div className='flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20'>
											<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-500/80 rounded-lg flex items-center justify-center'>
												<CheckCircle className='w-5 h-5 text-white' />
											</div>
											<div>
												<Badge
													variant='secondary'
													className='bg-green-500/20 text-green-500 border-green-500/30 font-medium'
												>
													{user.status}
												</Badge>
												<p className='text-xs text-foreground/70 mt-1'>Account is active</p>
											</div>
										</div>
									</div>
								</div>

								{/* Save Button */}
								{isEditing && (
									<div className='flex justify-end pt-6 border-t border-border/30'>
										<Button className='bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'>
											<Save className='w-4 h-4 mr-2' />
											Save Changes
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Sign Out */}
					<div className='mt-8 text-center'>
						<Button
							variant='outline'
							className='border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-accent/20'
						>
							<LogOut className='w-4 h-4 mr-2' />
							Sign Out
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
