import React, { useId } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { t } from "i18next";

const InputField = (props) => {
  const id = useId();
  return (
    <div className="w-full flex flex-1 flex-col gap-1">
      <label
        htmlFor={id + props.label}
        className="text-left font-bold text-light-text-bold dark:text-dark-text-regular"
      >
        {props.label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.04 }}
        type={props.type}
        id={id + props.label}
        name={props.name}
        {...props.register(`${props.name}`)}
        className={`min-h-[44px] px-4 py-4 rounded-xl
        bg-slate-200 dark:bg-dark-regular 
        dark:text-dark-text-regular outline-none border 
        dark:border-dark-border border-gray-300  
        placeholder:opacity-75 placeholder:font-light  
        focus-within:border-primary dark:focus-within:border-primary 
        ${
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
