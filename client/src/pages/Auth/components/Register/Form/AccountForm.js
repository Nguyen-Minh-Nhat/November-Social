import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import InputField from "../../../../../components/InputField";
import Button from "../../../../../components/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is a required field"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password does not match",
    ),
});

const AccountForm = ({ onNextStep, initialData, isLoading }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...initialData },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNextStep(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="account flex flex-col gap-6"
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
      {/* confirm password */}
      <InputField
        label={t("Confirm password")}
        placeholder={t("Confirm password")}
        type="password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />

      <div className="relative w-full flex justify-center text-[14px]">
        <div className="absolute top-1/2 left-0 z-0 w-full h-[0.1px] bg-primary/30 "></div>
        <span
          className="z-10 p-2 
        bg-white dark:bg-dark-very-light 
          text-text-color-primary/80 dark:text-dark-text-regular"
        >
          {t("Account")}
        </span>
      </div>
      <Button
        type="submit"
        primary
        large
        isLoading={isLoading}
        disabled={!isValid}
      >
        <span className="font-bold capitalize">{t("continue")}</span>
      </Button>
    </form>
  );
};

AccountForm.propTypes = {};

export default AccountForm;
