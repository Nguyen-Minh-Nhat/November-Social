import React, { useEffect, useRef, useState } from "react";
let currentOtpIndex = 0;
const OtpField = ({
  title,
  disabled,
  setValue,
  onSubmit = () => {},
  max = 6,
}) => {
  const [otp, setOtp] = useState(new Array(max).fill(""));
  const [activeOptIndex, setActiveOptIndex] = useState(0);

  const inputRef = useRef(null);

  const handleOnChange = (e) => {
    const drawValue = e.target.value;
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = drawValue.substring(drawValue.length - 1);
    if (drawValue) setActiveOptIndex(currentOtpIndex + 1);
    else setActiveOptIndex(currentOtpIndex - 1);
    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    currentOtpIndex = index;
    if (e.key === "Backspace") {
      setActiveOptIndex(currentOtpIndex - 1);
    } else if (e.key === "ArrowRight") {
      if (otp[currentOtpIndex]) setActiveOptIndex(currentOtpIndex + 1);
    } else if (e.key === "ArrowLeft") {
      if (otp[currentOtpIndex]) setActiveOptIndex(currentOtpIndex - 1);
    } else if (e.key === "Enter") {
      if (currentOtpIndex + 1 === max && otp.filter(String).length === max) {
        onSubmit();
      }
    }

    if (exceptThisSymbols.includes(e.key)) e.preventDefault();
  };

  const handlePaste = (e) => {
    let clipboardData = e.clipboardData.getData("Text");
    e.preventDefault();
    exceptThisSymbols.forEach((symbol) => {
      if (clipboardData.includes(symbol)) {
        e.preventDefault();
        return;
      }
    });

    if (clipboardData) {
      let number = clipboardData.match(/\d/g);
      currentOtpIndex = 0;
      if (number) {
        let newArray = otp.map((_, index) => {
          if (number[index]) {
            if (currentOtpIndex < max - 1) currentOtpIndex++;
            return number[index];
          } else return "";
        });
        setActiveOptIndex(currentOtpIndex);
        setOtp(newArray);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex]);

  useEffect(() => {
    setValue(otp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="self-start text-light-text-bold dark:text-dark-text-regular">
        {title}
      </div>
      <div className="w-full flex justify-between items-center">
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={index === activeOptIndex ? inputRef : null}
                type="number"
                value={otp[index]}
                onChange={handleOnChange}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 border rounded-xl outline-none
                dark:bg-dark-regular bg-slate-200
                text-center font-semibold text-light-text-bold dark:text-dark-text-regular text-2xl 
                dark:border-dark-border border-gray-300
                focus:border-primary-bold focus:dark:border-primary-bold transition disabled:cursor-not-allowed"
                disabled={disabled}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const exceptThisSymbols = ["e", "E", "+", "-", "."];

export default OtpField;
