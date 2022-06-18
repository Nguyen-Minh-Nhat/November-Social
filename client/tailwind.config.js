/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
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
      textBold: "rgb(var(--text-color-bold) / <alpha-value>)",
      textColorPrimary: "rgb(var(--text-color) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      primaryBold: "rgb(var(--color-primary-bold) / <alpha-value>)",
      dark: {
        bold: "var(--dark-color-bold)",
        semiBold: "var(--dark-color-semi-bold)",
        regular: "var(--dark-color-regular)",
        light: "var(--dark-color-light)",
        veryLight: "var(--dark-color-very-light)",
        textBold: "var(--dark-color-text-bold)",
        textRegular: "var(--dark-color-text-regular)",
        textLight: "var(--dark-color-text-light)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
