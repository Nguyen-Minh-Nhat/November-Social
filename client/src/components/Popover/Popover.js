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

// import { useRef } from "react";
// import useOnClickOutside from "../../hooks/useOnClickOutside";
// import { AnimatePresence, motion } from "framer-motion";
// import { createPortal } from "react-dom";

// const Popover = ({
//   visible,
//   setVisible,
//   className,
//   children,
//   render,
//   placement = "center",
// }) => {
//   const elRef = useRef();
//   useOnClickOutside(elRef, () => setVisible(false));
//   const renderPover = () => {
//     const { top, bottom, left, width, height, right } =
//       elRef.current?.getBoundingClientRect();
//     console.log(left);
//     let stylePlacement = {
//       top: bottom,
//       left: left + width / 2,
//       transform: "translateX(-50%)",
//     };
//     if (placement === "right") {
//       stylePlacement = {
//         bottom: window.innerHeight - top - window.scrollY,
//         right: window.innerWidth - left - window.scrollX,
//         transform: `translate(${width}px, calc(100% + ${height + 8}px))`,
//       };
//     }
//     return (
//       <div
//         className="absolute z-[99999]"
//         style={{
//           bottom: window.innerHeight - top - window.scrollY,
//           right: window.innerWidth - left - window.scrollX,
//           transform: `translate(${width}px, calc(100% + ${height + 8}px))`,
//         }}
//       >
//         <motion.div
//           variants={animate}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className={`relative max-height-full rounded-xl p-2 overflow-hidden
//               dark:bg-dark-regular
//               border dark:border-dark-border shadow
//               ${className}`}
//         >
//           {render}
//         </motion.div>
//       </div>
//     );
//   };
//   return (
//     <div className="relative" ref={elRef}>
//       {children}
//       {/* <AnimatePresence>
//         {visible && (
//           <motion.div
//             variants={animate}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className={`absolute mt-2 right-0 max-height rounded-xl p-2 overflow-hidden
//             dark:bg-dark-regular
//             border dark:border-dark-border shadow
//             ${className}`}
//           >
//             {render}
//           </motion.div>
//         )}
//       </AnimatePresence> */}
//       {createPortal(
//         <AnimatePresence>{visible && renderPover()}</AnimatePresence>,
//         document.getElementById("popover"),
//       )}
//     </div>
//   );
// };

// const animate = {
//   hidden: { opacity: 0, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 260,
//       damping: 20,
//     },
//   },
//   exit: { opacity: 0, scale: 0 },
// };

// export default Popover;
