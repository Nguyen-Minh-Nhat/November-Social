import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import InputField from "../../../../components/InputField";
import CheckBoxGender from "../../../../components/CheckBoxGender/CheckBoxGender";
import Button from "../../../../components/Button";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  // birthDate: yup
  //   .date()
  //   .max(new Date(), "Are you a time traveler? Please Enter Valid BirthDay")
  //   .required(),
});

const InforForm = (props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { gender: "female" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* First name */}
      <div className="flex justify-between">
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
      <CheckBoxGender register={register} />
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

InforForm.propTypes = {};

export default InforForm;
