import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import postApi from "../../api/postApi";
import { getDiffTime } from "../../functions";
import { removePost, updatePost } from "../../redux/slices/postSlice";
import AccountQuickView from "../AccountQuickView";
import ConfirmBox from "../ConfirmBox";
import Img from "../Img";
import Modal from "../Modal";
import Popover from "../Popover";
import Footer from "./PostCard/Footer";
import PostForm, { formTypes } from "./PostForm";
import PostMenu from "./PostMenu";

const PostCard = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const diffTime = useMemo(
    () => getDiffTime(new Date(data.createdAt)),
    [data.createdAt],
  );
  const dispatch = useDispatch();
  const handleDeletePost = async () => {
    try {
      setShowConfirmDelete(false);
      await postApi.delete(data._id);
      const action = removePost(data._id);
      dispatch(action);
      toast.success("Post successfully deleted");
    } catch (error) {
      toast.error("Deleted failed!");
    }
  };
  const handleEditPost = async (formData) => {
    try {
      const res = await postApi.update(formData, data._id);
      const action = updatePost(res.data.updatedPost);
      dispatch(action);
    } catch (error) {
      toast.error("something went wrong");
    }
    setOpenEditForm(false);
  };

  return (
    <motion.div
      variants={animate}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full dark:bg-dark-regular rounded-xl"
    >
      {/* header */}
      <div className="p-2 pb-0 mb-1 flex justify-between items-center">
        <AccountQuickView
          user={data.user}
          subName={
            <span className="text-xs font-bold dark:text-dark-text-light">
              {diffTime}
            </span>
          }
          className="dark:hover:bg-transparent"
        />
        <Popover
          visible={showMenu}
          setVisible={setShowMenu}
          render={
            <PostMenu
              onEdit={() => {
                setOpenEditForm(true);
                setShowMenu(false);
              }}
              onDelete={() => {
                setShowConfirmDelete(true);
                setShowMenu(false);
              }}
            />
          }
          className="dark:bg-dark-regular z-10 origin-[93%_0%] mr-2"
        >
          <div
            className="w-8 h-8 mr-2 flex justify-center items-center rounded-full hover:bg-dark-light  cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <i className="fa-solid fa-ellipsis-vertical dark:text-dark-text-light"></i>
          </div>
        </Popover>
      </div>
      {/* body */}
      <div className="relative flex flex-col px-4 gap-4">
        {data.postText && (
          <div className="dark:text-dark-text-regular">{data.postText}</div>
        )}
        {data.postImage ? (
          <div className="rounded-xl overflow-hidden ">
            <Img src={data.postImage} className="max-h-[720px] object-cover" />
          </div>
        ) : (
          <div className="mb-8"></div>
        )}
      </div>
      {/* footer */}
      <Footer post={data} />
      <ConfirmBox
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        onConfirm={handleDeletePost}
        header={
          <span>
            Delete your <span className="text-primary">Post</span> ?
          </span>
        }
        content={"Are you sure you want to delete this post?"}
        buttonText={"Delete"}
      />
      <Modal show={openEditForm} setShow={setOpenEditForm}>
        <PostForm
          initial={data}
          formState={data.postImage ? formTypes.upload : ""}
          onSubmit={handleEditPost}
        />
      </Modal>
    </motion.div>
  );
};
const animate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0 },
};

export default PostCard;
