const express = require("express");
const router = express.Router();

const { signin, signup , GetProfile , UpdateProfile , DeleteUser , followuser } = require("../controller/userController");
const { CheckJWTToken } = require("../controller/authController");
//Route
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getprofile/:userID", GetProfile);
router.put("/editprofile", CheckJWTToken , UpdateProfile);
router.delete("/deleteuser", CheckJWTToken , DeleteUser);
router.put("/followuser",CheckJWTToken , followuser);

//API Document
/**
 * @swagger
 * tags:
 *    name: Authentication
 *    description: Allow user access
 */

/**
 * @swagger
 * tags:
 *    name: User
 *    description: All User API
 */

/**
 * @swagger
 * /user/signin:
 *  post:
 *      tags: [Authentication]
 *      parameters:
 *              - in: body
 *                name: signin
 *                description: User Sign-in
 *                schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *      responses:
 *          200:
 *              description: Sign-in
 */

/**
 * @swagger
 * /user/signup:
 *  post:
 *      tags: [Authentication]
 *      parameters:
 *              - in: body
 *                name: signup
 *                description: User Sign-up
 *                schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *                      - email
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      email:
 *                          type: string
 *                      bio:
 *                          type: string
 *                      country:
 *                          type: string
 *      responses:
 *          200:
 *              description: Sign-up
 */

/**
 * @swagger
 * /user/getprofile/{userID}:
 *  get:
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: userID
 *            schema:
 *                  type: string
 *            required: true
 *            description: User ID
 *      responses:
 *          200:
 *              description: Get all users
 */


/**
 * @swagger
 * /user/editprofile:
 *  put:
 *      tags: [User]
 *      parameters:
 *              - in: body
 *                name: editprofile
 *                description: edit profile
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                  properties:
 *                      userID:
 *                          type: string
 *                      bio:
 *                          type: string
 *                      country:
 *                          type: string
 *      responses:
 *          200:
 *              description: Changed
 */


/**
 * @swagger
 * /user/deleteuser:
 *  delete:
 *      tags: [User]
 *      parameters:
 *              - in: body
 *                name: deleteuser
 *                description: Close account
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                  properties:
 *                      userID:
 *                          type: string
 *      responses:
 *          200:
 *              description: Deleted
 */


/**
 * @swagger
 * /user/followuser:
 *  put:
 *      tags: [User]
 *      parameters:
 *              - in: body
 *                name: followuser
 *                description: Follow user
 *                schema:
 *                  type: object
 *                  required:
 *                      - userID
 *                      - followuserID
 *                  properties:
 *                      userID:
 *                          type: string
 *                      followuserID:
 *                          type: string
 *      responses:
 *          200:
 *              description: Success
 */
module.exports = router;
