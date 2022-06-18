import React, { useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { motion } from "framer-motion";

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 20,
  };

  const variants = {
    left: { rotate: 180 },
    right: { rotate: -180 },
  };

  return (
    <div
      className={`md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 dark:bg-indigo-900 rounded-full p-1 cursor-pointer ${
        isDarkMode ? "justify-end" : ""
      } `}
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
    >
      <motion.div
        layout
        variants={variants}
        animate={isDarkMode ? "left" : "right"}
        transition={spring}
        className={`bg-white dark:bg-indigo-950 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md flex justify-center items-center`}
      >
        {isDarkMode ? (
          <i className="fa-solid fa-moon text-blue-200 "></i>
        ) : (
          <i className="fa-solid fa-sun-bright text-yellow-200"></i>
        )}
      </motion.div>
    </div>
  );
};

export default ToggleButton;
