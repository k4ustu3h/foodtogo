"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import NextLink from "next/link";
import Typography from "@mui/material/Typography";

import { themeOptions } from "@/styles/themeOptions";
import Footer from "@/components/footer/Footer";

export default function Error() {
	const [mode, setMode] = useState("dark");

	useEffect(() => {
		const storedMode = localStorage.getItem("themeMode");
		if (storedMode !== null) {
			setMode(storedMode);
		}
	}, []);

	const handleModeChange = (newMode) => {
		setMode(newMode);
		localStorage.setItem("themeMode", newMode);
	};

	return (
		<ThemeProvider theme={themeOptions(mode)}>
			<CssBaseline />
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					justifyContent: "center",
					minHeight: "100vh",
					pt: { xs: 2, md: 24 },
					px: { xs: 2, md: 24 },
					width: "100%",
				}}
			>
				<Box
					sx={{
						pt: 6,
						pb: 10,
						textAlign: "center",
					}}
				>
					<DotLottieReact
						autoplay
						loop
						src="/animations/astronaut.lottie"
					/>

					<Typography color="primary" variant="h3">
						Whoops!
					</Typography>
					<Typography gutterBottom={true} variant="h3">
						Something went wrong!
					</Typography>
					<Typography color="textSecondary" variant="subtitle1">
						Looks like you wandered off to somewhere that just
						doesn't exist
					</Typography>
					<Typography color="textSecondary" variant="caption">
						(or it may be that this page hasn't been built yet)
					</Typography>
					<Box
						sx={{
							mt: 3,
						}}
					>
						<Button
							color="primary"
							component={NextLink}
							href="/"
							variant="filled"
						>
							Return to the homepage
						</Button>
					</Box>
				</Box>
			</Box>
			<Footer onClick={handleModeChange} />
		</ThemeProvider>
	);
}
