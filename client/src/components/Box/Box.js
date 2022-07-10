import React from "react";

const Box = ({ header, className, children }) => {
  return (
    <div className="w-96 flex flex-col bg-dark-regular rounded-xl">
      <div
        className="p-4 py-3 font-bold text-2xl text-light-text-bold dark:text-dark-text-bold 
        border-b dark:border-dark-border"
      >
        {header}
      </div>
      {children}
    </div>
  );
};

export default Box;
