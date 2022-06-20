import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AccountForm from "./AccountForm";
import AvatarForm from "./AvatarForm";
import InforForm from "./InforForm";
const RegisterForm = () => {
  const [stepper, setSteppeer] = useState(0);
  const { t } = useTranslation();

  const onSubmit = (data) => {};

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "female",
    avatar: "",
    email: "",
    password: "",
  });

  const handleNextStep = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setSteppeer((prev) => ++prev);
  };

  const handleBackStep = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setSteppeer((prev) => --prev);
  };

  const handleFinish = (data) => {
    data = { ...userData, ...data };
    console.log(data);
  };

  return (
    <div
      autoComplete="new-password"
      className="w-100 flex flex-col gap-6 text-[18px]"
    >
      {stepper === 0 && (
        <AccountForm onNextStep={handleNextStep} initialData={userData} />
      )}
      {stepper === 1 && (
        <InforForm
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
          initialData={userData}
        />
      )}
      {stepper === 2 && (
        <AvatarForm
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
          onFinish={handleFinish}
          initialData={userData}
        />
      )}
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
