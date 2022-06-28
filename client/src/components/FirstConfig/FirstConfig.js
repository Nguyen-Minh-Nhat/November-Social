import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useDarkMode from "../../hooks/useDarkMode";

const FirstConfig = () => {
  const { i18n } = useTranslation();
  const [a, b] = useDarkMode();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang || "en");
  }, []);
  return <></>;
};

export default FirstConfig;
