export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
	},
	{
		label: "Playground",
		href: "/playground",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "Docs",
		href: "/docs",
		external: true,
	},
];

export const ACCOUNT_ITEM: NavItem = {
	label: "Account",
	href: "/account",
};

export const LOGO_CONFIG = {
	text: "AIA",
	href: "/",
};
