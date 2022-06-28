import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import UpLoadAvatar from "../../../../../components/UpLoadAvatar";
import Button from "../../../../../components/Button";

const AvatarForm = ({ onBackStep, onFinish, initialData }) => {
  const { t } = useTranslation();
  const [avatarSelected, setAvatarSelected] = useState(initialData.avatar);

  const handleBackStep = () => {
    onBackStep(avatarSelected);
  };
  return (
    <div className="h-[444.56px] flex flex-col gap-6">
      <div
        className="relative w-full 
        flex-1 flex flex-col justify-center items-center gap 
        rounded-xl bg-slate-200 dark:bg-dark-regular "
      >
        <div
          className="absolute top-10 
          font-bold text-light-text-bold dark:text-dark-text-bold"
        >
          {t("Upload a profile picture")}
        </div>
        <UpLoadAvatar
          setAvatarSelected={setAvatarSelected}
          initialImage={
            initialData.avatar ? URL.createObjectURL(initialData.avatar) : ""
          }
        />
      </div>

      <div className="relative w-full flex justify-center text-[14px]">
        <div
          className="absolute top-1/2 z-0 left-0 
          w-full h-[0.1px] bg-primary/30 "
        ></div>
        <span
          className="z-10 p-2 bg-white
          text-text-color-primary/80 dark:bg-dark-very-light dark:text-dark-text-regular"
        >
          {t("Profile picture")}
        </span>
      </div>
      <div className="mt-auto w-full flex justify-between gap-3">
        <Button type="button" flex-1 primary large onClick={handleBackStep}>
          <span className="font-bold capitalize">
            <i className="fa-solid fa-angle-left"></i> {t("back")}
          </span>
          {/* <Spinner /> */}
        </Button>
        <Button
          type="submit"
          primary
          large
          className="flex-1"
          onClick={() => onFinish(avatarSelected)}
        >
          <span className="font-bold capitalize">
            {avatarSelected ? t("next") : t("skip")}{" "}
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </Button>
      </div>
    </div>
  );
};

AvatarForm.propTypes = {};

export default AvatarForm;
