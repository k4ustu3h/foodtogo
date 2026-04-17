import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartProvider } from "@/components/ContextReducer";
import ClarityInit from "@/components/analytics/ClarityInit";
import "@/styles/index.css";

export const metadata = {
	title: "Food To Go",
	description: "Not Just Another Food Delivery Website",
	manifest: "/manifest.json",
};

export const viewport = {
	themeColor: "#995c3d",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Lobster&family=Plus+Jakarta+Sans&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<AppRouterCacheProvider>
					<CartProvider>{children}</CartProvider>
				</AppRouterCacheProvider>
				<ClarityInit projectId="wcy2wvqemb" />
				<GoogleAnalytics gaId="G-GHJTXKYNWB" />
			</body>
		</html>
	);
}
