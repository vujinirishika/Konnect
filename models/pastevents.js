const mongoose = require("mongoose");

const Pastevents = new mongoose.Schema(
  {
    event_name : String,
    event_date : String,
    event_desc:String,
    images: [
        {
            type: String,
            required: true
        },
    ],
  },
  {
      collection : 'past-events'
  });

const model = mongoose.model("PasteventsData", Pastevents);

module.exports = model;