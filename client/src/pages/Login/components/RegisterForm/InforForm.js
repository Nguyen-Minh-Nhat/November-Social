import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import InputField from "../../../../components/InputField";
import CheckBoxGender from "../../../../components/CheckBoxGender/CheckBoxGender";
import Button from "../../../../components/Button";

import DropdownDatePicker from "../../../../components/DropdownDatePicker";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  birthDate: yup
    .date()
    .max(new Date(), "Are you a time traveler? Please Enter Valid BirthDay")
    .required(),
});

const InforForm = ({ onBackStep, onNextStep, initialData }) => {
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
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNextStep(data);
  };

  const handleBackStep = () => {
    onBackStep(getValues());
  };

  useEffect(() => {
    setValue("birthDate", date);
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
      <DropdownDatePicker
        setDate={setDate}
        initialDate={initialData.birthDate}
      />
      <CheckBoxGender register={register} />

      <div>
        <div className="relative w-full flex justify-center text-[14px]">
          <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
          <span className="p-2 bg-white z-10 text-textColorPrimary/80 dark:bg-dark-veryLight dark:text-dark-textRegular">
            {t("Next step")}
          </span>
        </div>
      </div>
      <div className="flex w-full gap-3 justify-between">
        <Button type="button" flex-1 primary onClick={handleBackStep}>
          <span className="font-bold capitalize">
            <i className="fa-solid fa-angle-left"></i> {t("back")}
          </span>
          {/* <Spinner /> */}
        </Button>
        <Button type="submit" primary disabled={!isValid} flex-1>
          <span className="font-bold capitalize">
            {t("next")} <i className="fa-solid fa-angle-right"></i>
          </span>
          {/* <Spinner /> */}
        </Button>
      </div>
    </form>
  );
};

InforForm.propTypes = {};

export default InforForm;
