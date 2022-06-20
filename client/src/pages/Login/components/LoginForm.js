import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const LoginForm = () => {
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
      className="w-100 flex flex-col gap-6 text-[18px]"
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
          <input
            type="checkbox"
            id="checkbok"
            className="accent-blue-400 w-5 h-5 text-white cursor-pointer outline-none before:text-blue-500"
          />
          <label
            htmlFor="checkbok"
            className="font-bold cursor-pointer text-textBold dark:text-dark-textRegular"
          >
            {t("Remember me")}
          </label>
        </div>
        <div className="text-left flex gap-2 items-center">
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
