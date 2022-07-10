import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { AnimatePresence, motion } from "framer-motion";

const Popover = ({ visible, setVisible, className, children, render }) => {
  const elRef = useRef();
  useOnClickOutside(elRef, () => setVisible(false));
  return (
    <div className="relative" ref={elRef}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={animate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute mt-2 right-0 max-height rounded-xl p-2 overflow-hidden 
            dark:bg-dark-regular
            border dark:border-dark-border shadow
            ${className}`}
          >
            {render}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const animate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0 },
};

export default Popover;
