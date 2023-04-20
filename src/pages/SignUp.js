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
import { themeOptions } from "../styles/themeOptions";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SignUp() {
	const [credentials, setCredentials] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		geolocation: "",
	});

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("https://foodtogo.cyclic.app/api/createuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: credentials.firstName,
				lastName: credentials.lastName,
				email: credentials.email,
				password: credentials.password,
				location: credentials.geolocation,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//save the auth toke to local storage and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/login");
		} else {
			alert("Enter Valid Credentials");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const [mode, setMode] = useState("dark");

	const handleModeChange = (newMode) => {
		setMode(newMode);
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
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={credentials.firstName}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									value={credentials.lastName}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={credentials.email}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={credentials.password}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="geolocation"
									label="Enter your address."
									id="geolocation"
									autoComplete="address-level2"
									value={credentials.geolocation}
									onChange={onChange}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link component={RouterLink} to="/login" variant="body2">
									Already have an account? Sign in
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
