import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const FillButon = ({
  children,
  onClick,
  className,
  fillColor = "bg-primary",
  isActive,
}) => {
  const [active, setActive] = useState(isActive);
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClick = () => {
    setActive(!active);
    onClick();
  };
  return (
    <div
      className={`button circle shadow-none dark:hover:text-dark-text-bold ${className} ${
        active ? "dark:text-dark-text-bold" : "dark:text-dark-text-regular"
      } `}
      onClick={handleClick}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                default: { duration: 0.5 },
              },
            }}
            exit={{
              scale: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                default: { duration: 0.5 },
              },
            }}
            className={`absolute w-full h-full ${fillColor} z-0 rounded-full`}
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="relative"> {children}</div>
    </div>
  );
};

export default FillButon;
