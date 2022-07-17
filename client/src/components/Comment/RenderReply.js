import React from "react";
import CommentCard from "./CommentCard";

const RenderReply = ({ replys, onReply }) => {
  return (
    <div className="relative mt-2 mb-2">
      {replys?.map((comment) => (
        <div className="relative mb-2" key={comment._id}>
          <CommentCard comment={comment} onReply={() => onReply(comment)} />
          <div className="absolute w-[23.5px] h-[2px] top-0 left-0 -translate-x-full mt-4 comment-line">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] dark:bg-dark-regular
                rounded-full"
              ></div>
              <div className="relative w-[5px] h-[5px] bg-primary/75 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderReply;
