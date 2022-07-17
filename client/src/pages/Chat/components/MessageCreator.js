import React, { useEffect, useId, useRef, useState } from "react";
import CloseButton from "../../../components/Button/CloseButton";
import Img from "../../../components/Img";
import TextArea from "../../../components/TextArea";
import { createImgUrl } from "../../../functions";

const MessageCreator = ({ initial, onSubmit }) => {
  const [previewImage, setPreviewImage] = useState(initial?.image);
  const [text, setText] = useState(initial?.text || "");
  const [file, setFile] = useState("");
  const [tagUser, setTagUser] = useState("");
  const inputFileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileId = useId();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImage !== initial) URL.revokeObjectURL(previewImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewImage]);
  const handleSubmit = async () => {
    if (text.trim() || file || previewImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", file);
      if (tagUser) formData.append("tag", JSON.stringify(tagUser));
      setPreviewImage("");
      setFile("");
      setText("");
      setTagUser(null);
      inputFileRef.current.value = null;
      setLoading(false);
      onSubmit(formData);
    }
  };
  const handleUpLoad = (e) => {
    const file = e.target.files[0];
    const url = createImgUrl(file);
    if (url) {
      setFile(file);
      setPreviewImage(url);
    }
  };

  const handlePaste = (e) => {
    const file = e.clipboardData.files[0];
    const url = createImgUrl(file);
    if (url) {
      setFile(file);
      setPreviewImage(url);
    }
  };

  //drag and drop event
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    const url = createImgUrl(file);
    if (url) {
      setFile(file);
      setPreviewImage(url);
    }
  };

  const handleCloseUpload = () => {
    setFile("");
    setPreviewImage("");
    inputFileRef.current.value = null;
  };

  return (
    <div
      className="dark:bg-dark-regular p-2 py-3 rounded-lg relative"
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDragLeave}
    >
      {previewImage && (
        <div className="max-w-[120px] relative">
          <div className="max-w-[120px] overflow-hidden rounded-md mt-1 mb-5 bg-primary/20">
            <Img src={previewImage} className="max-w-[120px] object-cover" />
          </div>
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <CloseButton
              onClick={handleCloseUpload}
              className="dark:bg-slate-500 dark:text-dark-very-light text-sm"
              size="w-5 h-5"
            />
          </div>
        </div>
      )}
      <TextArea
        onChange={setText}
        onPaste={handlePaste}
        value={text}
        onEnter={handleSubmit}
      />

      <div className="absolute right-2 -bottom-2 -translate-y-1/2 flex gap-2 justify-center items-center text-xl">
        <label
          htmlFor={inputFileId}
          className="dark:hover:bg-dark-very-light rounded-full cursor-pointer"
        >
          <input
            type="file"
            id={inputFileId}
            className="absolute invisible"
            onChange={handleUpLoad}
            ref={inputFileRef}
          />{" "}
          <div className="w-[32px] h-[32px] flex justify-center items-center shadow-sm hover:shadow-primary hover:bg-dark-very-light rounded-full">
            {isDragging ? (
              <i className="fa-duotone fa-upload"></i>
            ) : (
              <i className="fa-solid fa-image text-green-700 hover:text-green-300"></i>
            )}
          </div>
        </label>
        <div className="w-[32px] h-[32px] cursor-pointer flex justify-center items-center shadow-sm hover:shadow-primary hover:bg-dark-very-light rounded-full">
          <i className="fa-solid fa-paper-plane text-[#0084ff] hover:text-blue-400"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageCreator;
