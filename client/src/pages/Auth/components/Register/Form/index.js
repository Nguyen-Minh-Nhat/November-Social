import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { toast } from "react-toastify";
import authApi from "../../../../../api/authApi";
import AnimateSlide from "../../../../../components/Animate/AnimateSlide";
import AccountForm from "./AccountForm";
import AvatarForm from "./AvatarForm";
import CompleteForm from "./CompleteForm";
import InfoForm from "./InfoForm";

const RegisterForm = () => {
  const [stepper, setStepper] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "female",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChangeData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const handleNextStep = (data) => {
    handleChangeData(data);
    setStepper((prev) => ++prev);
  };

  const handleBackStep = (data) => {
    handleChangeData(data);
    setStepper((prev) => --prev);
  };

  const handleFinish = async (data) => {
    try {
      data = { ...userData, ...data };
      const formData = new FormData();
      formData.append("name", data.firstName + " " + data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("birthDate", data.birthDate);
      formData.append("avatar", data.avatar);
      await authApi.register(formData);
      setStepper((prev) => ++prev);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
  };

  const handleCheckEmail = async (data) => {
    setIsLoading(true);
    try {
      await authApi.checkMail({ email: data.email });
      handleNextStep(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
    setIsLoading(false);
  };

  return (
    <div autoComplete="new-password" className="w-100 flex flex-col gap-6">
      {/* progress bar */}
      <div className="relative flex justify-between ">
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 z-0
          flex justify-center items-center
          w-full h-[10px] 
          bg-slate-300 dark:bg-[#3e4e69]"
        >
          <div className="w-full h-[4px] bg-slate-400 dark:bg-dark-light"></div>
          <div
            className={`absolute top-1/2 left-0 -translate-y-1/2 z-0 
            h-[4px]  bg-blue-500  
            transition-all duration-500`}
            style={{ width: `calc(100% * ${stepper / 3})` }}
          ></div>
        </div>
        {stepList.map((step) => (
          <div
            key={step.id}
            className={`w-10 h-10 z-20 flex justify-center items-center
            rounded-full 
            bg-slate-100 dark:bg-dark-light
            text-light-text-bold dark:text-dark-text-bold border 
            border-slate-300 dark:border-dark-border  
            transition-all duration-500 ${
              stepper === step.id ? progressBarStyle.progressing : ""
            } ${stepper > step.id ? progressBarStyle.complete : ""} `}
          >
            <span className="text-sm">
              {step.id < stepper ? step.iconFilled : step.icon}
            </span>
          </div>
        ))}
      </div>

      {/* stepper */}

      <AnimatePresence>
        <div>
          {" "}
          {stepper === 0 && (
            <AnimateSlide>
              <AccountForm
                onNextStep={handleCheckEmail}
                initialData={userData}
                isLoading={isLoading}
              />
            </AnimateSlide>
          )}
          {stepper === 1 && (
            <AnimateSlide>
              <InfoForm
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                initialData={userData}
              />
            </AnimateSlide>
          )}
          {stepper === 2 && (
            <AnimateSlide>
              <AvatarForm
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onFinish={handleFinish}
                initialData={userData}
              />
            </AnimateSlide>
          )}
          {stepper === 3 && (
            <AnimateSlide>
              <CompleteForm
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onFinish={handleFinish}
                initialData={userData}
              />
            </AnimateSlide>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const stepList = [
  {
    id: 0,
    icon: <i className="fa-light fa-user"></i>,
    iconFilled: <i className="fa-solid fa-user"></i>,
  },
  {
    id: 1,
    icon: <i className="fa-light fa-lock"></i>,
    iconFilled: <i className="fa-solid fa-lock"></i>,
  },
  {
    id: 2,
    icon: <i className="fa-light fa-image"></i>,
    iconFilled: <i className="fa-solid fa-image"></i>,
  },
  {
    id: 3,
    icon: <i className="fa-light fa-flag"></i>,
    iconFilled: <i className="fa-solid fa-flag"></i>,
  },
];

const progressBarStyle = {
  normal: "",
  progressing:
    "border-blue-500 dark:border-primary text-primary dark:text-primary",
  complete:
    "border-blue-500 dark:border-primary text-primary dark:text-primary shadow-md shadow-primary/50",
};

export default RegisterForm;
