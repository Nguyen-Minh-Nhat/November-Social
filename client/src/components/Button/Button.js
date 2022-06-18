import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
let cx = classNames.bind();

const initialVariants = {
  hover: {
    scale: 1.04,
  },
  click: {
    scale: 0.8,
  },
};

const Button = ({
  type = "button",
  children,
  primary,
  small,
  large,
  disabled,
  ...passProps
}) => {
  let classes = cx({ primary, small, large, ...passProps });

  const [variants, setVariants] = useState({});

  useEffect(() => {
    if (disabled) {
      setVariants({});
    } else setVariants(initialVariants);
  }, [disabled]);

  return (
    <motion.button
      type={type}
      variants={variants}
      whileHover="hover"
      whileTap="click"
      disabled={disabled}
      className={`button ${classes} disabled:opacity-40 disabled:cursor-default `}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {};

export default Button;
