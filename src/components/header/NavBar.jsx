"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cart from "@/components/drawers/Cart";
import { ScrollToTop } from "@/components/buttons/ScrollToTop";

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

export default function NavBar(props) {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const isSmallScreen = useMediaQuery("(max-width: 450px)");
	let router = useRouter();

	useEffect(() => {
		localStorage.setItem("temp", "first");
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		router.push("/login");
	};

	const settings = [
		{ link: "/profile", name: "Profile" },
		{ link: "/myorders", name: "My Orders" },
	];

	const userMenu = [
		{ link: "/signup", name: "Sign Up" },
		{ link: "/login", name: "Login" },
	];

	return (
		<React.Fragment>
			<ElevationScroll {...props}>
				<AppBar
					color="transparent"
					position="fixed"
					sx={{ backdropFilter: "blur(6px)" }}
				>
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Box
								sx={{
									color: "primary.main",
									display: "flex",
									mr: 1,
								}}
							>
								<Icon
									icon="ic:twotone-delivery-dining"
									width={48}
								/>
							</Box>
							<Typography
								component={Link}
								href="/"
								noWrap
								sx={{
									display: "flex",
									flexGrow: { xs: 1, md: 0 },
									fontFamily: "Lobster",
									mr: 2,
									textDecoration: "none",
									color: "inherit",
								}}
								variant="h4"
							>
								Food To Go
							</Typography>
							<Stack
								direction="row"
								spacing={2}
								sx={{
									display: "flex",
									ml: "auto",
								}}
							>
								<Cart />
								<Divider
									orientation="vertical"
									variant="middle"
									flexItem
								/>
								{!isLoggedIn ? (
									<>
										<Stack
											direction="row"
											spacing={2}
											sx={{
												display: isSmallScreen
													? "none"
													: "inherit",
											}}
										>
											<Button
												component={Link}
												href="/signup"
												sx={{ color: "text.primary" }}
											>
												Sign Up
											</Button>
											<Button
												component={Link}
												href="/login"
												variant="filled"
											>
												Login
											</Button>
										</Stack>
										<Box
											sx={{
												display: isSmallScreen
													? "inherit"
													: "none",
											}}
										>
											<Tooltip title="Open settings">
												<IconButton
													onClick={handleOpenUserMenu}
													sx={{ p: 0 }}
												>
													<Avatar>
														<Icon
															icon="ic:round-person-outline"
															width={24}
														/>
													</Avatar>
												</IconButton>
											</Tooltip>
											<Menu
												anchorEl={anchorElUser}
												anchorOrigin={{
													vertical: "top",
													horizontal: "right",
												}}
												id="menu-appbar"
												keepMounted
												onClose={handleCloseUserMenu}
												open={Boolean(anchorElUser)}
												sx={{ mt: "45px" }}
												transformOrigin={{
													vertical: "top",
													horizontal: "right",
												}}
											>
												{userMenu.map((item) => (
													<Box
														component={Link}
														key={item.name}
														href={item.link}
														sx={{
															textDecoration:
																"none",
															color: "inherit",
														}}
													>
														<MenuItem
															onClick={
																handleCloseUserMenu
															}
														>
															<Typography
																sx={{
																	textAlign:
																		"center",
																}}
															>
																{item.name}
															</Typography>
														</MenuItem>
													</Box>
												))}
											</Menu>
										</Box>
									</>
								) : (
									<>
										<Tooltip title="Open settings">
											<IconButton
												onClick={handleOpenUserMenu}
												sx={{ p: 0 }}
											>
												<Avatar>
													<Icon
														icon="ic:round-person-outline"
														width={24}
													/>
												</Avatar>
											</IconButton>
										</Tooltip>
										<Menu
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											id="menu-appbar"
											keepMounted
											onClose={handleCloseUserMenu}
											open={Boolean(anchorElUser)}
											sx={{ mt: "45px" }}
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
										>
											{settings.map((setting) => (
												<Box
													component={Link}
													key={setting.name}
													href={setting.link}
													sx={{
														textDecoration: "none",
														color: "inherit",
													}}
												>
													<MenuItem
														onClick={
															handleCloseUserMenu
														}
													>
														<Typography
															sx={{
																textAlign:
																	"center",
															}}
														>
															{setting.name}
														</Typography>
													</MenuItem>
												</Box>
											))}
											<MenuItem
												key="LogOut"
												onClick={handleLogout}
											>
												<Typography
													sx={{
														textAlign: "center",
													}}
												>
													Log Out
												</Typography>
											</MenuItem>
										</Menu>
									</>
								)}
							</Stack>
						</Toolbar>
					</Container>
				</AppBar>
			</ElevationScroll>
			<Toolbar id="back-to-top-anchor" />
			<ScrollToTop />
		</React.Fragment>
	);
}
