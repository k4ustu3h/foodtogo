import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { themeOptions } from "../styles/themeOptions";

export default function ErrorPage() {
	return (
		<ThemeProvider theme={themeOptions}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Box pt={6} pb={10} textAlign="center">
					<Player
						autoplay
						loop
						src="https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json"
						style={{ height: 400 }}
					></Player>
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
							variant="contained"
						>
							Return to the homepage
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
