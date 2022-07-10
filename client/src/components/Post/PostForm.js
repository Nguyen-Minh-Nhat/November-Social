import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createImgUrl } from "../../functions";
import AccountQuickView from "../AccountQuickView";
import Button from "../Button";
import Spinner from "../Spinner";
import TextArea from "../TextArea";
import UploadPhoto from "../UploadPhoto";
export const formTypes = { upload: "upload", activity: "activity" };

const PostForm = ({ initial, formState, onSubmit }) => {
  const user = useSelector((state) => state.auth.user);
  const [showUpload, setShowUpload] = useState(formState === formTypes.upload);
  const [postText, setPostText] = useState(initial?.postText);
  const [postFile, setPostFile] = useState(null);
  const [formImg, setFormImg] = useState(initial.postImage);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseUpload = () => {
    setShowUpload(false);
    setPostFile(null);
    setFormImg("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("postText", postText);
    formData.append("postImage", postFile);
    await onSubmit(formData);
    setLoading(false);
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
      setPostFile(file);
      setFormImg(url);
      setShowUpload(true);
    }
  };
  // paste event
  const handlePaste = (e) => {
    const file = e.clipboardData.files[0];
    const url = createImgUrl(file);
    if (url) {
      setPostFile(file);
      setFormImg(url);
      setShowUpload(true);
    }
  };

  return (
    <form
      className="relative w-[500px] min-h-96 rounded-xl flex-col dark:bg-dark-regular border dark:border-primary/20 transition-all overflow-hidden"
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
    >
      <div
        className="p-4 py-3 font-bold text-2xl text-light-text-bold dark:text-dark-text-bold 
        border-b dark:border-dark-border"
      >
        {"Create your"} <span className="text-primary">{"Post"}</span>
      </div>
      <div className="p-1 h-full flex flex-col gap-2 ">
        <AccountQuickView
          user={user}
          className="hover:dark:bg-transparent cursor-default"
        />
        <div className="min-h-[180px] mb-2">
          <div className="mb-4 max-h-48 scrollAble px-2">
            <TextArea
              onPaste={handlePaste}
              onChange={setPostText}
              value={postText}
              autoFocus
            />
          </div>

          <AnimatePresence>
            {showUpload && (
              <div className="max-h-[320px] overflow-x-hidden scrollAble px-1">
                <UploadPhoto
                  setShow={handleCloseUpload}
                  initial={formImg}
                  onChange={setPostFile}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t mt-auto dark:border-dark-border flex gap-2 p-3 pt-4 -mx-1">
          <div
            className="p-2 px-3 rounded-full dark:bg-dark-light dark:text-dark-text-regular cursor-pointer hover-brightness transition-all"
            onClick={() => setShowUpload(true)}
          >
            <i className="fa-duotone fa-photo-film mr-2 text-md text-green-300"></i>
            Photo/Video
          </div>
          <div className="p-2 px-3 rounded-full dark:bg-dark-light dark:text-dark-text-regular cursor-pointer hover-brightness transition-all">
            <i className="fa-duotone fa-face-smile-wink text-[18px] mr-2 text-yellow-500"></i>
            Feeling/Activity
          </div>
          <Button
            className="p-2 flex-1 disabled:bg-slate-400"
            primary
            disabled={!(postText.trim() || formImg || postFile) || loading}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </div>
      </div>
      {isDragging && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDragLeave}
          className="absolute -top-1 -left-1 -bottom-1 -right-1 bg-primary/20"
        ></div>
      )}
      {loading && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDragLeave}
          className="absolute -top-1 -left-1 -bottom-1 -right-1 flex justify-center items-center backdrop-blur-[1px] backdrop-brightness-50"
        >
          <Spinner className="w-10 h-10" />
        </div>
      )}
    </form>
  );
};

export default PostForm;
