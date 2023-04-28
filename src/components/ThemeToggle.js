import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function ThemeToggle({ onChange }) {
	const [themeMode, setThemeMode] = useState(
		localStorage.getItem("themeMode") ||
			(window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
	);

	useEffect(() => {
		const savedPreference = localStorage.getItem("themeMode");
		if (savedPreference) {
			setThemeMode(savedPreference);
			onChange(savedPreference);
		}
	}, [onChange]);

	const handleChange = (event) => {
		const newPreference = event.target.checked ? "dark" : "light";
		setThemeMode(newPreference);
		onChange(newPreference);

		localStorage.setItem("themeMode", newPreference);
	};

	if (
		typeof window !== "undefined" &&
		!window.matchMedia("(prefers-color-scheme: dark)").matches &&
		themeMode !== "dark" &&
		themeMode !== "light"
	) {
		setThemeMode("dark");
		onChange("dark");
	}

	return (
		<FormControlLabel
			control={
				<Switch checked={themeMode === "dark"} onChange={handleChange} />
			}
			label="Dark Mode"
		/>
	);
}
