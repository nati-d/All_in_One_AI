export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
	// All pages removed - keeping only home page
];

export const ACCOUNT_ITEM: NavItem = {
	label: "Account",
	href: "/profile",
};

export const LOGO_CONFIG = {
	text: "AIA",
	href: "/",
};
