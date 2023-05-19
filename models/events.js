const mongoose = require("mongoose");

const Events = new mongoose.Schema(
  {
    event_name : String,
    event_date : String,
    event_desc:String,
    registration_end_date : String,
    registration_link : String,
  },
  {
      collection : 'events'
  });

const model = mongoose.model("EventsData", Events);

module.exports = model;