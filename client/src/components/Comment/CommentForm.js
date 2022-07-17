import React, { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createImgUrl } from "../../functions";
import Avatar from "../Avatar";
import CloseButton from "../Button/CloseButton";
import Img from "../Img";
import SpinnerV2 from "../Spinner/SpinnerV2";
import TextArea from "../TextArea";

const CommentForm = ({ initial, onSubmit }) => {
  const [previewImage, setPreviewImage] = useState(initial?.image);
  const user = useSelector((state) => state.auth.user);
  const [text, setText] = useState(initial?.text);
  const [file, setFile] = useState("");
  const [tagUser, setTagUser] = useState("");
  const inputFileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileId = useId();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewImage(initial.image);
  }, [initial.image]);
  useEffect(() => {
    setTagUser(initial?.tag);
  }, [initial?.tag]);

  useEffect(() => {
    return () => {
      if (previewImage !== initial) URL.revokeObjectURL(previewImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewImage]);

  const handleSubmit = async () => {
    if (text || file || previewImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", file);
      if (tagUser) formData.append("tag", JSON.stringify(tagUser));
      await onSubmit(formData);
      setPreviewImage("");
      setFile("");
      setText("");
      setTagUser(null);
      inputFileRef.current.value = null;
      setLoading(false);
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
  const handleRemoveTag = (e) => {
    if (e.key === "Backspace" && !text && tagUser) {
      setTagUser(null);
    }
  };

  return (
    <div className="flex gap-2" onKeyDown={handleRemoveTag}>
      <Avatar url={user.avatar} size="w-8 h-8 mt-[2px]" />
      <div className="relative flex-1">
        <div
          className="relative w-full flex px-2 py-2 dark:bg-dark-light overflow-hidden rounded-lg"
          onDrop={(e) => handleDrop(e)}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDragLeave}
        >
          {tagUser && (
            <Link
              to={`/profile/${tagUser._id}`}
              className="dark:text-dark-text-bold dark:hover:text-primary mr-1"
            >
              @{tagUser.name}
            </Link>
          )}
          <div className="flex-1">
            <TextArea
              onChange={setText}
              onPaste={handlePaste}
              value={text}
              onEnter={handleSubmit}
            />
          </div>
          <div>
            <div className="absolute right-1 -bottom-3 -translate-y-1/2">
              <label
                htmlFor={inputFileId}
                className="dark:hover:bg-dark-very-light cursor-pointer"
              >
                <input
                  type="file"
                  id={inputFileId}
                  className="absolute invisible"
                  onChange={handleUpLoad}
                  ref={inputFileRef}
                />{" "}
                <div className="w-[30px] h-[30px] flex justify-center items-center hover-brightness rounded-full">
                  {isDragging ? (
                    <i className="fa-duotone fa-upload"></i>
                  ) : (
                    <i className="fa-duotone fa-image"></i>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
        {loading && (
          <>
            <div className="absolute top-0 right-0 left-0 bottom-0"></div>
            <div className="mt-2">
              <SpinnerV2 />
            </div>
          </>
        )}
        {previewImage && (
          <div className="max-w-[120px] relative">
            <div className="max-w-[120px] overflow-hidden rounded-md mt-3 bg-primary/20">
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
      </div>
    </div>
  );
};

export default CommentForm;
