import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import languages from "../../config/languages";
import ToggleButton from "../../components/ToggleButton";
import LoginSide from "./sides/LoginSide";
import RegisterSide from "./sides/RegisterSide";
import ClickAble from "../../components/ClickAble";

const LoginPage = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en",
  );
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const handleChangeLanguage = (language) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <div
      className={`w-full flex justify-evenly text-center  ${
        isLogin ? "flex-row-reverse" : ""
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
            <ClickAble key={languageItem.code}>
              <span
                className={`uppercase ${
                  languageItem.code === language
                    ? "text-primary"
                    : "dark:text-dark-textBold"
                } cursor-pointer ml-2`}
                onClick={() => handleChangeLanguage(languageItem.code)}
              >
                {languageItem.code}
              </span>
            </ClickAble>
          ))}
        </div>

        {isLogin ? (
          <LoginSide setIsLogin={setIsLogin} />
        ) : (
          <RegisterSide setIsLogin={setIsLogin} />
        )}
      </motion.div>
      <motion.div
        initial={{ translateY: "-50%" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
        className="absolute bg-primary top-1/2 w-[100px] h-[100px] rounded-full z-90 -translate-y-1/2 border-8 border-white dark:border-dark-veryLight cursor-pointer"
        onClick={() => setIsLogin((prev) => !prev)}
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
const transition = {
  duration: 0.5,
};

export default LoginPage;
