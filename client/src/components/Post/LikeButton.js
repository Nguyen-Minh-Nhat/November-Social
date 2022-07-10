import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const LikeButton = ({ onClick = () => {}, isActive, className }) => {
  const [isLiked, setIsLiked] = useState(isActive);
  const heartRef = useRef(null);
  const handleClick = (e) => {
    onClick();
    setIsLiked(!isLiked);
    if (heartRef) {
      heartRef.current.classList.add("bouncy");
      if (heartRef.current.classList.contains("bouncy")) {
        setTimeout(() => {
          heartRef.current.classList.remove("bouncy");
        }, 500);
      }
    }
  };
  return (
    <div
      className={`button circle shadow-none dark:hover:text-dark-text-bold  ${
        isLiked ? "dark:text-dark-text-bold" : "dark:text-dark-text-regular"
      } ${className}`}
      onClick={handleClick}
    >
      <i ref={heartRef} className="fa-solid fa-heart relative z-10 heart"></i>
      <AnimatePresence>
        {isLiked && (
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
            className="absolute w-full h-full bg-red-600 z-0 rounded-full"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;
