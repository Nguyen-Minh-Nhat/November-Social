import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import Button from "../Button";

const Modal = ({ show, setShow, children }) => {
  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {show && (
        <>
          <motion.div
            variants={backdropAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 left-0 right-0 bottom-0 z-[90] 
            backdrop-brightness-50"
            onClick={() => setShow(false)}
          ></motion.div>

          <motion.div
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-1/2 top-1/2 z-[100]
            overflow-hidden
            "
          >
            <Button
              className={
                "absolute top-2 right-2 bg-transparent shadow-none z-20"
              }
              onClick={() => setShow(false)}
            >
              <span
                className="absolute top-1 right-1 w-8 h-8
                flex items-center justify-center
                rounded-full
              bg-slate-200 dark:bg-dark-semiBold
              text-light-text-light dark:text-dark-text-regular
                cursor-pointer"
              >
                <i
                  className="fa-solid fa-xmark
                  text-xl font-normal"
                ></i>
              </span>
            </Button>
            <div> {children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal"),
  );
};

const modalAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
    translateX: "-50%",
    translateY: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0, borderRadius: "100%" },
};
const backdropAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

Modal.propTypes = {};

export default Modal;
