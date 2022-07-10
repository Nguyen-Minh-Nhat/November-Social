import React from "react";
import CloudImg from "../CloudImg/CloudImg";

const Img = ({ src, className }) => {
  return (
    <>
      {src.includes("novsocial") ? (
        <CloudImg url={src} className={className} />
      ) : (
        <img src={src} alt="" className={`h-full ${className}`}></img>
      )}
    </>
  );
};

export default Img;
