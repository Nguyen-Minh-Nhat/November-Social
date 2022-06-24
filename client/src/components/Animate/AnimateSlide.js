import React from "react";
import { motion } from "framer-motion";

const animate = {
  hidden: {
    opacity: 0,
    x: 200,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: "spring", stiffness: 500, damping: 30 },
      opacity: { duration: 0.5 },
    },
  },
  exit: {
    opacity: 0,
    x: -200,
  },
};
const AnimateSlide = ({ children }) => {
  return (
    <motion.div
      variants={animate}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimateSlide;
