const mongoose = require("mongoose");

const Clubheads = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: String, required: true },
  },
  { collection: "clubheads" }
);

const model = mongoose.model("ClubheadsData", Clubheads);

module.exports = model;
