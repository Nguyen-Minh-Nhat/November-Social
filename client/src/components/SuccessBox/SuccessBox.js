import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TickIcon from "../../assets/icons/TickIcon";

const SuccessBox = ({ title, description, children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex-1 flex flex-col gap-4 justify-center items-center p-4 
        rounded-xl bg-slate-200 dark:bg-dark-regular"
      >
        <div className="w-32 h-32 rounded-xl">
          <TickIcon />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <span className="font-bold text-primary-bold dark:text-primary">
            {t(title)}
          </span>
          <p className="text-light-text-regular dark:text-dark-text-regular">
            {" "}
            {t(description)}
          </p>
        </motion.div>
      </div>
      {children}
    </div>
  );
};

export default SuccessBox;
