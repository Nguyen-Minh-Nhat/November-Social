import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import postApi from "../../api/postApi";
import { addNewPost } from "../../redux/slices/postSlice";
import Avatar from "../Avatar";
import Modal from "../Modal";
import PostForm, { formTypes } from "./PostForm";

const PostCreate = () => {
  const user = useSelector((state) => state.auth.user);
  const [openForm, setOpenForm] = useState(false);
  const [postData, setPostData] = useState({ postText: "" });
  const [formState, setFromState] = useState("");

  const dispatch = useDispatch();
  const handleOpenForm = (formState) => {
    setOpenForm(true);
    setFromState(formState);
  };

  const handleCreatePost = async (data) => {
    try {
      const res = await postApi.create(data);
      const action = addNewPost(res.data.newPost);
      dispatch(action);
    } catch (error) {
      toast.error("something went wrong");
    }
    setOpenForm(false);
  };

  return (
    <div className="w-full dark:bg-dark-regular rounded-xl p-4">
      <div className="flex items-center gap-4 ">
        <Avatar url={user.avatar} />
        <div
          onClick={() => handleOpenForm("")}
          className="flex-1 dark:bg-dark-light py-2 px-4 rounded-full dark:text-dark-text-regular cursor-pointer hover:dark:bg-primary/20 hover:dark:text-dark-text-bold transition-all"
        >
          {" "}
          what's on your mind?
        </div>
      </div>
      <div className="border-t dark:border-dark-border flex mt-4 pt-4 gap-2">
        <div
          className="p-2 px-3 rounded-full dark:bg-dark-light dark:text-dark-text-regular cursor-pointer hover-brightness transition-all"
          onClick={() => handleOpenForm(formTypes.upload)}
        >
          <i className="fa-duotone fa-photo-film mr-2 text-md text-green-300"></i>
          Photo/Video
        </div>
        <div className="p-2 px-3 rounded-full dark:bg-dark-light dark:text-dark-text-regular cursor-pointer hover-brightness transition-all">
          <i className="fa-duotone fa-face-smile-wink text-[18px] mr-2 text-yellow-500"></i>
          Feeling/Activity
        </div>
      </div>

      <Modal show={openForm} setShow={setOpenForm}>
        <PostForm
          initial={postData}
          formState={formState}
          onSubmit={handleCreatePost}
        />
      </Modal>
    </div>
  );
};

export default PostCreate;
