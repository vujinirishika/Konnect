const mongoose = require("mongoose");

const Normaluser = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: String, required: true },
    notifications: [{
      type: String,
    }],
  },
  { collection: "normalusers" }
);

const model = mongoose.model("NormalusersData", Normaluser);

module.exports = model;
