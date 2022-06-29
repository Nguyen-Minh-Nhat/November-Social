import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authApi from "../../../../api/authApi";
import Modal from "../../../../components/Modal";
import { setCredentials } from "../../../../redux/slices/authSlice";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import LoginForm from "./Form/LoginForm";
import SocialLogin from "./SocialLogin/";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const res = await authApi.login(data);
      handleSuccessLogin(res.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSuccessLogin = (data) => {
    const action = setCredentials({
      user: data.user,
      accessToken: data.access_token,
    });
    dispatch(action);
  };

  return (
    <div className="min-h-[46px] w-[460px] flex flex-col gap-4">
      <div
        className="mb-4 font-bold capitalize text-[36px]  
      text-light-text-bold dark:text-dark-text-bold"
      >
        {t("login to")}
        <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
      </div>
      <SocialLogin onSuccessLogin={handleSuccessLogin} />
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
      <LoginForm onSubmit={handleLogin} setForgotPassword={setForgotPassword} />
      <div className="text-left text-[16px]">
        <span className="text-light-text-bold dark:text-dark-text-light">
          {t("Don't have an account")}? {""}
          <Link
            to={"/register"}
            className="font-bold text-primary cursor-pointer"
          >
            {t("Register")}.
          </Link>
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
