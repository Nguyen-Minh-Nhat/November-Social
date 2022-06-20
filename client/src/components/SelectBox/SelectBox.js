import React, { useMemo } from "react";

const SelectBox = ({ title, min, max, value, onChange }) => {
  const optionList = useMemo(() => {
    const list = [];
    for (var i = min; i <= max; i++) {
      list.push(i);
    }
    return list;
  }, [max]);

  // print list of years to the console:
  return (
    <select
      id="countries"
      value={value}
      className="flex flex-1 flex-col gap-1 rounded-xl bg-gray-200 max-h-[57.99px] outline-none  border border-gray-300 p-4 cursor-pointer  focus:ring-primary focus:border-blue-500  w-full dark:bg-dark-regular  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark-textRegular capitalize  font-bold text-slate-500 hover:border-primary dark:hover:border-primary"
      onChange={(e) => onChange(e.target.value)}
    >
      <option>{title}</option>
      {optionList.map((option) => (
        <option key={option} className="hover:bg-red-400" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
