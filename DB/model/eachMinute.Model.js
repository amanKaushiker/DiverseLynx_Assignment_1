const mongoose = require("mongoose");

const MinuteDataSchema = new mongoose.Schema(
  {
    timeStampKey: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    date: Date,
  },
  {
    timestamps: true,
  }
);

// Create a model for minute data
const MinuteData = mongoose.model("MinuteData", MinuteDataSchema);

module.exports = { MinuteData };
