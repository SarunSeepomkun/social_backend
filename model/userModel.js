const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  bio: {
    type: String,
    max: 100,
  },
  country: {
    type: String,
    max: 100,
  },
  gender:{
    type: String,
    max: 30
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

const UserInfo = mongoose.model("user", UserSchema);

module.exports = UserInfo;
