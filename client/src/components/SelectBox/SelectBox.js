import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const SelectBox = ({ title, min, max, value, onChange }) => {
  const { t } = useTranslation();
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
      className="flex flex-1 flex-col gap-1 w-full max-h-[53.33px] rounded-xl
      bg-gray-200  p-4 dark:bg-dark-regular 
      outline-none border border-gray-300 dark:border-dark-border 
      font-bold capitalize dark:text-dark-text-regular text-light-text-regular dark:placeholder-gray-400 
      cursor-pointer focus:ring-primary focus:border-blue-500 dark:hover:border-primary hover:border-primary"
      onChange={(e) => onChange(e.target.value)}
    >
      <option className="capitalize">{t(title)}</option>
      {optionList.map((option) => (
        <option key={option} className="hover:bg-red-400" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
