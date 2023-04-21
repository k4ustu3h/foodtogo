import { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";

function DarkModeSwitch({ onChange }) {
	const [darkModeEnabled, setDarkModeEnabled] = useState(
		localStorage.getItem("darkModeEnabled") ||
			(window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
	);

	useEffect(() => {
		const savedPreference = localStorage.getItem("darkModeEnabled");
		if (savedPreference) {
			setDarkModeEnabled(savedPreference);
			onChange(savedPreference);
		}
	}, [onChange]);

	const handleChange = (event) => {
		const newPreference = event.target.checked ? "dark" : "light";
		setDarkModeEnabled(newPreference);
		onChange(newPreference);

		localStorage.setItem("darkModeEnabled", newPreference);
	};

	if (
		typeof window !== "undefined" &&
		!window.matchMedia("(prefers-color-scheme: dark)").matches &&
		darkModeEnabled !== "dark" &&
		darkModeEnabled !== "light"
	) {
		setDarkModeEnabled("dark");
		onChange("dark");
	}

	return (
		<FormControlLabel
			control={
				<Switch checked={darkModeEnabled === "dark"} onChange={handleChange} />
			}
			label="Dark Mode"
		/>
	);
}

export default DarkModeSwitch;
