const express = require("express");
const {
  getPostByUserID,
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} = require("../controller/postController");
const { CheckJWTToken } = require("../controller/authController");

const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createpost",CheckJWTToken, createPost);
router.put("/likepost",CheckJWTToken ,likePost);
router.get("/getpostbyuserid/:userID", getPostByUserID);
router.put("/editpost",CheckJWTToken ,updatePost);
router.post("/deletepost",CheckJWTToken, deletePost);


/**
 * @swagger
 * tags:
 *    name: Post
 *    description: All Post API
 */

/**
 * @swagger
 * /post/getposts:
 *  get:
 *      tags: [Post]
 *      responses:
 *        200:
 *           description: Get all posts
 */


/**
 * @swagger
 * /post/createpost:
 *  post:
 *      tags: [Post]
 *      parameters:
 *              - in: body
 *                name: createpost
 *                description: Create a Post
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                      - message
 *                  properties:
 *                      userID:
 *                          type: string
 *                      message:
 *                          type: string
 *      responses:
 *          200:
 *              description: Created
 */


/**
 * @swagger
 * /post/likepost:
 *  put:
 *      tags: [Post]
 *      parameters:
 *              - in: body
 *                name: like
 *                description: like the post
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                      - postID
 *                  properties:
 *                      userID:
 *                          type: string
 *                      postID:
 *                          type: string
 *      responses:
 *          200:
 *              description: Created
 */


/**
 * @swagger
 * /post/getpostbyuserid/{userID}:
 *  get:
 *      tags: [Post]
 *      parameters:
 *              - in: path
 *                name: userID
 *                description: Get Post By User ID
 *                schema:
 *                  type: string
 *                  required: true
 *                  description: userID
 *      responses:
 *          200:
 *              description: Get Post By UserID
 */
 

/**
 * @swagger
 * /post/editpost:
 *  put:
 *      tags: [Post]
 *      parameters:
 *              - in: body
 *                name: editpost
 *                description: Edit Post By User ID
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                      - postID
 *                      - message
 *                  properties:
 *                      userID:
 *                          type: string
 *                      postID:
 *                          type: string
 *                      message:
 *                          type: string
 *      responses:
 *          200:
 *              description: Updated
 */


/**
 * @swagger
 * /post/deletepost:
 *  post:
 *      tags: [Post]
 *      parameters:
 *              - in: body
 *                name: deletepost
 *                description: Delete Post By User ID
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                      - postID
 *                  properties:
 *                      userID:
 *                          type: string
 *                      postID:
 *                          type: string
 *      responses:
 *          200:
 *              description: Deleted
 */
 
module.exports = router;