import { motion } from "framer-motion";
import React from "react";

const ClickAble = ({ children, scale = 1.2 }) => {
  const variants = {
    hover: {
      scale,
    },
    click: {
      scale: 0.8,
    },
  };

  return (
    <motion.div
      variants={variants}
      whileHover="hover"
      whileTap="click"
      className="flex-1"
    >
      {children}
    </motion.div>
  );
};

ClickAble.propTypes = {};

export default ClickAble;
