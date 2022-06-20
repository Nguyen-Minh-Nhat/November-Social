import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const RegisterSide = ({ setIsLogin }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[46px] w-[460px]  flex flex-col gap-4">
      <div className="text-[36px] font-bold capitalize dark:text-dark-textBold">
        {t("register")}
        <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
      </div>
      <div>
        <div className="relative w-full flex justify-center text-[14px]">
          <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
          <span className="p-2 bg-white z-10 text-textColorPrimary/80 dark:bg-dark-veryLight dark:text-dark-textRegular">
            {t("or your account")}
          </span>
        </div>
      </div>
      <RegisterForm />
      <div className="text-left text-[16px]">
        <span className="dark:text-dark-textLight">
          {t("Already have an account")}?{" "}
          <span
            onClick={() => setIsLogin(true)}
            className="font-bold text-primary cursor-pointer "
          >
            {t("Login")}!!!
          </span>
        </span>
      </div>
    </div>
  );
};

RegisterSide.propTypes = {};

export default RegisterSide;
