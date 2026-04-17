"use client";

import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";

export default function ThemeToggle() {
	const { mode, setMode, systemMode } = useColorScheme();

	const handleClick = () => {
		const currentMode = mode === "system" ? systemMode : mode;
		setMode(currentMode === "dark" ? "light" : "dark");
	};

	return (
		<Tooltip title="Toggle theme">
			<IconButton onClick={handleClick}>
				<Box
					component="span"
					sx={[
						{ display: "inline-flex" },
						(theme) =>
							theme.applyStyles("dark", { display: "none" }),
					]}
				>
					<Icon icon="ic:outline-dark-mode" />
				</Box>

				<Box
					component="span"
					sx={[
						{ display: "none" },
						(theme) =>
							theme.applyStyles("dark", {
								display: "inline-flex",
							}),
					]}
				>
					<Icon icon="ic:outline-light-mode" />
				</Box>
			</IconButton>
		</Tooltip>
	);
}
