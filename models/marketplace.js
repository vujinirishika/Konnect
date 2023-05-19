const mongoose = require("mongoose");

const Items = new mongoose.Schema(
  {
    username: String,
    name: String,
    email: String,
    itemname: String,
    mno: String,
    originalprice: String,
    finalprice: String,
    description: String,
    types: {
        type: String,
        enum: ['Books', 'Apron', 'Tools', 'Electronics'],
    },
    images: [
        {
            type: String,
            required: true
        },
    ],
  },
  {
      collection : 'items'
  });

const model = mongoose.model("ItemsData", Items);

module.exports = model;