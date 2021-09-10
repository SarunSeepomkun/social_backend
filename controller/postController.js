const express = require("express");
const mongoose = require("mongoose");
const PostMessage = require("../model/postModel");

//Get All Posts
exports.getPosts = async (req, res) => {
  try {
    //const postMessages = await PostMessage.find();

    const postMessages = await PostMessage.aggregate([
      {
        $lookup: {
          let: { userObjId: { $toObjectId: "$userID" } },
          from: "users",
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } }],
          as: "user_info",
        },
      },
    ]).sort({ createdDate: -1 });

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GetPostsWithPaging
exports.GetPostsWithPaging = async (req, res) => {
  try {
    const { pageNumber, pageLimit } = req.params;

    const pageOptions = {
      page: parseInt(pageNumber) || 0,
      limit: parseInt(pageLimit) || 10,
    };

    const postMessages = await PostMessage.aggregate([
      {
        $lookup: {
          let: { userObjId: { $toObjectId: "$userID" } },
          from: "users",
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } }],
          as: "user_info",
        },
      },
    ])
      .sort({ _id: -1 })
      .skip(pageOptions.limit * (pageOptions.page - 1))
      .limit(pageOptions.limit);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Post By Post ID
exports.GetPostByPostID = async (req, res) => {
  try {
    const { postID } = req.body;

    const postMessages = await PostMessage.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postID),
        },
      },
      {
        $lookup: {
          let: { userObjId: { $toObjectId: "$userID" } },
          from: "users",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userObjId"] },
              },
            },
          ],
          as: "user_info",
        },
      },
    ]);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Post By UserID
exports.getPostByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const posts = await PostMessage.aggregate([
      {
        $lookup: {
          let: { userObjId: { $toObjectId: "$userID" } },
          from: "users",
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } }],
          as: "user_info",
        },
      },
    ]).sort({ createdDate: -1 });

    if (posts === null) {
      res.status(200).json({
        count_posts: "0",
        message: "This userID does not have any post.",
      });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create a Post
exports.createPost = async (req, res) => {
  try {
    const { userID, message } = req.body;
    const newPostMessage = new PostMessage({
      userID,
      message,
    });

    let return_postID = await newPostMessage.save(function (err, result) {
      return_postID = result._id.toString();
      res
        .status(201)
        .json({ message: "Created", return_postID: return_postID });
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Update a Post
exports.updatePost = async (req, res) => {
  try {
    const { userID, postID, message } = req.body;
    const post = await PostMessage.findById(postID);

    if (post.userID === userID) {
      await post.updateOne({ $set: { message } });
      res.status(200).json({ message: "Updated" });
    } else {
      res.status(403).json({ message: "Unauthorize to edit this post" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a Post
exports.deletePost = async (req, res) => {
  try {
    const { userID, postID } = req.body;

    const post = await PostMessage.findById(postID);

    if (!post) {
      res.status(200).json({ message: "This post does not exist" });
    }

    if (post.userID === userID) {
      await post.deleteOne();
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(403).json({ message: "Unauthorize to delete" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Like and unlike the post
exports.likePost = async (req, res) => {
  try {
    const { userID, postID } = req.body;

    if (userID !== null && postID !== null) {
      const post = await PostMessage.findById(postID);
      if (post.likes.includes(userID)) {
        await post.updateOne({ $pull: { likes: userID } });
        res.status(200).json({ message: "Unliked" });
      } else {
        await post.updateOne({ $push: { likes: userID } });
        res.status(200).json({ message: "Liked" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
