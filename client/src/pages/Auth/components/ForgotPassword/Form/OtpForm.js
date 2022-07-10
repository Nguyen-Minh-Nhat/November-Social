import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../components/Button";
import OtpField from "../../../../../components/OtpField";
const maxDigits = 6;

const OtpForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(false);

  const [value, setValue] = useState([]);

  useEffect(() => {
    if (value.filter(String).length === maxDigits) {
      setIsValid(true);
    } else setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
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
        {t(
          "Enter the verification code we just sent you on your email address",
        )}
      </span>
      <OtpField
        title={t("Code")}
        disabled={isLoading}
        setValue={setValue}
        onSubmit={() => onSubmit(value.join(""))}
        max={maxDigits}
      />
      <Button
        type="submit"
        primary
        disabled={!isValid}
        className="w-full"
        isLoading={isLoading}
        onClick={() => onSubmit(value.join(""))}
        large
      >
        <span className="font-bold capitalize">{t("verify")}</span>
      </Button>
    </section>
  );
};

export default OtpForm;
