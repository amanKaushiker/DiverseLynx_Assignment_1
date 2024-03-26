const mongoose = require("mongoose");

const MinuteDataSchema = new mongoose.Schema({
  minuteKey: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  date: String,
});

// Create a model for minute data
const MinuteData = mongoose.model("MinuteData", MinuteDataSchema);

module.exports = { MinuteData };
