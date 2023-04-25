import React, { useEffect, useState } from "react";
import axios from "axios";
import "@dotlottie/player-component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import tumbleweed from "../assets/animations/tumbleweed.lottie";
import { themeOptions } from "../styles/themeOptions";
export default function MyOrders() {
	const [orderData, setOrderData] = useState({});
	const [showNoOrders, setShowNoOrders] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowNoOrders(true);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const fetchMyOrder = async () => {
		console.log(localStorage.getItem("userEmail"));
		try {
			const response = await axios.post(
				"https://foodtogo.cyclic.app/api/myOrderData",
				{
					email: localStorage.getItem("userEmail"),
				}
			);
			setOrderData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchMyOrder();
	}, []);

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
			<CssBaseline />
			<Navbar />
			<Container sx={{ my: 4 }}>
				{orderData !== {}
					? Array(orderData).map((data) => {
							return data.orderData ? (
								data.orderData.order_data
									.slice(0)
									.reverse()
									.map((item, index) => {
										let gridItems = item
											.filter(
												(arrayData) =>
													!(arrayData.Order_date && arrayData.Order_time)
											)
											.map((arrayData, i) => (
												<Grid item xs={12} sm={6} md={4} lg={3} key={`${i}`}>
													<Card sx={{ width: "100%", borderRadius: 4 }}>
														<CardMedia
															image={arrayData.img}
															sx={{ height: 176, borderRadius: 4 }}
														/>
														<CardContent>
															<Typography variant="subtitle2">
																{arrayData.name}
															</Typography>
															<Typography
																color="text.secondary"
																mt={1}
																variant="subtitle1"
															>
																₹{arrayData.price}/-
															</Typography>
															<Typography
																color="text.secondary"
																mt={1}
																variant="subtitle1"
															>
																{arrayData.qty} {arrayData.size}
															</Typography>
														</CardContent>
													</Card>
												</Grid>
											));
										return (
											<React.Fragment key={`${index}`}>
												<Box mb={3}>
													<Typography gutterBottom variant="h4">
														{item[0].Order_date}
													</Typography>
													<Typography variant="h6">
														{item[0].Order_time}
													</Typography>
													<Divider sx={{ my: 2 }} />
												</Box>
												<Grid container spacing={2} sx={{ mb: 4 }}>
													{gridItems}
												</Grid>
											</React.Fragment>
										);
									})
							) : (
								<>
									{!showNoOrders ? (
										<>
											<Typography gutterBottom variant="h4">
												<Skeleton variant="text" width="40%" />
											</Typography>
											<Typography variant="h6">
												<Skeleton variant="text" width="60%" />
											</Typography>
											<Divider sx={{ my: 2 }} />
											<Grid container spacing={2} sx={{ mb: 4 }}>
												{Array.from(Array(8)).map((_, index) => (
													<Grid key={index} xs={12} sm={6} md={4} lg={3}>
														<Skeleton
															variant="rectangular"
															width="100%"
															sx={{ height: 176, borderRadius: 4 }}
														/>
														<Skeleton
															variant="text"
															width="80%"
															sx={{ mt: 1 }}
														/>
														<Skeleton variant="text" width="30%" />
														<Skeleton variant="text" width="20%" />
													</Grid>
												))}
											</Grid>
										</>
									) : (
										<Box
											sx={{
												alignItems: "center",
												display: "flex",
												justifyContent: "center",
												minHeight: "100vh",
												pt: { xs: 2, md: "64px" },
												px: { xs: 2, md: 24 },
												width: "100%",
											}}
										>
											<Box pt={6} pb={10} textAlign="center">
												<dotlottie-player autoplay loop src={tumbleweed} />
												<Typography color="primary" variant="h3">
													Zero, zip, zilch, nada.
												</Typography>
												<Typography gutterBottom variant="h3">
													Still haven't decided what to order?
												</Typography>
												<Typography color="textSecondary" variant="subtitle1">
													Go to the homepage to look at the mouth
													watering-dishes that we have to offer
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
										</Box>
									)}
								</>
							);
					  })
					: ""}
			</Container>
			<Footer onChange={handleModeChange}></Footer>
		</ThemeProvider>
	);
}
