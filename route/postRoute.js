const express = require("express");
const {
  getPostByUserID,
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} = require("../controller/postController");

const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createpost", createPost);
router.put("/likepost", likePost);
router.get("/getpostbyuserid", getPostByUserID);
router.put("/editpost", updatePost);
router.delete("/deletepost", deletePost);

module.exports = router;