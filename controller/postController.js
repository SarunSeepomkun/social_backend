const express = require("express");
const mongoose = require("mongoose");
const PostMessage = require("../model/postModel");

//Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Post By UserID
exports.getPostByUserID = async (req, res) => {
  try {
    const { userID } = req.body;

    const posts = await PostMessage.findOne({userID});
    res.status(200).json(posts);
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

    await newPostMessage.save();
    res.status(201).json({message : "Created"});
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
      res.status(200).json({message : "Updated"});
    } else {
      res.status(403).json({message : "Unauthorize to edit this post"});
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

    if(!post){
      res.status(200).json({message : "This post does not exist"});
    }

    if (post.userID === userID) {
      await post.deleteOne();
      res.status(200).json({message : "Deleted"});
    } else {
      res.status(403).json({message : "Unauthorize to delete"});
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
