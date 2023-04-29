import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react";

export default function ThemeToggle({ onClick }) {
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
			onClick(savedPreference);
		}
	}, [onClick]);

	const handleClick = () => {
		const newPreference = themeMode === "dark" ? "light" : "dark";
		setThemeMode(newPreference);
		onClick(newPreference);
		localStorage.setItem("themeMode", newPreference);
	};

	if (
		typeof window !== "undefined" &&
		!window.matchMedia("(prefers-color-scheme: dark)").matches &&
		themeMode !== "dark" &&
		themeMode !== "light"
	) {
		setThemeMode("dark");
		onClick("dark");
	}

	return (
		<Tooltip title="Toggle theme">
			<IconButton onClick={handleClick}>
				{themeMode === "dark" ? (
					<Icon icon="ic:outline-dark-mode" />
				) : (
					<Icon icon="ic:outline-light-mode" />
				)}
			</IconButton>
		</Tooltip>
	);
}
