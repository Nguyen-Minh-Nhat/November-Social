import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useDarkMode from "../../hooks/useDarkMode";

const FirstConfig = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang || "en");
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default FirstConfig;
