const mongoose = require("mongoose");

const Posts = new mongoose.Schema(
  {
    username: String,
    name: String,
    caption: String,
    images: [
        {
            type: String,
            required: true
        },
    ],
    date: String,
    time: String,
    likes: [String],
    comments: [String],
  },
  {
      collection : 'posts'
  });

const model = mongoose.model("PostsData", Posts);

module.exports = model;