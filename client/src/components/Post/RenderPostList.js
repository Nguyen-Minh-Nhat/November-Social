import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../api/postApi";
import { setPostList } from "../../redux/slices/postSlice";
import PostCard from "./PostCard";

const RenderPostList = () => {
  const postList = useSelector((state) => state.post.data);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getPostList = async (state) => {
        try {
          const res = await postApi.get();
          const action = setPostList(res.data.listOfPost);
          dispatch(action);
        } catch (error) {
          console.log(error);
        }
      };
      getPostList();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-4 pb-24">
      <AnimatePresence>
        {postList.map((post) => (
          <PostCard key={post._id} data={post} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RenderPostList;
