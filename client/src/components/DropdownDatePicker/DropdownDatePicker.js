import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { date } from "yup/lib/locale";
import ClickAble from "../ClickAble";
import SelectBox from "../SelectBox/SelectBox";

const DropdownDatePicker = ({ setDate, initialDate }) => {
  const currentDate = new Date();
  const [maxDay, setMaxDay] = useState(31);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [day, setDay] = useState();
  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      setDay(date.getDate());
      setMonth(date.getMonth() + 1);
      setYear(date.getFullYear());
    }
  }, []);

  useEffect(() => {
    switch (parseInt(month)) {
      case 2:
        setMaxDay(28);
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        setMaxDay(30);
        break;
      default:
        setMaxDay(31);
    }
  }, [month]);

  useEffect(() => {
    if (month && day && year) {
      const newMonth = month - 1;
      const date = new Date(year, newMonth, day);
      setDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, day, year]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-left font-bold text-light-text-bold dark:text-dark-text-regular">
        {t("Date of birth")}
      </label>
      <div className="flex gap-2">
        <ClickAble disabledClick scale={1.04}>
          <SelectBox
            title="month"
            min={1}
            max={12}
            value={month}
            onChange={setMonth}
          />
        </ClickAble>
        <ClickAble disabledClick scale={1.04}>
          <SelectBox
            title="day"
            min={1}
            max={maxDay}
            value={day}
            onChange={setDay}
          />
        </ClickAble>
        <ClickAble disabledClick scale={1.04}>
          <SelectBox
            title="year"
            min={1900}
            value={year}
            max={currentDate.getFullYear()}
            onChange={setYear}
          />
        </ClickAble>
      </div>
    </div>
  );
};

DropdownDatePicker.propTypes = {};

export default DropdownDatePicker;
