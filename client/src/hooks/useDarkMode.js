import { useEffect, useState } from "react";

let darkMode = false;
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkMode = true;
}

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    const prevTheme = isDarkMode ? "light" : "dark";
    root.classList.remove(prevTheme);
    const nextTheme = isDarkMode ? "dark" : "light";
    root.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }, [isDarkMode]);
  return [isDarkMode, toggleDarkMode];
}
