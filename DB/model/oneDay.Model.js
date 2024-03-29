const mongoose = require("mongoose");

const OneDayDataSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

// Create a model for minute data
const oneDayDataModel = mongoose.model("OneDayDataSchema", OneDayDataSchema);

module.exports = { oneDayDataModel };
