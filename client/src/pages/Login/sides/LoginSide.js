import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import { useTranslation } from "react-i18next";
import socials from "../../../config/socials";
import Button from "../../../components/Button";

const LoginSide = ({ setIsLogin }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[46px] w-[460px]  flex flex-col gap-4">
      <div className="text-[36px] font-bold capitalize dark:text-dark-textBold">
        {t("login to")}
        <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
      </div>
      <div className="flex gap-2 justify-center">
        {socials.map((method) => (
          <Button key={method.name} large>
            {method.icon}
          </Button>
        ))}
      </div>
      <div>
        <div className="relative w-full flex justify-center text-[14px]">
          <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
          <span className="p-2 bg-white z-10 text-textColorPrimary/80 dark:bg-dark-veryLight dark:text-dark-textRegular">
            {t("or your account")}
          </span>
        </div>
      </div>
      <LoginForm />
      <div className="text-left text-[16px]">
        <span className="dark:text-dark-textLight">
          {t("Don't have an account")}?{" "}
          <span
            onClick={() => setIsLogin(false)}
            className="font-bold text-primary cursor-pointer"
          >
            {t("Register")}!!!
          </span>
        </span>
      </div>
    </div>
  );
};

LoginSide.propTypes = {};

export default LoginSide;
