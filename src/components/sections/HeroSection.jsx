"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeroSection(props) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		import("@dotlottie/player-component");
	}, []);

	return (
		<Stack
			direction={isMobile ? "column-reverse" : "row"}
			spacing={isMobile ? 6 : 4}
			sx={{
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				px: isMobile ? 2 : 24,
				py: isMobile ? 8 : 12,
				maxWidth: 1920,
				mx: "auto",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					width: isMobile ? "100%" : "50%",
				}}
			>
				<Typography
					component="h3"
					variant="h3"
					sx={{
						color: "primary.main",
						fontWeight: 700,
						maxWidth: 512,
						pb: 6,
					}}
				>
					Hungry? You're in the right place
				</Typography>
				<Typography
					variant="h6"
					sx={{
						pb: 4,
						maxWidth: 720,
					}}
				>
					Be it healthy or junk food, we offer a wide range of
					cuisines to satisfy your taste buds.
				</Typography>
				<Box>
					<Button
						color="primary"
						href="#menu"
						variant="filled"
						sx={{ mt: 3, mb: 3, fontWeight: "light" }}
					>
						Take Me to the Menu
					</Button>
				</Box>
				<Box
					p={2}
					sx={{
						mt: 3,
						bgcolor: "action.disabledBackground",
						borderRadius: 8,
					}}
				>
					<FormControl sx={{ width: "100%" }}>
						<InputLabel
							htmlFor="search-box"
							sx={{ ml: 4, mt: 0.6 }}
						>
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
									<IconButton
										onClick={props.searchOnClick}
										edge="end"
									>
										<Icon
											icon="ic:outline-close"
											width="24"
										/>
									</IconButton>
								</InputAdornment>
							}
							id="search-box"
							label="Search"
							onChange={props.searchOnChange}
							sx={{
								pl: 2,
								pb: 1,
								borderRadius: 8,
								color: "text.primary",
								fontSize: 14,
							}}
							type="search"
							value={props.searchValue}
						/>
					</FormControl>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: isMobile ? "100%" : "50%",
				}}
			>
				<dotlottie-player
					autoplay={true}
					loop={true}
					src="/animations/healthy_or_junk.lottie"
				/>
			</Box>
		</Stack>
	);
}
