import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

import ChangePasswordForm from "./Form/ChangePasswordForm";
import EmailForm from "./Form/EmailForm";
import OtpForm from "./Form/OtpForm";
import AnimateSlide from "../../../../components/Animate/AnimateSlide";
import SuccessBox from "../../../../components/SuccessBox";
import Button from "../../../../components/Button";
import authApi from "../../../../api/authApi";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [stepper, setStepper] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    setStepper((prev) => ++prev);
  };

  const handleSendOtp = async (data) => {
    setEmail(data.email);
    setIsLoading(true);

    try {
      await authApi.sendOtp({ email: data.email });
      handleNextStep();
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
    setIsLoading(false);
  };

  const handleConfirmOtp = async (data) => {
    setIsLoading(true);
    try {
      await authApi.confirmOtp({ email: email, otp: data });
      handleNextStep();
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      await authApi.resetPassword({ email: email, password: data.password });
      handleNextStep();
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="w-[460px] rounded-xl
      bg-white dark:bg-dark-light"
    >
      <div
        className="p-4 py-3 font-bold text-2xl text-light-text-bold dark:text-dark-text-bold 
        border-b dark:border-dark-border"
      >
        {t("Reset")} <span className="text-primary">{t("password")}</span>
      </div>
      <AnimatePresence>
        <div className="p-4">
          {stepper === 0 && (
            <AnimateSlide disabled>
              <EmailForm isLoading={isLoading} onSubmit={handleSendOtp} />
            </AnimateSlide>
          )}
          {stepper === 1 && (
            <AnimateSlide>
              <OtpForm isLoading={isLoading} onSubmit={handleConfirmOtp} />
            </AnimateSlide>
          )}
          {stepper === 2 && (
            <AnimateSlide>
              <ChangePasswordForm
                isLoading={isLoading}
                onSubmit={handleResetPassword}
              />
            </AnimateSlide>
          )}
          {stepper === 3 && (
            <AnimateSlide>
              <SuccessBox
                title={t("Your password has been reset successfully")}
                description=""
              >
                <Button type="submit" primary large>
                  <span className="font-bold capitalize">
                    {t("Log in now")}
                  </span>
                </Button>
              </SuccessBox>
            </AnimateSlide>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;
