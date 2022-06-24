import React from "react";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const IconCheck = () => {
  return (
    <motion.svg
      variants={draw}
      initial="hidden"
      animate="visible"
      width="100"
      height="100"
      viewBox="0 0 48 48"
      className="fill-green-500"
    >
      <motion.path
        variants={draw}
        initial="hidden"
        animate="visible"
        d="M16,32l3,3L37,17l-3-3Z"
        className=" fill-green-500"
      ></motion.path>{" "}
      <motion.path
        variants={draw}
        initial="hidden"
        animate="visible"
        d="M22,32l-3,3-8-8,3-3Z"
        className="fill-green-500 "
      ></motion.path>
    </motion.svg>
  );
};

export default IconCheck;
