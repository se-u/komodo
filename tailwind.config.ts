// import daisyui from "daisyui";

// /** @type {import('tailwindcss').Config} */
// module.exports = {

//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui],
// };

import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.10)",
          "0 0px 65px rgba(255, 255,255, 0.15)",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // daisyui: {
  //   themes: ["light"],
  // },
  // plugins: [],
  plugins: [daisyui],
};
export default config;
