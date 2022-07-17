/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.75s linear infinite",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      red: colors.red,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      slate: colors.slate,
      blue: colors.blue,
      sky: colors.sky,
      "text-bold": "rgb(var(--text-color-bold) / <alpha-value>)",
      "text-color-primary": "rgb(var(--text-color) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      "primary-bold": "rgb(var(--color-primary-bold) / <alpha-value>)",
      dark: {
        bold: "rgb(21, 26, 35)",
        semiBold: "rgb(26, 33, 44)",
        regular: "rgb(32, 40, 54)",
        light: "rgb(40, 49, 67)",
        "very-light": "rgb(47, 59, 80)",
        border: "rgb(59, 73, 99)",

        //text dark
        "text-bold": "#fafafa",
        "text-regular": " rgb(162, 165, 185)",
        "text-light": "rgb(117, 122, 145)",
      },
      light: {
        "text-bold": "#4a4b67",
        "text-semiBold": "#757a91",
        "text-regular": "#787d93",
        "text-light": "#888da8",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
