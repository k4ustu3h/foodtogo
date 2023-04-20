import { useTheme } from "@mui/material/styles";
import { FormControlLabel, Switch } from "@mui/material";

function DarkModeSwitch({ onChange }) {
	const theme = useTheme();

	const handleChange = (event) => {
		onChange(event.target.checked ? "dark" : "light");
	};

	return (
		<FormControlLabel
			control={
				<Switch
					checked={theme.palette.mode === "dark"}
					onChange={handleChange}
				/>
			}
			label="Dark Mode"
		/>
	);
}

export default DarkModeSwitch;
