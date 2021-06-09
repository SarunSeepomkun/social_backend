const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    max: 500,
  },
  hashtags: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
