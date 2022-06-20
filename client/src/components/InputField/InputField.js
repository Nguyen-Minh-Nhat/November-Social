import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { t } from "i18next";

const InputField = (props) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
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
        className={`bg-slate-200 dark:border-gray-600 border-gray-300 dark:bg-dark-regular min-h-[44px] px-4 dark:text-dark-textRegular placeholder:opacity-50 placeholder:font-light py-4 rounded-main outline-none border focus-within:border-primary dark:focus-within:border-primary ${
          props.error
            ? "border-red-500 focus-within:border-red-500 dark:focus-within:border-red-500"
            : ""
        }`}
        autoComplete="current-password"
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
