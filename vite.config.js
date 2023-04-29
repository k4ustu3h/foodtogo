import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
	return {
		assetsInclude: ["**/*.lottie"],
		build: {
			outDir: "build",
		},
		plugins: [react()],
		server: {
			port: 3000,
		},
	};
});
