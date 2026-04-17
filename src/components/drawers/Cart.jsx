import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useCart, useDispatchCart } from "@/components/ContextReducer";
import Checkout from "@/components/buttons/Checkout";

export default function Cart() {
	const [state, setState] = useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	let data = useCart();
	let dispatch = useDispatchCart();

	const handleRemove = (index) => {
		dispatch({ type: "REMOVE", index: index });
	};

	let totalPrice = data.reduce((total, food) => total + food.price, 0);

	return (
		<>
			<IconButton aria-label="Cart" onClick={toggleDrawer("right", true)}>
				<Badge badgeContent={data.length} color="primary">
					<Icon icon="ic:outline-shopping-cart" width={24} />
				</Badge>
			</IconButton>
			<Drawer
				anchor="right"
				open={state["right"]}
				onClose={toggleDrawer("right", false)}
			>
				{data.length === 0 ? (
					<Box
						onKeyDown={toggleDrawer("right", false)}
						role="presentation"
						sx={{
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							width: { sm: "80vw", lg: "40vw" },
						}}
					>
						<Box
							sx={{
								pt: 6,
								pb: 10,
								textAlign: "center",
							}}
						>
							<DotLottieReact
								autoplay
								loop
								src="/animations/empty_cart.lottie"
								style={{ height: 400 }}
							/>
							<Typography color="primary" variant="h4">
								Houston, we have a problem!
							</Typography>
							<Typography gutterBottom={true} variant="h4">
								This cart is devoid of culinary delights.
							</Typography>
							<Typography
								color="textSecondary"
								variant="subtitle1"
							>
								We'll have to find some new tasty treats to fill
								up this empty cart.
							</Typography>
						</Box>
					</Box>
				) : (
					<>
						<Typography
							variant="h3"
							sx={{
								p: 3,
							}}
						>
							Your Cart
						</Typography>
						<Stack
							sx={{ width: { sm: "80vw", lg: "40vw" } }}
							role="presentation"
							onKeyDown={toggleDrawer("right", false)}
						>
							{data.map((food, index) => (
								<Box key={index} sx={{ mb: 2 }}>
									<Typography
										variant="h5"
										sx={{ px: 3, pt: 2 }}
									>
										{food.name}
									</Typography>
									<Container sx={{ display: "flex", py: 1 }}>
										<Typography
											variant="subtitle1"
											sx={{
												color: "text.secondary",
												flex: 1,
											}}
										>
											Item Price: ₹{food.price}/-
										</Typography>
										<Typography
											variant="subtitle1"
											sx={{
												color: "text.secondary",
												flex: 1,
											}}
										>
											Option: {food.size}
										</Typography>
										<Typography
											variant="subtitle1"
											sx={{
												color: "text.secondary",
												flex: 1,
											}}
										>
											Quantity: {food.qty}
										</Typography>
										<Box sx={{ mt: -1, flex: 0.5 }}>
											<IconButton
												onClick={() =>
													handleRemove(index)
												}
											>
												<Icon icon="ic:outline-delete" />
											</IconButton>
										</Box>
									</Container>
									<Divider sx={{ mx: 3 }} />
								</Box>
							))}
							<Typography
								variant="h6"
								sx={{
									p: 3,
								}}
							>
								Total Price: ₹{totalPrice}/-
							</Typography>
						</Stack>
						<Box
							sx={{
								p: 3,
							}}
						>
							<Checkout />
						</Box>
					</>
				)}
			</Drawer>
		</>
	);
}
