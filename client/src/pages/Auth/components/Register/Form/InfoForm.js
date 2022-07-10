import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import InputField from "../../../../../components/InputField";
import DropdownDatePicker from "../../../../../components/DropdownDatePicker";
import CheckBoxGender from "../../../../../components/CheckBoxGender/CheckBoxGender";
import Button from "../../../../../components/Button";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  birthDate: yup
    .date()
    .max(new Date(), "Are you a time traveler? Please enter valid birth date")
    .required(),
});

const InfoForm = ({ onBackStep, onNextStep, initialData }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...initialData },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNextStep(data);
  };

  const handleBackStep = () => {
    onBackStep(getValues());
  };

  useEffect(() => {
    setValue("birthDate", date, { shouldValidate: true });
  }, [date]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* First name */}
      <div className="flex gap-2">
        <InputField
          label={t("First name")}
          placeholder={t("First name")}
          type="text"
          name="firstName"
          register={register}
          error={errors.firstName}
        />

        {/* Last name */}
        <InputField
          label={t("Last name")}
          placeholder={t("Last name")}
          type="text"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
      </div>
      <div>
        <DropdownDatePicker
          setDate={setDate}
          initialDate={initialData.birthDate}
        />

        {errors.birthDate ? (
          <span className="text-left block text-base text-red-500">
            {t(errors.birthDate.message)}
          </span>
        ) : (
          ""
        )}
      </div>
      <CheckBoxGender register={register} />

      <div className="relative w-full flex justify-center text-[14px]">
        <div className="absolute top-1/2 left-0 z-0 w-full h-[0.1px] bg-primary/30 "></div>
        <span
          className="p-2 z-10 
        bg-white dark:bg-dark-very-light
          text-text-color-primary/80 dark:text-dark-text-regular"
        >
          {t("Profile info")}
        </span>
      </div>
      <div className="w-full flex justify-between gap-3">
        <Button type="button" flex-1 primary onClick={handleBackStep}>
          <span className="font-bold capitalize">
            <i className="fa-solid fa-angle-left"></i> {t("back")}
          </span>
        </Button>
        <Button type="submit" primary disabled={!isValid} flex-1>
          <span className="font-bold capitalize">
            {t("next")} <i className="fa-solid fa-angle-right"></i>
          </span>
        </Button>
      </div>
    </form>
  );
};

InfoForm.propTypes = {};

export default InfoForm;
