const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const ChildComment = require("../models/ChildComment");
var success = false;

const postController = {
  create: async (req, res) => {
    try {
      const { postText } = req.body;
      const file = req.files?.postImage;
      if (file || postText) {
        var postImage = "";
        //Create new post
        var newPost = new Post({ postText, postImage, user: req.user.id });
        if (file) {
          postImage = await upload(
            file.tempFilePath,
            `novsocial/posts/${newPost._id}`,
          );
          newPost.postImage = postImage;
        }
        await newPost.save();
        newPost = await Post.findOne({ _id: newPost._id }).populate({
          path: "user",
          select: "avatar name followers",
        });
        res.json({
          success,
          message: "Post a status successfully",
          newPost,
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    } finally {
      if (req.files) await deleteTmp(req.files);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const userID = req.user.id;
      const { page = 1, limit = 5 } = req.query;
      const user = await User.find({ _id: userID }).select("following");
      const listOfPost = await Post.find({
        user: [...user, userID],
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort("-createdAt")
        .populate({
          path: "user",
          select: "avatar name followers",
        });

      res.json({
        message: "This is list of post",
        listOfPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAPost: async (req, res) => {
    const postID = req.params.id;
    const userID = req.user.id;
    const post = await Post.findOne({
      user: userID,
      post: postID,
    }).populate({
      path: "user",
      select: "avatar name followers",
    });
    res.json({ success: true, message: "This is a post", post });
  },

  getAllPostOfAUser: async (req, res) => {
    const userID = req.params.id;

    const post = await Post.find({ user: userID }).sort("-createdAt").populate({
      path: "user",
      select: "avatar name followers",
    });
    success = true;
    if (success) {
      res.json({
        success,
        message: "This is all post of a user",
        post,
      });
    } else {
      res.json({
        success,
        message: "Get post fail",
      });
    }
  },

  update: async (req, res) => {
    try {
      const postID = req.params.id;
      const userID = req.user.id;
      const { postText } = req.body;
      const updatePost = await Post.findOne({ _id: postID, user: userID });
      const isImageChange = req.body.postImage !== updatePost.postImage;
      if (updatePost) {
        var postImage = updatePost.postImage;
        const file = req.files?.postImage;
        if (isImageChange && postImage !== "") {
          await destroy(postImage);
          postImage = "";
        }
        if (isImageChange && file?.name !== undefined) {
          postImage = await upload(
            file.tempFilePath,
            `novsocial/posts/${updatePost._id}`,
          );
        }

        //Update a post
        const newPost = { postText, postImage, user: userID };

        var updatedPost = await Post.findOneAndUpdate(
          { _id: postID, user: userID },
          newPost,
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });
        res.json({
          message: "Update a status successfully",
          updatedPost,
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    } finally {
      if (req.files) await deleteTmp(req.files);
    }
  },

  love: async (req, res) => {
    const postID = req.params.id;
    const userID = req.user.id;
    var state = 0;
    try {
      var post = await Post.findOne({ _id: postID });
      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });

      if (!post.likes?.includes(userID)) {
        post = await Post.findByIdAndUpdate(
          { _id: postID },
          {
            $push: { likes: userID },
          },
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });
        state = 1;
      } else {
        post = await Post.findByIdAndUpdate(
          { _id: postID },
          {
            $pull: { likes: userID },
          },
          { new: true },
        ).populate({
          path: "user",
          select: "avatar name followers",
        });
        state = -1;
      }
      res.json({
        message: "Love a post successfully",
        state,
        post,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const _id = req.params.id;
      const userID = req.user.id;
      const deletePost = await Post.findOneAndDelete({
        _id,
        user: userID,
      });

      if (deletePost.postImage) {
        await destroyDirectory(`novsocial/posts/${deletePost._id}`);
      }
      await Comment.deleteMany({ post: deletePost._id });
      await ChildComment.deleteMany({ post: deletePost._id });

      res.json({
        msg: "Deleted Post!",
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postController;
