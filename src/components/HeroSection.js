import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function HeroSection(props) {
	return (
		<Box
			sx={{
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
				minHeight: "100vh",
				padding: { xs: 2, md: 24 },
				width: "100%",
			}}
		>
			<Grid
				container
				spacing={6}
				sx={{
					alignItems: { xs: "flex-start", md: "center" },
					display: "flex",
					flexDirection: { xs: "column-reverse", md: "row" },
					maxWidth: { xs: "100%", md: 1280 },
				}}
			>
				<Grid xs={12} md={6} sx={{ pb: { xs: 2, md: 42 } }}>
					<Typography
						color="primary.main"
						fontWeight={700}
						maxWidth={512}
						pb={6}
						variant="h3"
					>
						Hungry? You're in the right place
					</Typography>
					<Typography variant="h6" pb={4} maxWidth={720}>
						Be it healthy or junk food, we offer a wide range of cuisines to
						satisfy your taste buds.
					</Typography>
					<Button
						color="primary"
						href="#menu"
						sx={{ width: { xs: "100%", md: 200 } }}
						variant="contained"
					>
						Take Me to the Menu
					</Button>
					<Box sx={{ mt: 8 }}>
						<FormControl sx={{ width: "100%" }}>
							<InputLabel htmlFor="search-box" sx={{ ml: 4, mt: 0.6 }}>
								Search
							</InputLabel>
							<FilledInput
								aria-label="Search"
								disableUnderline
								endAdornment={
									<InputAdornment
										position="end"
										sx={{
											mr: 1,
											mt: 1,
											visibility: props.searchVisibility,
										}}
									>
										<IconButton onClick={props.searchOnClick} edge="end">
											<Icon icon="ic:outline-close" width="24" />
										</IconButton>
									</InputAdornment>
								}
								id="search-box"
								label="Search"
								onChange={props.searchOnChange}
								sx={{ pl: 2, pb: 1, borderRadius: 8 }}
								type="search"
								value={props.searchValue}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid xs={12} md={6} sx={{ mt: { xs: 8, md: 20 } }}>
					<Player
						autoplay
						loop
						src="https://assets6.lottiefiles.com/packages/lf20_tll0j4bb.json"
					></Player>
				</Grid>
			</Grid>
		</Box>
	);
}
