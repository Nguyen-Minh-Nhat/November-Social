import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { t } from "i18next";

const InputField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={props.label}
        className="text-left font-bold text-textBold dark:text-dark-textRegular"
      >
        {props.label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.04 }}
        type={props.type}
        id={props.label}
        name={props.name}
        {...props.register(`${props.name}`)}
        className="bg-slate-100 dark:bg-dark-light min-h-[44px] px-4 dark:text-dark-textRegular placeholder:text-dark-textLight py-4 rounded-main outline-none border border-transparent focus-within:border-primary outline-[0.1px]"
        placeholder={props.placeholder}
      />
      {props.error ? (
        <span className="text-left  text-base text-red-500">
          {t(props.error.message)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

InputField.propTypes = {};

export default InputField;
