import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChangeLanguage from "../../components/ChangeLanguage";
import ToggleButton from "../../components/ToggleButton";
import Login from "./components/Login";
import Register from "./components/Register";

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname.includes("/login"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(location.pathname.includes("/login"));
  }, [location.pathname]);

  return (
    <motion.div
      transition={transition}
      className={`w-screen h-screen flex text-center relative  
      ${isLogin ? "justify-end" : "justify-start"} `}
    >
      <motion.div
        layout
        transition={transition}
        className="relative z-90 h-full 
        w-1/2 flex items-center justify-center  
      dark:bg-dark-very-light"
      >
        <div
          className="absolute right-8 top-8 z-50 
          flex font-bold text-lg "
        >
          <ToggleButton />
          <ChangeLanguage />
        </div>
        <AnimatePresence>
          {isLogin && (
            <motion.div
              layout
              variants={animate}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Login />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isLogin && (
            <motion.div
              layout
              variants={animate}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Register setIsLogin={setIsLogin} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        variants={topLayerAnimate}
        transition={transition}
        animate={!isLogin ? "right" : "left"}
        className="absolute h-full w-1/2 top-0 z-90 left-0   
        flex-1 flex justify-center z-30 items-center 
        bg-primary"
      ></motion.div>
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
        onClick={() => navigate(isLogin ? "/register" : "/login")}
        className="absolute z-90 top-1/2 left-1/2
          w-[100px] h-[100px] rounded-full z-40 bg-primary    
          border-8 border-white dark:border-dark-very-light 
          cursor-pointer"
      ></motion.div>
    </motion.div>
  );
};

const animate = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.25 } },
  exit: { opacity: 0, scale: 0.5 },
};

const topLayerAnimate = {
  left: { x: "0" },
  right: { x: "100%" },
};

const transition = {
  duration: 0.5,
};

export default AuthPage;
