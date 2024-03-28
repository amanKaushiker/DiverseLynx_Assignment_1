const mongoose = require("mongoose");

const FifteenMinuteDataSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

// Create a model for minute data
const FifteenMinuteData = mongoose.model(
  "FifteenMinuteData",
  FifteenMinuteDataSchema
);

module.exports = { FifteenMinuteData };
