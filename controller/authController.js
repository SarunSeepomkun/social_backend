const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const dotenv = require("dotenv");
dotenv.config();

exports.CheckJWTToken = async (req, res, next) => {
  let token = null;
  if (req.headers.jwttoken) {
    token = req.headers.jwttoken;
  }

  if (token === null) {
    return res.status(401).json({ message: "Unauthorized to access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};
