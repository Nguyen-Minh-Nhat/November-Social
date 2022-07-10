import React from "react";
import PropTypes from "prop-types";
import PostCreate from "../../components/Post/PostCreate";
import RenderPostList from "../../components/Post/RenderPostList";

const HomePage = (props) => {
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <PostCreate />
      <RenderPostList />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
