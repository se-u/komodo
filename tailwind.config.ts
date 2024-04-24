import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#e9f7ff",
                    100: "#ceecff",
                    200: "#a8dfff",
                    300: "#6dceff",
                    400: "#28b0ff",
                    500: "#0086ff",
                    600: "#005cff",
                    700: "#0042ff",
                    800: "#0036b1",
                    900: "#0035b1",
                    950: "#012169",
                },
                neutral: {
                    "50": "#f3f6f8",
                    "100": "#e1e9ec",
                    "200": "#c7d4da",
                    "300": "#a0b5c0",
                    "400": "#728f9e",
                    "500": "#567384",
                    "600": "#4a6070",
                    "700": "#41515d",
                    "800": "#3a4650",
                    "900": "#343c45",
                    "950": "#13171b",
                },
            },
        },
    },
    plugins: [flowbite.plugin()],
};

export default config;
