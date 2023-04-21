import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { themeOptions } from "../styles/themeOptions";

export default function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("https://foodtogo.cyclic.app/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			localStorage.setItem("userEmail", credentials.email);
			localStorage.setItem("token", json.authToken);
			navigate("/");
		} else {
			alert("Enter Valid Credentials");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const [mode, setMode] = useState(() => {
		const storedMode = localStorage.getItem("darkModeEnabled");
		return storedMode !== null ? storedMode : "dark";
	});

	const handleModeChange = (newMode) => {
		setMode(newMode);
		localStorage.setItem("darkModeEnabled", newMode);
	};

	return (
		<ThemeProvider theme={themeOptions(mode)}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<NavBar />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<Icon icon="ic:outline-lock" width="24" />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={credentials.email}
							onChange={onChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={credentials.password}
							onChange={onChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link component={RouterLink} to="/" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link component={RouterLink} to="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			<Footer onChange={handleModeChange}></Footer>
		</ThemeProvider>
	);
}
