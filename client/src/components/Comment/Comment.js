import React, { useState } from "react";
import { useDispatch } from "react-redux";

import commentApi from "../../api/commentApi";
import { removeComment, updateComment } from "../../redux/slices/postSlice";
import Avatar from "../Avatar";
import Button from "../Button";
import CloseButton from "../CloseButton";
import ConfirmBox from "../ConfirmBox";
import Img from "../Img";
import Popover from "../Popover";
import LikeButton from "../Post/LikeButton";
import CommentForm from "./CommentForm";

const Comment = ({ comment }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteComment = async () => {
    try {
      await commentApi.delete(comment._id);
      const action = removeComment(comment);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateComment = async (data) => {
    setShowEdit(false);
    data.append("postId", comment.postId);
    try {
      const res = await commentApi.update(data, comment._id);
      const action = updateComment(res.data.updatedComment);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-2">
      {showEdit ? (
        <div className="flex gap-2">
          <div className="flex-1">
            <CommentForm initial={comment} onSubmit={handleUpdateComment} />
          </div>
          <CloseButton
            onClick={() => setShowEdit(false)}
            className="dark:bg-dark-very-light mt-[6px]"
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Avatar url={comment.user.avatar} size="w-8 h-8" />
          <div className="">
            <div className="text-sm dark:text-dark-text-bold">
              {comment.user.name}
            </div>
            <div className="relative mr-8 group">
              {comment.text && (
                <div className="px-2 py-1 rounded-xl rounded-tl-none dark:bg-dark-light mt-1">
                  <span>{comment.text}</span>
                </div>
              )}
              {comment.image && (
                <div className="max-w-[120px] rounded-md overflow-hidden mt-2">
                  <Img
                    src={comment.image}
                    className="max-w-[120px] object-cover"
                  />
                </div>
              )}
              <div className="absolute right-0 top-1/2 translate-x-[110%] -translate-y-1/2 z-20">
                <Popover
                  visible={showMenu}
                  setVisible={setShowMenu}
                  className={"-right-1/2 -mr-4"}
                  render={
                    <div className="flex gap-1">
                      <Button
                        circle
                        medium
                        onClick={() => {
                          setShowEdit(true);
                          setShowMenu(false);
                        }}
                        className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </Button>
                      <Button
                        circle
                        medium
                        onClick={() => setShowConfirmDelete(true)}
                        className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                      >
                        <i className="fa-solid fa-trash "></i>
                      </Button>
                    </div>
                  }
                >
                  <div
                    className="w-6 h-6 flex justify-center items-center rounded-full hover:bg-dark-light  cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <i className="fa-solid fa-ellipsis-vertical dark:text-dark-text-light invisible group-hover:visible"></i>
                  </div>
                </Popover>
              </div>
            </div>
            <div className="mt-1">
              <div className="flex gap-1">
                <Button
                  circle
                  small
                  className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                >
                  <i className="fa-solid fa-comment "></i>
                </Button>
                <LikeButton className="small" />
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmBox
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        onConfirm={handleDeleteComment}
        header={
          <span>
            Delete your <span className="text-primary">comment</span> ?
          </span>
        }
        content={"Are you sure you want to delete this comment?"}
        buttonText={"Delete"}
      />
    </div>
  );
};

export default Comment;
