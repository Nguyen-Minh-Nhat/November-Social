import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AccountForm from "./AccountForm";
import InforForm from "./InforForm";
const RegisterForm = () => {
  const [stepper, setSteppeer] = useState(1);
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleNextStep = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setSteppeer((prev) => ++prev);
  };

  return (
    <div
      autoComplete="new-password"
      className="w-100 flex flex-col gap-6 text-[18px]"
    >
      {stepper === 0 && <AccountForm handleNextStep={handleNextStep} />}
      {stepper === 1 && <InforForm setSteppeer={setSteppeer} />}
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
