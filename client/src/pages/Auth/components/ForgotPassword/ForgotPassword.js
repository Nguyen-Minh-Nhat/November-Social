import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

import ChangePasswordForm from "./Form/ChangePasswordForm";
import EmailForm from "./Form/EmailForm";
import OtpForm from "./Form/OtpForm";
import AnimateSlide from "../../../../components/Animate/AnimateSlide";
import CompleteForm from "../Register/Form/CompleteForm";
import SuccessBox from "../../../../components/SuccessBox";
import Button from "../../../../components/Button";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [stepper, setStepper] = useState(0);

  const handleNextStep = (data) => {
    console.log(data);
    setStepper((prev) => ++prev);
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
              <EmailForm onSubmit={handleNextStep} />
            </AnimateSlide>
          )}
          {stepper === 1 && (
            <AnimateSlide>
              <OtpForm onSubmit={handleNextStep} />
            </AnimateSlide>
          )}
          {stepper === 2 && (
            <AnimateSlide>
              <ChangePasswordForm onSubmit={handleNextStep} />
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
