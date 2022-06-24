import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import OtpField from "../../../../components/OtpField";

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
const ForgotPassword = () => {
  const { t } = useTranslation();
  const [stepper, setStepper] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleNextStep = () => {
    setStepper((prev) => ++prev);
  };

  return (
    <div
      className="w-[460px] rounded-xl p-4 pb-7
    bg-white dark:bg-dark-very-light"
    >
      <div className="font-bold text-2xl text-light-text-bold dark:text-dark-text-bold mb-4">
        Reset Password
      </div>
      {stepper === 0 && (
        <section className="w-full flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-full 
          flex justify-center items-center
          border-2 border-blue-600
          bg-primary/10"
          >
            <i className="fa-solid fa-key-skeleton text-3xl text-primary"></i>
          </div>
          <span className="text-center text-light-text-regular dark:text-dark-text-regular">
            Enter the email address associated with your account and we will
            send a verification code to your email
          </span>
          <InputField
            label={"E-mail"}
            placeholder={"November@email.com"}
            type="email"
            name="email"
            register={register}
            error={errors.email}
          />
        </section>
      )}
      {stepper === 1 && (
        <section className="w-full flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-full 
          flex justify-center items-center
          border-2 border-blue-600
          bg-primary/10"
          >
            <i className="fa-regular fa-shield-check text-4xl text-primary"></i>
          </div>
          <span className="text-center text-light-text-regular dark:text-dark-text-regular">
            Enter the verification code we just sent you on your email address
          </span>
          <OtpField />
        </section>
      )}

      <Button
        type="submit"
        primary
        disabled={!!errors.email}
        className="w-full mt-6"
        onClick={handleNextStep}
      >
        <span className="font-bold capitalize">{t("continue")}</span>
        {/* <Spinner /> */}
      </Button>
    </div>
  );
};

export default ForgotPassword;
