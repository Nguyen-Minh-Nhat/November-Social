import React from "react";
import { Image } from "cloudinary-react";

function CloudImg({ url, className }) {
  return (
    <Image
      className={`w-full h-full ${className}`}
      publicId={url}
      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
    />
  );
}

export default CloudImg;
