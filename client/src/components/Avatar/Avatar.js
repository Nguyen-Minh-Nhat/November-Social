import React from "react";
import Button from "../Button";
import Img from "../Img";

const Avatar = ({ url, size = "w-9 h-9" }) => {
  return (
    <Button className="p-0 shadow-none bg-transparent hover:opacity-70">
      <div className={`shrink-0 rounded-full overflow-hidden ${size}`}>
        <Img src={url} />
      </div>
    </Button>
  );
};

export default Avatar;
