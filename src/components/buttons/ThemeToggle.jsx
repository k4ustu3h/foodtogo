"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ThemeToggle({ onClick }) {
	const [themeMode, setThemeMode] = useState("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const savedPreference = localStorage.getItem("themeMode");
		if (savedPreference) {
			setThemeMode(savedPreference);
			onClick(savedPreference);
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			setThemeMode("dark");
			onClick("dark");
		} else {
			setThemeMode("light");
			onClick("light");
		}
	}, [onClick]);

	const handleClick = () => {
		const newPreference = themeMode === "dark" ? "light" : "dark";
		setThemeMode(newPreference);
		onClick(newPreference);
		localStorage.setItem("themeMode", newPreference);
	};

	if (!mounted) {
		return (
			<IconButton disabled sx={{ visibility: "hidden" }}>
				<Icon icon="ic:outline-dark-mode" />
			</IconButton>
		);
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
