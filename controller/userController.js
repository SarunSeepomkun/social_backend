const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;

//SignIn
exports.signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await UserModel.findOne({ username });

    if (!existUser) {
      return res.status(404).json({ message: "Username doesn't exist" });
    }

    const isCheckPassword = await bcrypt.compare(password, existUser.password);
    if (!isCheckPassword) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const token = jwt.sign(
      { username: existUser.username, id: existUser._id },
      secret,
      { expiresIn: "1h" }
    );

    const result = {
      userID: existUser._id,
      username: existUser.username,
      token,
    };

    res.cookie("social-token", JSON.stringify(result), {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, //1Hour
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Error userController.signin : ${error}` });
  }
};

//SignUp
exports.signup = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    const existUsername = await UserModel.findOne({ username });
    const existemail = await UserModel.findOne({ email });

    if (existUsername !== null) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (existemail !== null) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      username: username,
      password: hashPassword,
      email: email,
      bio: bio,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ username: result.username, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error : userController.signup : ${error}` });
  }
};

//Get Profile By ID
exports.GetProfile = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findById(userID);

    if (user === null) {
      res.status(200).json({ message: "This profile does not exist." });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error : userController.GetProfile , ${error}` });
  }
};

//Update Profile By ID
exports.UpdateProfile = async (req, res) => {
  try {
    const { userID, bio, country , gender } = req.body;
    const user = await UserModel.findById(userID);

    if (user === null) {
      res.status(200).json({ message: "This profile does not exist." });
    } else {
      await UserModel.findByIdAndUpdate(userID, { bio, country , gender });
      res.status(200).json({ message: "Updated" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error : userController.GetProfile , ${error}` });
  }
};

//Close Account , Delete User
exports.DeleteUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findById(userID);

    // Check Password

    // Delete follower

    // Delete user
    await UserModel.findByIdAndDelete(userID);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error : userController.DeleteUser , ${error}` });
  }
};

//Follow and Unfolow
exports.followuser = async (req, res) => {
  try {
    const { userID, followuserID } = req.body;
    const user = await UserModel.findById(userID);
    const followUser = await UserModel.findById(followuserID);

    if (user.followings.includes(followuserID)) {
      //if following already
      await UserModel.findByIdAndUpdate(userID, {
        $pull: { followings: followuserID },
      });
      await UserModel.findByIdAndUpdate(followuserID, {
        $pull: { followers: userID },
      });
      res.status(200).json({ message: "Followed" });
    } else {
      //following
      await UserModel.findByIdAndUpdate(userID, {
        $push: { followings: followuserID },
      });
      await UserModel.findByIdAndUpdate(followuserID, {
        $push: { followers: userID },
      });
      res.status(200).json({ message: "Unfollowed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error : userController.followuser ${error}` });
  }
};

exports.Upload_Avatar = async (req , res)=>{
  try {
  
    if(!req.files || Object.keys(req.files).length === 0){
      return res.status(400).send("No files were uploaded.");
    }

    const file = req.files[0]; //req.files.filname
    const upload_path = __dirname + '/somewhere/on/your/server/' + file.name;

    file.mv(upload_path, error => {
      if(error){
        return res.status(500).send({ message : `Error : ${error}` })
      }
      res.json({ message : "File Uploaded"});
    });

  } catch (error) {
    res.status(500).json({message: `Error : userController.jsupload_avatar ${error}`})
  }
}