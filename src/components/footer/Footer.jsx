"use client";

import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ThemeToggle from "@/components/buttons/ThemeToggle";

export default function Footer(props) {
	const links = [
		{ name: "About Us", link: "/about" },
		{ name: "Contact Us", link: "/contact" },
	];

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
					pb: 4,
					pt: 6,
				}}
			>
				<Link
					component={NextLink}
					sx={{
						":hover": {
							color: "primary.main",
						},
					}}
					href="/"
				>
					<Icon icon="ic:twotone-delivery-dining" width="64" />
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
								component={NextLink}
								key={link.name}
								sx={{ ml: 3, mr: 3 }}
								href={link.link}
								variant="body1"
							>
								{link.name}
							</Typography>
						);
					})}
				</Box>
				<Stack direction="row" spacing={2}>
					<ThemeToggle />
					<IconButton
						href="https://facebook.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="simple-icons:facebook" width="24" />
					</IconButton>
					<IconButton
						href="https://github.com/k4ustu3h/foodtogo"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="simple-icons:github" width="24" />
					</IconButton>
					<IconButton
						href="https://instagram.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="simple-icons:instagram" width="24" />
					</IconButton>
					<IconButton
						href="https://twitter.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="simple-icons:twitter" width="24" />
					</IconButton>
				</Stack>
			</Box>
		</Container>
	);
}
