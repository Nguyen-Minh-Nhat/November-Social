import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import commentApi from "../../api/commentApi";
import { checkIncludesUser } from "../../functions";
import {
  removeComment,
  updateComment,
  addComments,
} from "../../redux/slices/postSlice";
import Avatar from "../Avatar";
import Button from "../Button";
import CloseButton from "../Button/CloseButton";
import ConfirmBox from "../ConfirmBox";
import Img from "../Img";
import Popover from "../Popover";
import LikeButton from "../Button/LikeButton";
import CommentForm from "./CommentForm";
import RenderReply from "./RenderReply";
import CommentCreate from "./CommentCreate";
import { Link } from "react-router-dom";

const CommentCard = ({ comment, childComments, onReply }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReply, setShowReply] = useState(!!childComments);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [tagUser, setTagUser] = useState(null);
  const firstLoad = useRef(true);
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
    data.append("postId", comment.postId);
    try {
      const res = await commentApi.update(data, comment._id);
      const action = updateComment(res.data.updatedComment);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
    setShowEdit(false);
  };

  const handleLike = async () => {
    try {
      const res = await commentApi.like(comment._id);
      const action = updateComment(res.data.comment);
      dispatch(action);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleReply = (commentReply) => {
    if (onReply) {
      onReply(commentReply.user);
      return;
    }
    if (!showReply) {
      handleShowReply();
    }
    setTagUser(commentReply.user);
  };

  const handleShowReply = async () => {
    setShowReply(true);
    if (!childComments) {
      try {
        const res = await commentApi.getReplyComments(comment._id);
        const action = addComments({
          postId: comment.postId,
          comments: res.data.listOfComment,
        });
        dispatch(action);
        firstLoad.current = false;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
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
        <div className="relative" key={comment._id}>
          {(comment?.childComments.length > 0 || showReply) && (
            <div className="absolute top-0 left-4 -translate-x-1/2 w-[2px] h-full comment-line"></div>
          )}

          <div className="flex gap-2">
            <div className="relative">
              <div className="relative">
                <Avatar url={comment.user.avatar} size="w-8 h-8" />
              </div>
            </div>
            <div className="w-full">
              <div className="text-sm dark:text-dark-text-bold">
                {comment.user.name}
              </div>
              <div className="flex flex-start">
                <div className="relative mr-8 group">
                  {comment.text && (
                    <div className="px-2 py-1 min-w-[80px] rounded-lg rounded-tl-none dark:bg-dark-light mt-1">
                      {comment?.tag && (
                        <Link
                          to={`/profile/${comment.tag._id}`}
                          className="dark:text-dark-text-bold dark:hover:text-primary mr-1"
                        >
                          @{comment.tag.name}
                        </Link>
                      )}
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
                        <i
                          className={`fa-solid fa-ellipsis-vertical dark:text-dark-text-light  group-hover:visible ${
                            showMenu ? "visible " : "invisible"
                          }`}
                        ></i>
                      </div>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <div className="flex gap-2">
                  <Button
                    circle
                    small
                    onClick={() => handleReply(comment)}
                    className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                  >
                    <i className="fa-solid fa-comment"></i>
                  </Button>
                  <LikeButton
                    className="small"
                    onClick={handleLike}
                    isActive={() => checkIncludesUser(comment.likes)}
                  />
                </div>
              </div>
              {showReply ? (
                <div className="relative -ml-10 dark:bg-dark-regular">
                  <div className="absolute w-[2px] h-full top-0 left-4 -translate-x-1/2 comment-line"></div>
                  <div className="ml-10">
                    <div>
                      <RenderReply
                        comment={comment}
                        replys={childComments}
                        onReply={handleReply}
                      />
                      <div className="relative mt-2">
                        <div className="absolute w-7 h-full top-0 left-0 -translate-x-full mt-4 dark:bg-dark-regular">
                          <div className="absolute w-[24.5px] h-[2px] top-0 right-0 translate-y-1/2 comment-line">
                            <div className="absolute left-0 bottom-0">
                              <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] dark:bg-dark-regular
                  rounded-full"
                              ></div>
                              <div className="relative w-[5px] h-[5px] bg-primary/75 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <CommentCreate
                          postId={comment.postId}
                          postUserId={comment.postUserId}
                          initial={{
                            text: "",
                            image: "",
                            reply: comment._id,
                            tag: tagUser,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {comment?.childComments.length > 0 && (
                    <div
                      onClick={handleShowReply}
                      className="relative mt-2 cursor-pointer group"
                    >
                      <div>
                        <span className="mt-[2px] inline-block">
                          <i className="fa-solid fa-angles-right text-primary/75 group-hover:text-primary"></i>
                        </span>
                        <span className="text-[14px] mx-2 group-hover:text-white">
                          {comment?.childComments.length}{" "}
                          <i className="fa-light fa-comment text-xs"></i>
                        </span>
                      </div>
                      <div className="absolute w-[26px] h-1/2 bottom-0 left-0 -translate-x-full comment-line dark:bg-dark-regular">
                        <div className="absolute w-[24.5px] h-[2px] top-0 left-0 comment-line">
                          <div className="absolute left-[1px] bottom-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] dark:bg-dark-regular rounded-full"></div>
                            <div className="relative w-[5px] h-[5px] bg-primary/75 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
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
    </>
  );
};

export default CommentCard;
