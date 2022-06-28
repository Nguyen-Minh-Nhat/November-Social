import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import images from "../../assets/images";
import Button from "../Button";
import { motion } from "framer-motion";

const UpLoadAvatar = ({ setAvatarSelected, initialImage }) => {
  const [previewImage, setPreviewImage] = useState(initialImage);

  useEffect(() => {
    return () => {
      if (previewImage !== initialImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleUpLoad = (e) => {
    const file = e.target.files[0];
    if (file && file["type"].split("/")[0] === "image") {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setAvatarSelected({ avatar: file });
    }
  };

  return (
    <div
      className={`p-2 border  ${
        previewImage
          ? "border-primary dark:border-primary"
          : "dark:border-slate-600 border-slate-400"
      }  rounded-full relative`}
    >
      <div className="w-32 h-32 bg-dark-very-light dark:bg-white rounded-full overflow-hidden">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          src={previewImage || images.defaultAvatar}
          alt=""
          className="w-full h-full block object-cover"
        />
      </div>
      <div className="absolute top-[2px] right-[2px] w-10 h-10">
        <input
          type="file"
          name="file"
          id="file"
          placeholder=""
          className="absolute invisible"
          onChange={(e) => handleUpLoad(e)}
        />
        <Button p-0 w-full h-full bg-transparent shadow-none>
          <label
            htmlFor="file"
            className="rounded-full w-full h-full flex justify-center items-center border-4  dark:border-dark-light bg-slate-400 hover:bg-primary-bold cursor-pointer transition-all text-primary-bold hover:text-white"
          >
            <i className="fa-solid fa-plus "></i>
          </label>
        </Button>
      </div>
    </div>
  );
};

UpLoadAvatar.propTypes = {};

export default UpLoadAvatar;
