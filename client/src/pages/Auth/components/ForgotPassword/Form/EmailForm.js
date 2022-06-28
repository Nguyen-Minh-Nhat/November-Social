import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../../../../components/InputField";
import Button from "../../../../../components/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
});

const EmailForm = (props) => {
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
      onSubmit={handleSubmit(props.onSubmit)}
      className="w-full flex flex-col items-center gap-4"
    >
      <div
        className="w-20 h-20 rounded-full 
            flex justify-center items-center
            border-2 border-blue-600
            bg-primary/10"
      >
        <i className="fa-solid fa-key-skeleton text-3xl text-primary"></i>
      </div>
      <span className="text-center text-light-text-regular dark:text-dark-text-regular">
        {t(
          "Enter the email address associated with your account, we will send a verification code to your email",
        )}
      </span>
      <InputField
        label={"E-mail"}
        placeholder={"November@email.com"}
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />
      <Button
        type="submit"
        primary
        disabled={!isValid}
        className="w-full"
        large
      >
        <span className="font-bold capitalize">{t("Send code")}</span>
      </Button>
    </form>
  );
};

export default EmailForm;
