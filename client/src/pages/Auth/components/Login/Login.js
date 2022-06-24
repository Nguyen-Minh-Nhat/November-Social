import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import socials from "../../../../config/socials";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import LoginForm from "./Form/LoginForm";

const Login = ({ setIsLogin }) => {
  const { t } = useTranslation();
  const [forgotPassword, setForgotPassword] = useState(false);
  return (
    <div className="min-h-[46px] w-[460px] flex flex-col gap-4">
      <div
        className="mb-4 font-bold capitalize text-[36px]  
      text-light-text-bold dark:text-dark-text-bold"
      >
        {t("login to")}
        <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
      </div>
      <div className="flex justify-center gap-6">
        {socials.map((method) => (
          <Button key={method.name} w-16 h-14>
            <span className="text-[20px]">{method.icon}</span>
          </Button>
        ))}
      </div>
      <div>
        <div className="relative w-full flex justify-center text-[14px]">
          <div className="absolute top-1/2 z-0 left-0 w-full h-[1px] bg-primary/30"></div>
          <span
            className="z-10 p-2 flex justify-center items-center 
          bg-white dark:bg-dark-very-light
            text-text-color-primary/80 dark:text-dark-text-regular"
          >
            {t("or your account")}
          </span>
        </div>
      </div>
      <LoginForm setForgotPassword={setForgotPassword} />
      <div className="text-left text-[16px]">
        <span className="text-light-text-bold dark:text-dark-text-light">
          {t("Don't have an account")}?{" "}
          <span
            onClick={() => setIsLogin(false)}
            className="font-bold text-primary cursor-pointer"
          >
            {t("Register")}!!!
          </span>
        </span>
      </div>
      <Modal show={forgotPassword} setShow={setForgotPassword}>
        <ForgotPassword />
      </Modal>
    </div>
  );
};

Login.propTypes = {};

export default Login;
