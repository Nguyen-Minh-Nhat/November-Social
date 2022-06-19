import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./components/LoginForm";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import socials from "../../config/socials";
import languages from "../../config/languages";
import ToggleButton from "../../components/ToggleButton";
import Button from "../../components/Button";
const transition = {
  // type: "spring",
  // stiffness: 500,
  // damping: 20,
  duration: 0.5,
};

const LoginPage = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en",
  );
  const { t, i18n } = useTranslation();

  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleChangeLanguage = (language) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <div
      className={`w-full flex justify-evenly text-center  ${
        isLoginForm ? "flex-row-reverse" : ""
      } `}
    >
      <motion.div
        layout
        transition={transition}
        className="flex-1 h-full flex items-center relative justify-center z-90 dark:bg-dark-veryLight"
      >
        <div className="absolute right-8 top-8 font-bold text-lg flex">
          <ToggleButton />
          {languages.map((languageItem) => (
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
              }}
              key={languageItem.code}
              className={`${
                languageItem.code === language
                  ? "text-primary"
                  : "dark:text-dark-textBold"
              } cursor-pointer ml-2`}
              onClick={() => handleChangeLanguage(languageItem.code)}
            >
              <span className="uppercase">{languageItem.code}</span>
            </motion.span>
          ))}
        </div>
        <div className="min-h-[46px] w-[460px]  flex flex-col gap-4">
          <div className="text-[36px] font-bold capitalize dark:text-dark-textBold">
            {t("login to")}
            <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
          </div>
          <div className="flex gap-2 justify-center">
            {socials.map((method) => (
              <Button key={method.name} large>
                {method.icon}
              </Button>
            ))}
          </div>
          <div>
            <div className="relative w-full flex justify-center text-[14px]">
              <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
              <span className="p-2 bg-white z-10 text-textColorPrimary/80 dark:bg-dark-veryLight dark:text-dark-textRegular">
                {t("or your account")}
              </span>
            </div>
          </div>
          <LoginForm />
        </div>
      </motion.div>
      <motion.div
        initial={{ translateY: "-50%" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
        className="absolute bg-primary top-1/2 w-[100px] h-[100px] rounded-full z-90 -translate-y-1/2 border-8 border-white dark:border-dark-veryLight cursor-pointer"
        onClick={() => setIsLoginForm((prev) => !prev)}
      ></motion.div>
      <motion.div
        layout
        transition={transition}
        className="flex-1 bg-primary h-full"
      >
        left
      </motion.div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
