import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FoodItems from "../components/FoodItems";
import Footer from "../components/Footer";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../components/NavBar";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import HeroSection from "../components/HeroSection";
import { themeOptions } from "../styles/themeOptions";

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState("");
	const loadFoodItems = async () => {
		let response = await fetch("https://foodtogo.cyclic.app/api/foodData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		response = await response.json();
		setFoodItems(response[0]);
		setFoodCat(response[1]);
	};

	useEffect(() => {
		loadFoodItems();
	}, []);

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
				{foodCat.length === 0 ? (
					<Box mb={3}>
						<Typography gutterBottom variant="h4">
							<Skeleton variant="text" width="50%" />
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Grid container spacing={4}>
							{Array.from(Array(8)).map((_, index) => (
								<Grid key={index} xs={12} sm={6} md={4} lg={3}>
									<Skeleton
										variant="rectangular"
										width="100%"
										sx={{ height: 176, borderRadius: 4 }}
									/>
									<Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
									<Skeleton variant="text" width="60%" />
									<Box display="flex" mt={1}>
										<Skeleton
											variant="circular"
											sx={{ height: 40, width: 40 }}
										/>
										<Skeleton
											variant="circular"
											sx={{ height: 40, width: 40, ml: "auto" }}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				) : (
					foodCat.map((data) => {
						return (
							<Box key={data._id} mb={3}>
								<Typography gutterBottom variant="h4">
									{data.CategoryName}
								</Typography>
								<Divider sx={{ my: 2 }} />
								<Grid container spacing={4}>
									{foodItems.length > 0 &&
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
													<Grid
														key={filterItems._id}
														xs={12}
														sm={6}
														md={4}
														lg={3}
													>
														<FoodItems
															foodName={filterItems.name}
															description={filterItems.description}
															item={filterItems}
															options={filterItems.options[0]}
															ImgSrc={filterItems.img}
														></FoodItems>
													</Grid>
												);
											})}
								</Grid>
							</Box>
						);
					})
				)}
			</Container>
			<Footer onChange={handleModeChange}></Footer>
		</ThemeProvider>
	);
}
