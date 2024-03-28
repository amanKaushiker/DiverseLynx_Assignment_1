const mongoose = require("mongoose");

const FiveMinuteDataSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

// Create a model for minute data
const FiveMinuteData = mongoose.model("FiveMinuteData", FiveMinuteDataSchema);

module.exports = { FiveMinuteData };
