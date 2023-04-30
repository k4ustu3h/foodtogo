import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { brown } from "../../styles/palette";
import { useCart, useDispatchCart } from "../ContextReducer";

export default function Checkout() {
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	let orderData = useCart();
	let dispatch = useDispatchCart();

	async function displayRazorpay() {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		let userEmail = localStorage.getItem("userEmail");
		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?");
			return;
		}

		const result = await axios.post("https://foodtogo.cyclic.app/api/orders");

		if (!result) {
			alert("Server error. Are you online?");
			return;
		}

		const { id: order_id, currency } = result.data;

		const options = {
			key: process.env.RAZORPAY_KEY_ID,
			amount: "50000",
			currency: currency,
			name: "Food To Go",
			description: "Test Transaction",
			order_id: order_id,
			handler: async function (res) {
				let response = await fetch(
					"https://foodtogo.cyclic.app/api/orderData",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							order_data: orderData,
							email: userEmail,
							order_date: new Date().toDateString(),
							order_time: new Date().toTimeString(),
							orderCreationId: order_id,
							razorpayPaymentId: res.razorpay_payment_id,
							razorpayOrderId: res.razorpay_order_id,
							razorpaySignature: res.razorpay_signature,
						}),
					}
				);
				console.log("JSON RESPONSE:::::", response.status);
				if (response.status === 200) {
					setLoading(false);
					dispatch({ type: "DROP" });
				}
			},
			prefill: {
				email: userEmail,
			},
			notes: {
				address: "Not just another food delivery website",
			},
			theme: {
				color: brown[500],
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	const handleClick = () => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		} else if (localStorage.getItem("token") && !loading) {
			displayRazorpay();
			setLoading(true);
		}
	};

	return (
		<div>
			<Box maxWidth={128}>
				<Button
					disabled={loading}
					onClick={handleClick}
					startIcon={
						<Icon icon="ic:outline-shopping-cart-checkout" width={18} />
					}
					variant="filled"
				>
					Checkout
				</Button>
				{loading && (
					<LinearProgress
						sx={{
							ml: 1,
							mt: -0.52,
							borderBottomLeftRadius: 4,
							borderBottomRightRadius: 4,
						}}
					/>
				)}
			</Box>
		</div>
	);
}
