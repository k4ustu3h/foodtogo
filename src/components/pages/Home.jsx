"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { themeOptions } from "@/styles/themeOptions";
import FoodItems from "@/components/cards/FoodItems";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/header/NavBar";

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState("");

	const loadFoodItems = async () => {
		let response = await fetch(
			"https://foodtogo-api.vercel.app/api/foodData",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		response = await response.json();
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
			<HeroSection
				searchOnChange={(e) => {
					setSearch(e.target.value);
				}}
				searchOnClick={() => {
					setSearch("");
				}}
				searchValue={search}
				searchVisibility={search ? "visible" : "hidden"}
			/>
			<Container id="menu">
				{!foodCat || foodCat.length === 0 ? (
					<Box sx={{ mb: 3 }}>
						<Typography gutterBottom variant="h4">
							<Skeleton variant="text" width="50%" />
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Grid container spacing={4}>
							{Array.from(Array(8)).map((_, index) => (
								<Grid
									key={index}
									size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
								>
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
									<Skeleton variant="text" width="60%" />
									<Box
										sx={{
											display: "flex",
											mt: 1,
										}}
									>
										<Skeleton
											variant="circular"
											sx={{ height: 40, width: 40 }}
										/>
										<Skeleton
											variant="circular"
											sx={{
												height: 40,
												width: 40,
												ml: "auto",
											}}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				) : (
					foodCat.map((data) => {
						return (
							<Box key={data._id} sx={{ mb: 3 }}>
								<Typography gutterBottom variant="h4">
									{data.CategoryName}
								</Typography>
								<Divider sx={{ my: 2 }} />
								<Grid container spacing={4}>
									{foodItems.length > 0 &&
										foodItems
											.filter(
												(items) =>
													items.CategoryName ===
														data.CategoryName &&
													items.name
														.toLowerCase()
														.includes(
															search.toLowerCase(),
														),
											)
											.map((filterItems) => {
												return (
													<Grid
														key={filterItems._id}
														size={{
															xs: 12,
															sm: 6,
															md: 4,
															lg: 3,
														}}
													>
														<FoodItems
															foodName={
																filterItems.name
															}
															description={
																filterItems.description
															}
															item={filterItems}
															options={
																filterItems
																	.options[0]
															}
															ImgSrc={
																filterItems.img
															}
														/>
													</Grid>
												);
											})}
								</Grid>
							</Box>
						);
					})
				)}
			</Container>
			<Footer />
		</ThemeProvider>
	);
}
