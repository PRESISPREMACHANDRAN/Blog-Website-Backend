const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required:true
  },
  title: String,
  post: String,
  tag: String,
});

var postModel = mongoose.model("post", postSchema);
module.exports = { postModel };
