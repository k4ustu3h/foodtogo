import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FilledInput from "@mui/material/FilledInput";
import FoodItems from "../components/FoodItems";
import Footer from "../components/Footer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Navbar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import { themeOptions } from "../styles/themeOptions";
import { Icon } from "@iconify/react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState("");
	const loadFoodItems = async () => {
		let response = await fetch("https://foodtogo.cyclic.app/api/foodData", {
			// credentials: 'include',
			// Origin:"http://localhost:3000/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		response = await response.json();
		// console.log(response[1][0].CategoryName)
		setFoodItems(response[0]);
		setFoodCat(response[1]);
	};

	useEffect(() => {
		loadFoodItems();
	}, []);

	return (
		<ThemeProvider theme={themeOptions}>
			<CssBaseline />
			<Navbar />
			<Box
				sx={{
					width: "100%",
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: { xs: 2, md: 24 },
				}}
			>
				<Grid
					container
					spacing={6}
					sx={{
						display: "flex",
						alignItems: { xs: "flex-start", md: "center" },
						flexDirection: { xs: "column-reverse", md: "row" },
						maxWidth: { xs: "100%", md: 1280 },
					}}
				>
					<Grid item xs={12} md={6} sx={{ pb: { xs: 2, md: 42 } }}>
						<Typography
							variant="h3"
							fontWeight={700}
							pb={6}
							maxWidth={512}
							color="primary.main"
						>
							Hungry? You're in the right place
						</Typography>
						<Typography variant="h6" pb={4} maxWidth={720}>
							Be it healthy or junk food, we offer a wide range of cuisines to
							satisfy your taste buds.
						</Typography>
						<Button
							variant="contained"
							color="primary"
							href="#menu"
							sx={{ width: { xs: "100%", md: 200 } }}
						>
							Take Me to the Menu
						</Button>
						<Box sx={{ mt: 8 }}>
							<FormControl sx={{ width: "100%" }}>
								<InputLabel htmlFor="search-box" sx={{ ml: 4, mt: 0.5 }}>
									Search
								</InputLabel>
								<FilledInput
									id="search-box"
									type="search"
									disableUnderline
									aria-label="Search"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
									}}
									label="Search"
									sx={{ pl: 2, pb: 1, borderRadius: 8 }}
									endAdornment={
										<InputAdornment
											position="end"
											sx={{
												visibility: search ? "visible" : "hidden",
												mt: 1,
												mr: 1,
											}}
										>
											<IconButton
												onClick={() => {
													setSearch("");
												}}
												edge="end"
											>
												<Icon icon="ic:outline-close" width="24" />
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} sx={{ mt: { xs: 8, md: 20 } }}>
						<Player
							autoplay
							loop
							src="https://assets6.lottiefiles.com/packages/lf20_tll0j4bb.json"
						></Player>
					</Grid>
				</Grid>
			</Box>
			<div className="container" id="menu">
				{foodCat !== []
					? foodCat.map((data) => {
							return (
								<div className="row mb-3">
									<div key={data._id} className="fs-3 m-3">
										{data.CategoryName}
									</div>
									<hr
										id="hr-success"
										style={{
											height: "4px",
											backgroundImage:
												"-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
										}}
									/>
									<Grid container spacing={4}>
										{foodItems !== [] ? (
											foodItems
												.filter(
													(items) =>
														items.CategoryName === data.CategoryName &&
														items.name
															.toLowerCase()
															.includes(search.toLowerCase())
												)
												.map((filterItems) => {
													return (
														<Grid key={filterItems._id}>
															<FoodItems
																foodName={filterItems.name}
																description={filterItems.description}
																item={filterItems}
																options={filterItems.options[0]}
																ImgSrc={filterItems.img}
															></FoodItems>
														</Grid>
													);
												})
										) : (
											<div> No Such Data </div>
										)}
									</Grid>
								</div>
							);
					  })
					: ""}
			</div>
			<Footer />
		</ThemeProvider>
	);
}