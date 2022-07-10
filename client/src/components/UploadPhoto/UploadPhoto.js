import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import { createImgUrl } from "../../functions";
import Img from "../Img";

const UploadPhoto = ({ setShow, initial, onChange }) => {
  const [previewImage, setPreviewImage] = useState(initial);
  useEffect(() => {
    setPreviewImage(initial);
  }, [initial]);

  useEffect(() => {
    return () => {
      if (previewImage !== initial) URL.revokeObjectURL(previewImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewImage]);

  const handleUpLoad = (e) => {
    const file = e.target.files[0];
    const url = createImgUrl(file);
    if (url) {
      onChange(file);
      setPreviewImage(url);
    }
  };

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="px-2"
    >
      <div className="w-full min-h-[240px] flex rounded-xl border border-dashed dark:border-primary-bold p-2 relative group">
        <input
          type="file"
          name="file"
          id="file"
          placeholder=""
          className="absolute invisible"
          onChange={(e) => handleUpLoad(e)}
        />
        <Button
          className={"absolute top-2 right-2 bg-transparent shadow-none"}
          onClick={() => setShow(false)}
        >
          <span
            className="absolute top-1 right-1 w-7 h-7
                flex items-center justify-center
                rounded-full
              bg-slate-200 dark:bg-dark-regular
              text-light-text-light dark:text-dark-text-regular
                cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-md font-normal"></i>
          </span>
        </Button>
        {previewImage ? (
          <div className="w-full min-h-full rounded-xl overflow-hidden dark:bg-dark-light">
            <Img src={previewImage} className="w-full h-full object-cover" />
            <label
              htmlFor="file"
              className="absolute px-2 py-2 opacity-0 rounded-lg bg-white/50 hover:bg-white top-4 left-4 font-bold text-sm cursor-pointer group-hover:opacity-100 transition-all"
            >
              <i className="fa-duotone fa-photo-film text-md mr-2"></i>
              Add photos/videos
            </label>
          </div>
        ) : (
          <label
            htmlFor="file"
            className={`w-full min-h-full rounded-xl flex justify-center items-center flex-col gap-2 dark:bg-dark-light  cursor-pointer hover-brightness`}
          >
            <div className="w-12 h-12 bg-primary/20 flex justify-center items-center rounded-full">
              <i className="fa-duotone fa-photo-film text-xl text-green-300"></i>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold dark:text-dark-text-bold">
                {" "}
                Add photos/videos
              </span>
              <div className="dark:text-dark-text-regular">
                or drag and drop
              </div>
            </div>
          </label>
        )}
      </div>
    </motion.div>
  );
};

const animation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0, borderRadius: "100%" },
};

export default React.memo(UploadPhoto);
