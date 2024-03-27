const mongoose = require("mongoose");

const FiveMinuteDataSchema = new mongoose.Schema(
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
const FiveMinuteData = mongoose.model("FiveMinuteData", FiveMinuteDataSchema);

module.exports = { FiveMinuteData };
