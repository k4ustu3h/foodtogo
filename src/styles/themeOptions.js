"use client";

import { createTheme } from "@mui/material/styles";
import palette from "@/styles/palette.json";

const sharedPalette = {
	primary: {
		main: palette.brown["500"],
		light: palette.brown["300"],
		dark: palette.brown["700"],
	},
	secondary: {
		main: palette.tealA700,
		light: palette.tealA400,
		dark: palette.teal["700"],
	},
	error: palette.error,
	warning: palette.warning,
	info: palette.info,
	success: palette.success,
};

export const themeOptions = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-mui-color-scheme",
	},
	colorSchemes: {
		light: {
			palette: sharedPalette,
		},
		dark: {
			palette: sharedPalette,
		},
	},
	typography: {
		fontFamily: "Plus Jakarta Sans",
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				color: "transparent",
			},
		},
		MuiButton: {
			variants: [
				{
					props: { variant: "filled" },
					style: ({ theme }) => ({
						height: 40,
						color: "white",
						paddingLeft: 24,
						paddingRight: 24,
						borderRadius: 20,
						backgroundColor: theme.vars.palette.primary.main,
						":hover": {
							backgroundColor: theme.vars.palette.primary.dark,
							color: "white",
						},
						textTransform: "none",
					}),
				},
				{
					props: { variant: "text" },
					style: {
						height: 40,
						paddingLeft: 12,
						paddingRight: 12,
						borderRadius: 20,
						textTransform: "none",
					},
				},
			],
		},
	},
});
