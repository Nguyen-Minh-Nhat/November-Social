import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../../../../components/InputField";
import Button from "../../../../../components/Button";

const schema = yup.object().shape({
  password: yup.string().required("Password is a required field"),
  confirmPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password does not match",
    ),
});

const ChangePasswordForm = (props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  return (
    <form
      autoComplete="new-password"
      onSubmit={handleSubmit(props.onSubmit)}
      className="w-full flex flex-col items-center gap-4"
    >
      <input hidden type="text" autoComplete="username"></input>
      <div
        className="w-20 h-20 rounded-full 
            flex justify-center items-center
            border-2 border-blue-600
            bg-primary/10"
      >
        <i className="fa-solid fa-key-skeleton text-3xl text-primary"></i>
      </div>
      <span className="text-center text-light-text-regular dark:text-dark-text-regular">
        {t("Set your new password")}
      </span>
      {/* password */}
      <InputField
        label={t("New password")}
        placeholder={t("Password")}
        type="password"
        name="password"
        register={register}
        error={errors.password}
      />
      {/* confirm password */}
      <InputField
        label={t("Confirm new password")}
        placeholder={t("Confirm password")}
        type="password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />
      <Button
        type="submit"
        primary
        disabled={!isValid}
        isLoading={props.isLoading}
        className="w-full"
        large
      >
        <span className="font-bold capitalize">{t("confirm")}</span>
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
