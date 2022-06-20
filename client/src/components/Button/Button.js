import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { clickAble } from "../../assets/animations";
let cx = classNames.bind();

const Button = ({
  type = "button",
  children,
  primary,
  shadow,
  small,
  large,
  disabled,
  onClick = () => {
    return;
  },
  ...passProps
}) => {
  let classes = cx({ primary, small, large, ...passProps });

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
      className={`button ${classes} ${shadow} disabled:opacity-40 disabled:cursor-default`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {};

export default Button;
