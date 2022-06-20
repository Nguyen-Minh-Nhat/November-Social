import React, { useState } from "react";
import PropTypes from "prop-types";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";

const AvatarForm = ({ onBackStep, onFinish, isValid, initialData }) => {
  const { t } = useTranslation();
  const [avatarSelected, setAvatarSelected] = useState();
  const handleBackStep = () => {
    onBackStep(avatarSelected);
  };
  return (
    <div className="h-[448.56px] flex flex-col gap-6">
      <div className="flex-1 flex justify-center items-center rounded-xl bg-slate-200 dark:bg-dark-regular">
        <UpLoadAvatar
          setAvatarSelected={setAvatarSelected}
          initialData={
            initialData.avatar ? URL.createObjectURL(initialData.avatar) : ""
          }
        />
      </div>
      <div className="flex w-full gap-3 justify-between mt-auto">
        <Button type="button" flex-1 primary onClick={handleBackStep}>
          <span className="font-bold capitalize">
            <i className="fa-solid fa-angle-left"></i> {t("back")}
          </span>
          {/* <Spinner /> */}
        </Button>
        <Button
          type="submit"
          primary
          flex-1
          onClick={() => onFinish(avatarSelected)}
        >
          <span className="font-bold capitalize">
            {avatarSelected ? t("next") : t("skip")}{" "}
            <i className="fa-solid fa-angle-right"></i>
          </span>
          {/* <Spinner /> */}
        </Button>
      </div>
    </div>
  );
};

AvatarForm.propTypes = {};

export default AvatarForm;
