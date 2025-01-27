// tailwind.config.js
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				atomic_tangerine: "#fd9678ff",
				burnt_sienna: "#d97c65ff",
				bright_pink_crayola: "#f54768ff",
				quinacridone_magenta: "#974063ff",
				delft_blue: "#41436A",
				jet: "#3e3638ff",
				rose_gold: "#C25E5E",
				pinky_cream: "#FBE2D0",
				pinky_gum: "#E94A67",
				purple_pink: "#9A4968",
				light_pink: "#FE9F95",
			},
			screens: {
				tablet: "768px",
				laptop: "1024px",
				desktop: "1280px",
			},
			boxShadow: {
				"3xl": "5px 35px 60px -15px rgba(0, 0, 0 )",
			},
			fontFamily: {
				"roboto-serif": ["Roboto Serif", "serif"],
			},
			fontSize: {
				tablet: "1rem",
				laptop: "1rem",
				desktop: "1rem",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar"), // Agrega el plugin aquí
	],
};
