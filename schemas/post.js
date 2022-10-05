const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  content: {
    type: String,
    required: true,
    unique: false
  },
  time: {
    type: String,
    required:false,
    unique: false
  }
  // time: {
  //   type: Date,
  //   default: Date.now,
  // }
});

module.exports = mongoose.model("Posts", postsSchema);