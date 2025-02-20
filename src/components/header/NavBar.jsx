import React from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cart from "../drawers/Cart";
import { ScrollToTop } from "../buttons/ScrollToTop";

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
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const isSmallScreen = useMediaQuery("(max-width: 450px)");

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const settings = [
		{ link: "/profile", name: "Profile" },
		{ link: "/myorders", name: "My Orders" },
	];

	const userMenu = [
		{ link: "/signup", name: "Sign Up" },
		{ link: "/login", name: "Login" },
	];

	localStorage.setItem("temp", "first");
	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");

		navigate("/login");
	};

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
							<Box sx={{ color: "primary.main", display: "flex", mr: 1 }}>
								<Icon icon="ic:twotone-delivery-dining" width={48} />
							</Box>
							<Typography
								component={RouterLink}
								noWrap
								sx={{
									display: "flex",
									flexGrow: { xs: 1, md: 0 },
									fontFamily: "Lobster",
									mr: 2,
								}}
								to="/"
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
								<Divider orientation="vertical" variant="middle" flexItem />
								{!localStorage.getItem("token") ? (
									<>
										<Stack
											direction="row"
											display={isSmallScreen ? "none" : "inherit"}
											spacing={2}
										>
											<Button
												component={RouterLink}
												sx={{ color: "text.primary" }}
												to="/signup"
											>
												Sign Up
											</Button>
											<Button
												component={RouterLink}
												to="/login"
												variant="filled"
											>
												Login
											</Button>
										</Stack>
										<Box display={isSmallScreen ? "inherit" : "none"}>
											<Tooltip title="Open settings">
												<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
													<Avatar>
														<Icon icon="ic:round-person-outline" width={24} />
													</Avatar>
												</IconButton>
											</Tooltip>
											<Menu
												anchorEl={anchorElUser}
												anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
														component={RouterLink}
														key={item.name}
														to={item.link}
													>
														<MenuItem onClick={handleCloseUserMenu}>
															<Typography textAlign="center">
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
											<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
												<Avatar>
													<Icon icon="ic:round-person-outline" width={24} />
												</Avatar>
											</IconButton>
										</Tooltip>
										<Menu
											anchorEl={anchorElUser}
											anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
													component={RouterLink}
													key={setting.name}
													to={setting.link}
												>
													<MenuItem onClick={handleCloseUserMenu}>
														<Typography textAlign="center">
															{setting.name}
														</Typography>
													</MenuItem>
												</Box>
											))}
											<MenuItem key="LogOut" onClick={handleLogout}>
												<Typography textAlign="center">Log Out</Typography>
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
