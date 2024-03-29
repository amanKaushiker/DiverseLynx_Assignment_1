const mongoose = require("mongoose");

const FourHourDataSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

// Create a model for minute data
const fourHourData = mongoose.model("FourHourDataSchema", FourHourDataSchema);

module.exports = { fourHourData };
