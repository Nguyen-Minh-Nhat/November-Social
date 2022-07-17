const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const User = require("../models/User");
const { use } = require("../utils/transporter");
var success = false;

const UserController = {
  search: async (req, res) => {
    const name = req.params.name;
    try {
      var searchUser = await User.find({
        name: { $regex: name, $options: "$i" },
      })
        .limit(10)
        .select("name avatar followers");
      success = true;
      res.json({
        success,
        message: "This is list of searching _id",
        searchUser,
      });
    } catch (error) {
      console.log(error);
      res.json({ success, message: "There are something wrong!", error });
    }
  },

  getAUser: async (req, res) => {
    success = false;
    try {
      const profileID = req.params.id;
      var user = await User.findOne({ _id: profileID }).select("-password");
      success = true;
    } catch (e) {
      console.log(e);
    }

    if (success) {
      res.json({
        success,
        message: "This is a user information",
        user,
      });
    } else {
      res.json({
        success,
        message: "Get user fail",
      });
    }
  },
  getAllFollowingUsers: async (req, res) => {
    success = false;
    try {
      const userID = req.params.id;
      var followingUsers = await User.find({ followers: userID }).select(
        "name avatar followers",
      );
      success = true;
    } catch (err) {
      console.log(err);
    }
    if (success) {
      res.json({
        success,
        message: "This is a user information",
        listOfFollowingUsers: followingUsers,
      });
    } else {
      res.json({
        success,
        message: "Get user fail",
      });
    }
  },

  updateUser: async (req, res) => {
    const {
      avatar,
      name,
      phoneNumber,
      address,
      description,
      gender,
      isImageChange,
      isDefault,
      birthDate,
      updatedAt,
      userID,
    } = req.body;

    const userUpdate = await User.findOne({ _id: userID });
    var userAvatar = userUpdate.avatar;

    const file = req.files?.avatar;

    try {
      if (!name)
        return res.status(400).json({ msg: "Please add your full name." });
      if (userUpdate) {
        if (isImageChange === "true" && userAvatar !== "") {
          await destroy(userAvatar);

          if (isDefault === "true") {
            userAvatar = await upload(
              `../client/public/assets/images/avatars/${avatar}`,
              "novsocial/avatars",
            );
          } else {
            userAvatar = await upload(file.tempFilePath, "novsocial/avatars");
          }
        }
      }

      const user = await User.findOneAndUpdate(
        { _id: userID },
        {
          name,
          avatar: userAvatar,
          phoneNumber: phoneNumber,
          address: address,
          description: description,
          updatedAt,
          gender: gender,
          birthDate,
        },
      ).select("-password");
      res.json({
        success: true,
        message: "Update a status successfully",
        user,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  follow: async (req, res) => {
    const followId = req.params.id;
    const userId = req.user.id;

    if (userId !== followId) {
      try {
        var user = await User.findOne({ _id: userId, following: followId });
        var follow = await User.findOne({ _id: followId, followers: userId });
        const followed = follow && user;
        if (followed) {
          //Unfollow
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { following: followId } },
            { new: true },
          ).select("name avatar following");

          await User.findOneAndUpdate(
            { _id: followId },
            { $pull: { followers: userId } },
            { new: true },
          );
        } else {
          //Follow
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { following: followId } },
            { new: true },
          ).select("name avatar following");

          await User.findOneAndUpdate(
            { _id: followId },
            { $push: { followers: userId } },
            { new: true },
          );
        }

        res.json({ user });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
    }
  },
  suggestionsUser: async (req, res) => {
    var user = await User.findOne({ _id: req.user.id });
    try {
      const newArr = [...user.following, user._id];

      const num = req.query.num || 10;

      const users = await User.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = UserController;
