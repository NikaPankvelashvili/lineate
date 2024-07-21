/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      dark: {
        primary: "#161617",
        secondary: "#2b2b2c"
      },
      light: {
        primary: "#454545",
        secondary: "#909090"
      }
    },
    textColor: {
      white: "#ffffff",
      black: "#000000",
      gray: "#909090",
    }
  },
  plugins: [],
  darkMode: 'class',
}

