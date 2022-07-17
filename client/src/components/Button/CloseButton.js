import React from "react";
import Button from "./Button";

const CloseButton = ({ onClick, className, size = "w-7 h-7 text-md" }) => {
  return (
    <Button
      className={`p-0 ${size} flex items-center justify-center rounded-full bg-slate-200 
      text-light-text-light dark:text-dark-text-regular hover:opacity-80
        cursor-pointer ${className}`}
      onClick={() => onClick()}
    >
      <i className="fa-solid fa-xmark font-normal"></i>
    </Button>
  );
};

export default CloseButton;
