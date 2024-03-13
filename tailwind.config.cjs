/** @type {import('tailwindcss').Config} */
// the pallette colors is based in this theme:
// https://ar.pinterest.com/pin/764908317985213312/
// https://coolors.co/fd9678-d97c65-f54768-974063-41436a-3e3638
//
// /* CSS HEX */
// --atomic-tangerine: #fd9678ff;
// --burnt-sienna: #d97c65ff;
// --bright-pink-crayola: #f54768ff;
// --quinacridone-magenta: #974063ff;
// --delft-blue: #41436aff;
// --jet: #3e3638ff;
//
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        atomic_tangerine: "#fd9678ff",
        burnt_sienna: "#d97c65ff",
        bright_pink_crayola: "#f54768ff",
        quinacridone_magenta: "#974063ff",
        delft_blue: "#41436aff",
        jet: "#3e3638ff",
      },
      screens: {
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
      },
      boxShadow: {
        "3xl": "5px 35px 60px -15px rgba(0, 0, 0 )",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
