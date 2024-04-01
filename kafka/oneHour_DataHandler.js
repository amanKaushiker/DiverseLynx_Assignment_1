const { oneHourData } = require("../DB/model/oneHour.Model");
const { timeExtractor } = require("../helper_functions/timeExtractor");

const currentSlotData = {
  open: null,
  close: null,
  low: null,
  high: null,
  timestamp: null,
};

let initialhour;
let currenthour;

exports.oneHourDataHandler = async (val) => {
  const rawData = JSON.parse(val);
  const hourMinFormat = timeExtractor(rawData.data.T);
  currenthour = hourMinFormat.hours;

  if (initialhour == undefined) {
    // console.log(rawData.data.T);
    initialhour = currenthour;
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = rawData.data.T;
  } else if (initialhour != currenthour) {
    initialhour = currenthour;
    ///============= save in Database =============//
    console.log("currentSlotdata : ", currentSlotData);

    await oneHourData.create({
      _id:
        currentSlotData.timestamp -
        Math.floor(currentSlotData.timestamp % 3600000),
      open: currentSlotData.open,
      high: currentSlotData.high,
      low: currentSlotData.low,
      close: currentSlotData.close,
    });

    currentSlotData.open = currentSlotData.close;
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = Number(rawData.data.T);
  } else {
    currentSlotData.close = Number(rawData.data.p);
    if (Number(rawData.data.p) < currentSlotData.low)
      currentSlotData.low = Number(rawData.data.p);

    if (Number(rawData.data.p) > currentSlotData.high)
      currentSlotData.high = Number(rawData.data.p);
  }
};
