import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { motion } from "framer-motion";

import Spinner from "../Spinner";
import { clickAble } from "../../assets/animations";

let cx = classNames.bind();

const Button = ({
  type = "button",
  children,
  disabled,
  isLoading,
  onClick = () => {
    return;
  },
  className,
  ...passProps
}) => {
  let classes = cx({ ...passProps });
  const [variants, setVariants] = useState({});

  useEffect(() => {
    if (disabled || isLoading) {
      setVariants({});
    } else setVariants(clickAble);
  }, [disabled, isLoading]);

  return (
    <motion.button
      type={type}
      variants={variants}
      whileHover="hover"
      whileTap="click"
      disabled={disabled || isLoading}
      className={`button ${classes} ${className} ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } `}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </motion.button>
  );
};

export default Button;
