import React from "react";
import PropTypes from "prop-types";

import ClickAble from "../ClickAble";

const genders = ["female", "male", "other"];

const CheckBoxGender = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-left font-bold text-textBold dark:text-dark-textRegular">
        {"Gender"}
      </label>
      <div className="flex gap-2">
        {genders.map((gender) => (
          <ClickAble scale={1.04} key={gender}>
            <div className="relative">
              <input
                type="radio"
                name="gender"
                value={gender}
                className="w-5 h-5 accent-blue-500 absolute top-1/2 -translate-y-1/2 right-4 peer"
                id={gender}
                {...props.register("gender")}
              />
              <label
                className="bg-slate-200 dark:bg-dark-regular border border-transparent peer-checked:border-primary flex justify-between capitalize items-center font-bold p-4 rounded-lg text-slate-500 dark:text-dark-textRegular cursor-pointer"
                htmlFor={gender}
              >
                {gender}
              </label>
            </div>
          </ClickAble>
        ))}
      </div>
    </div>
  );
};

CheckBoxGender.propTypes = {};

export default CheckBoxGender;
