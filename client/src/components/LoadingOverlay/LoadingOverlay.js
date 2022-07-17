import React from "react";
import Spinner from "../Spinner/Spinner";

const LoadingOverlay = ({ className }) => {
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-lg backdrop-brightness-50 ${className}`}
    >
      <Spinner className="w-10 h-10" />
    </div>
  );
};

export default LoadingOverlay;
