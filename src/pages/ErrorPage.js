import React, { useState } from "react";
import "@dotlottie/player-component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Footer from "../components/Footer";
import astronaut from "../assets/animations/astronaut.lottie";
import { themeOptions } from "../styles/themeOptions";

export default function ErrorPage() {
	const [mode, setMode] = useState(() => {
		const storedMode = localStorage.getItem("themeMode");
		return storedMode !== null ? storedMode : "dark";
	});

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
				<Box pt={6} pb={10} textAlign="center">
					<dotlottie-player autoplay loop src={astronaut} />
					<Typography color="primary" variant="h3">
						Whoops!
					</Typography>
					<Typography gutterBottom={true} variant="h3">
						Something went wrong!
					</Typography>
					<Typography color="textSecondary" variant="subtitle1">
						Looks like you wandered off to somewhere that just doesn't exist
					</Typography>
					<Typography color="textSecondary" variant="caption">
						(or it may be that this page hasn't been built yet)
					</Typography>
					<Box mt={3}>
						<Button
							color="primary"
							component={RouterLink}
							to="/"
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
