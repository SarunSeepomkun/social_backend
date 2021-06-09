const express = require("express");
const router = express.Router();

const { signin, signup , GetProfile , UpdateProfile , DeleteUser , followuser } = require("../controller/userController");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getprofile/:userID", GetProfile);
router.put("/editprofile", UpdateProfile);
router.delete("/deleteuser", DeleteUser);
router.put("/followuser", followuser);

module.exports = router;
