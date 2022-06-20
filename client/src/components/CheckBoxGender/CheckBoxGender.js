import React from "react";
import PropTypes from "prop-types";

import Button from "../Button";

const genders = ["female", "male", "other"];

const CheckBoxGender = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-left font-bold text-textBold dark:text-dark-textRegular">
        {"Gender"}
      </label>
      <div className="flex gap-2">
        {genders.map((gender) => (
          <Button key={gender} flex-1 p-0 relative w-full bg-transparent>
            <input
              type="radio"
              name="gender"
              value={gender}
              className="w-5 h-5 accent-blue-500 absolute top-1/2 -translate-y-1/2 right-4 peer"
              id={gender}
              {...props.register("gender")}
            />
            <label
              className="bg-slate-200 w-full hover:border-primary dark:bg-dark-regular border border-transparent peer-checked:border-primary flex justify-between rounded-xl p-4 items-center capitalize  font-bold text-slate-500  dark:text-dark-textRegular cursor-pointer"
              htmlFor={gender}
            >
              {gender}
            </label>
          </Button>
        ))}
      </div>
    </div>
  );
};

CheckBoxGender.propTypes = {};

export default CheckBoxGender;
