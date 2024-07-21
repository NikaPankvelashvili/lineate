import { light } from "@mui/material/styles/createPalette";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      mmd: "880px"
    },
    colors: {
      dark: {
        primary: "#161617",
        secondary: "#2b2b2c"
      },
      light: {
        primary: "#ffffff",
        secondary: "#616161"
      }
    },
    textColor: {
      white: "#ffffff",
      black: "#000000",
      gray: "#909090",
    }
  },
  plugins: [],
  darkMode: "class",
};
export default config;