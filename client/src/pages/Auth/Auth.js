import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ChangeLanguage from "../../components/ChangeLanguage";
import ToggleButton from "../../components/ToggleButton";
import Register from "./components/Register";
import Login from "./components/Login";

const AuthPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div
      transition={transition}
      className={`w-full flex justify-evenly text-center  
      ${isLogin ? "flex-row-reverse" : ""} `}
    >
      <motion.div
        layout
        transition={transition}
        className="relative z-90 h-full 
        flex-1 flex items-center justify-center  
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
              <Login setIsLogin={setIsLogin} />
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
        initial={{ translateY: "-50%" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
        className="absolute top-1/2 z-90 -translate-y-1/2
        w-[100px] h-[100px] rounded-full bg-primary    
        border-8 border-white dark:border-dark-very-light 
        cursor-pointer"
        onClick={() => setIsLogin((prev) => !prev)}
      ></motion.div>
      <motion.div
        layout
        transition={transition}
        className="h-full   
        flex-1 flex justify-center items-center 
        bg-primary"
      ></motion.div>
    </motion.div>
  );
};

const animate = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.25 } },
  exit: { opacity: 0, scale: 0.5 },
};

const transition = {
  duration: 0.5,
};

AuthPage.propTypes = {};

export default AuthPage;

/* <AnimatePresence>
          <div>
            {isLogin && (
              <motion.div
                variants={animate}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LoginSide setIsLogin={setIsLogin} />
              </motion.div>
            )}

            {!isLogin && (
              <motion.div
                variants={animate}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <RegisterSide setIsLogin={setIsLogin} />
              </motion.div>
            )}
          </div>
        </AnimatePresence> */
