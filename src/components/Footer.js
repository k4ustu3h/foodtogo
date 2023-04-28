import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Footer(props) {
	const links = [
		{ name: "About Us", link: "about" },
		{ name: "Contact Us", link: "contact" },
	];

	return (
		<Container maxWidth="lg">
			<Box
				display="flex"
				flexWrap="wrap"
				alignItems="center"
				sx={{ justifyContent: "center", pb: 4, pt: 6 }}
			>
				<Link
					component={RouterLink}
					sx={{
						":hover": {
							color: "primary.main",
						},
					}}
					to="/"
				>
					<Icon icon="ic:outline-delivery-dining" width="64" />
				</Link>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						mr: "auto",
						ml: 3,
						mb: 0,
					}}
				>
					{links.map((link) => {
						return (
							<Typography
								color="textPrimary"
								component={RouterLink}
								key={link.name}
								sx={{ ml: 3, mr: 3 }}
								to={link.link}
								variant="body1"
							>
								{link.name}
							</Typography>
						);
					})}
				</Box>
				<Stack direction="row" spacing={2}>
					<ThemeToggle onChange={props.onChange} />
					<IconButton href="https://facebook.com/">
						<Icon icon="simple-icons:facebook" width="24" />
					</IconButton>
					<IconButton href="https://github.com/k4ustu3h/foodtogo">
						<Icon icon="simple-icons:github" width="24" />
					</IconButton>
					<IconButton href="https://instagram.com/">
						<Icon icon="simple-icons:instagram" width="24" />
					</IconButton>
					<IconButton href="https://twitter.com/">
						<Icon icon="simple-icons:twitter" width="24" />
					</IconButton>
				</Stack>
			</Box>
		</Container>
	);
}
