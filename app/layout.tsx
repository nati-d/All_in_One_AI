import type {Metadata} from "next";
import {Geist_Mono} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "./contexts/AuthContext";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "All In One AI - Your AI Assistant",
	description:
		"All In One AI is your comprehensive AI assistant for automation, task management, and intelligent workflows. Create, manage, and optimize AI agents for various business needs.",
	keywords: "AI assistant, automation, AI agents, task management, workflow optimization, artificial intelligence, business automation",
	authors: [{name: "Abebe Kebede"}],
	creator: "All In One AI",
	publisher: "All In One AI",
	robots: "index, follow",
	viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
	openGraph: {
		title: "All In One AI - Your AI Assistant",
		description: "All In One AI is your comprehensive AI assistant for automation, task management, and intelligent workflows.",
		type: "website",
		locale: "en_US",
		siteName: "All In One AI",
	},
	twitter: {
		card: "summary_large_image",
		title: "All In One AI - Your AI Assistant",
		description: "All In One AI is your comprehensive AI assistant for automation, task management, and intelligent workflows.",
		creator: "@allinoneai",
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`h-[100dvh] antialiased`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
