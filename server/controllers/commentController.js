const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const Comment = require("../models/Comment");
const ChildComment = require("../models/ChildComment");
const Post = require("../models/Post");

const commentController = {
  create: async (req, res) => {
    try {
      const userId = req.user.id;
      const { text, tag, reply, postId, postUserId } = req.body;
      const file = req.files?.image;
      const post = await Post.findById(postId);
      if (!file && !text)
        return res.status(400).json({ msg: "Please fill in all fields." });
      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });
      if (reply) {
        const cm = await Comment.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: "This comment does not exist." });
      }
      var image = "";

      var newComment = new Comment({
        text,
        image,
        reply,
        tag,
        user: userId,
        postUserId,
        postId,
      });

      if (file) {
        image = await upload(
          file.tempFilePath,
          `novsocial/posts/${postId}/${newComment._id}`,
        );
        newComment.image = image;
      }

      await newComment.save();

      //Update a post
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true },
      );

      newComment = await Comment.findOne({
        _id: newComment._id,
      }).populate({
        path: "user",
        select: "avatar name",
      });

      res.json({
        newComment,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      if (req.files) await deleteTmp(req.files);
    }
  },

  getComments: async (req, res) => {
    const postId = req.params.id;
    const listOfComment = await Comment.find({
      postId,
      reply: { $exists: false },
    }).populate({
      path: "user",
      select: "avatar name",
    });
    res.json({
      success: true,
      message: "This is list of comment",
      listOfComment,
    });
  },

  update: async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { text, postId } = req.body;

    const updateComment = await Comment.findOne({
      _id: commentId,
      user: userId,
      postId,
    });
    const isImageChange = req.body.image !== updateComment.image;

    if (!updateComment) {
      res.json({
        success: false,
        message: "You do not have permission to update it",
      });
    }

    try {
      let image = updateComment.image;
      const file = req.files?.image;
      if (isImageChange && image) {
        await destroy(image);
      }
      if (isImageChange && file?.name !== undefined) {
        image = await upload(
          file.tempFilePath,
          `novsocial/posts/${postId}/${updateComment._id}`,
        );
      }

      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, user: userId, postId },
        { text, image },
        { new: true },
      ).populate({
        path: "user",
        select: "avatar name",
      });

      return res.json({
        updatedComment,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    } finally {
      if (req.files) await deleteTmp(req.files);
    }
  },

  delete: async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    try {
      const deleteComment = await Comment.findOneAndDelete({
        _id: commentId,
        $or: [{ user: userId }, { postUserId: userId }],
      });

      await Post.findOneAndUpdate(
        { _id: deleteComment.postId },
        {
          $pull: { comments: deleteComment._id },
        },
      );
      if (deleteComment.image) {
        await destroyDirectory(
          `novsocial/posts/${deleteComment.postId}/${deleteComment._id}`,
        );
      }

      res.json({ msg: "Deleted Comment!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentController;
