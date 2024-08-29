module.exports = {
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
			},
			screens: {
				tablet: "768px",
				laptop: "1024px",
				desktop: "1366px",
			},
			boxShadow: {
				"3xl": "5px 35px 60px -15px rgba(0, 0, 0 )",
			},
			fontFamily: {
				"roboto-serif": ["Roboto Serif", "serif"], // Agregando la fuente Roboto Serif
			},
			fontSize: {
				96: "6rem",
				80: "5rem",
				20: "1.5rem",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
