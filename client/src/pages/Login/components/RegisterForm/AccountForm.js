import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/InputField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password does not match",
    ),
});

const AccountForm = ({ handleNextStep }) => {
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
    const { confirmPassword, ...sendData } = data;
    handleNextStep(sendData);
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
      <div>
        <div className="relative w-full flex justify-center text-[14px]">
          <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
          <span className="p-2 bg-white z-10 text-textColorPrimary/80 dark:bg-dark-veryLight dark:text-dark-textRegular">
            {t("Next step")}
          </span>
        </div>
      </div>
      <Button
        background="bg-primary"
        type="submit"
        bg-blue-500
        shadow="shadow-lg shadow-blue-500/50"
        text-white
        disabled={!isValid}
      >
        <span className="font-bold capitalize">{t("continue")}</span>
        {/* <Spinner /> */}
      </Button>
    </form>
  );
};

AccountForm.propTypes = {};

export default AccountForm;
