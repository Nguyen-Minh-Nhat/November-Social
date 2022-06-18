import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const I18n = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang || "en");
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // // Whenever the user explicitly chooses light mode
    // localStorage.theme = "light";

    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";

    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default I18n;
