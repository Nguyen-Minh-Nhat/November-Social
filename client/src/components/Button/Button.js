import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { clickAble } from "../../assets/animations";
let cx = classNames.bind();

const Button = ({
  type = "button",
  children,
  disabled,
  onClick = () => {
    return;
  },
  className,
  ...passProps
}) => {
  let classes = cx({ ...passProps });
  const [variants, setVariants] = useState({});

  useEffect(() => {
    if (disabled) {
      setVariants({});
    } else setVariants(clickAble);
  }, [disabled]);

  return (
    <motion.button
      type={type}
      variants={variants}
      whileHover="hover"
      whileTap="click"
      disabled={disabled}
      className={`button ${classes} ${className} disabled:opacity-40 disabled:cursor-not-allowed`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {};

export default Button;
