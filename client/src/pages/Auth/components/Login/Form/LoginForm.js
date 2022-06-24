import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../../../components/InputField";
import Button from "../../../../../components/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const LoginForm = ({ setForgotPassword }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      autoComplete="current-password"
      className="w-100 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* email */}
      <InputField
        label={"E-mail"}
        placeholder={"November@email.com"}
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />

      {/* password */}
      <InputField
        label={t("Password")}
        placeholder={t("Password")}
        type="password"
        name="password"
        register={register}
        error={errors.password}
      />

      {/* {checkbox field} */}
      <div className="flex justify-between">
        <div className="text-left flex gap-2 items-center">
          <label htmlFor="checkbox" className="relative cursor-pointer">
            <input
              type="checkbox"
              id="checkbox"
              className="appearance-none w-6 h-6 rounded-md 
            bg-slate-100 dark:bg-slate-500 
              border dark:border-dark-border text-white  
              cursor-pointer checked:bg-primary dark:checked:bg-primary transition-all peer"
            />

            <i
              className="fa-solid fa-check 
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] 
              text-lg font-bold leading-[10px] text-transparent 
            peer-checked:text-white transition-all"
            ></i>
          </label>

          <label
            htmlFor="checkbox"
            className="font-bold cursor-pointer 
          text-light-text-regular dark:text-dark-text-regular"
          >
            {t("Remember me")}
          </label>
        </div>
        <div
          className="text-left flex gap-2 items-center"
          onClick={() => setForgotPassword(true)}
        >
          <span className="text-primary font-bold cursor-pointer">
            {t("Forgot password")}?
          </span>
        </div>
      </div>
      <Button disabled={!isValid} type="submit" primary>
        <span className="font-bold capitalize">{t("login")}</span>
        {/* <Spinner /> */}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
