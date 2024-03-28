const mongoose = require("mongoose");

const OneHourDataSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

// Create a model for minute data
const FifteenMinuteData = mongoose.model("FiveMinuteData", FDataSchema);

module.exports = { FifteenMinuteData };