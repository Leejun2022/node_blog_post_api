const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
    unique: false
  },
  time: {
    type: String,
    required:false,
    unique: false
  },
  _postId: {
    type: String,
    required:true,
    unique: false
  },
});

module.exports = mongoose.model("Comments", commentsSchema);