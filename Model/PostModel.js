const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  id: Number,
  title: String,
  post: String,
  tag: String,
});

var postModel = mongoose.model("post", postSchema);
module.exports = { postModel };
