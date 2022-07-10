import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import commentApi from "../../../api/commentApi";
import postApi from "../../../api/postApi";
import { checkIncludesCurrentUser } from "../../../functions";
import { setPostComments, updatePost } from "../../../redux/slices/postSlice";
import Button from "../../Button";
import CommentCreate from "../../Comment/CommentCreate";
import RenderCommentList from "../../Comment/RenderCommentList";
import Tooltip from "../../Tooltip";
import LikeButton from "../LikeButton";

const Footer = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async () => {
    try {
      const res = await postApi.like(post._id);
      const action = updatePost({ ...post, likes: res.data.post.likes });
      dispatch(action);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleShowComment = async () => {
    setShowComment(!showComment);
    if (!post.commentsDetail && !showComment) {
      try {
        const res = await commentApi.getComments(post._id);
        const action = setPostComments({
          postId: post._id,
          comments: res.data.listOfComment,
        });
        dispatch(action);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative p-4 dark:text-dark-text-regular flex flex-col gap-4">
      <div className="absolute flex gap-2 top-0 right-4 -translate-y-1/2">
        <Tooltip content="Comment" placement="top" arrow>
          <Button
            circle
            shadow
            className="dark:hover:text-dark-text-bold"
            onClick={handleShowComment}
          >
            <i className="fa-solid fa-comment "></i>
          </Button>
        </Tooltip>
        <Tooltip content="Share" placement="top" arrow>
          <Button circle shadow className="dark:hover:text-dark-text-bold">
            <i className="fa-solid fa-share"></i>
          </Button>
        </Tooltip>

        <LikeButton
          onClick={handleLike}
          className="shadow dark:hover:text-dark-text-bold"
          isActive={() => checkIncludesCurrentUser(post.likes)}
        />
      </div>{" "}
      <div className="flex gap-2">
        <span>
          <span className="hover:text-primary">
            {post.commentsDetail
              ? post.commentsDetail.length
              : post.comments.length}
          </span>{" "}
          <i className="fa-light fa-comment"></i>
        </span>{" "}
        <span>
          <span className="hover:text-primary"> 2</span>{" "}
          <i className="fa-light fa-share "></i>
        </span>{" "}
        <span>
          <span className="hover:text-primary">{post.likes.length}</span>{" "}
          <i className="fa-light fa-heart relative z-10 heart"></i>
        </span>
      </div>
      {showComment && (
        <div className="pt-4 border-t dark:border-dark-border flex flex-col gap-4">
          <CommentCreate postId={post._id} postUserId={post.user._id} />
          <RenderCommentList comments={post?.commentsDetail} />
        </div>
      )}
    </div>
  );
};

export default Footer;
