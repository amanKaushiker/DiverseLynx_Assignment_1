const { oneDayDataModel } = require("./../DB/model/oneDay.Model");
const { timeExtractor } = require("./../helper_functions/timeExtractor");

const currentSlotData = {
  open: null,
  close: null,
  low: null,
  high: null,
  timestamp: null,
};

let initialDayStamp;
let currentDayStamp;

exports.oneDayDataHandler = async (val) => {
  const rawData = JSON.parse(val);
  currentDayStamp =
    Number(rawData.data.T) - Math.floor(Number(rawData.data.T) % 86400000); ///===> Round off 1-day timestamp

  if (initialDayStamp == undefined) {
    console.log(rawData.data.T);
    initialDayStamp = currentDayStamp;
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = currentDayStamp;
  } else if (initialDayStamp != currentDayStamp) {
    initialDayStamp = currentDayStamp;
    ///============= save in Database =============//
    console.log("currentSlotdata : ", currentSlotData);

    await oneDayDataModel.create({
      _id: currentSlotData.timestamp, ///===> Roundoff timeStamp
      open: currentSlotData.open,
      high: currentSlotData.high,
      low: currentSlotData.low,
      close: currentSlotData.close,
    });

    currentSlotData.open = currentSlotData.close;
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = currentDayStamp;
  } else {
    currentSlotData.close = Number(rawData.data.p);
    if (Number(rawData.data.p) < currentSlotData.low)
      currentSlotData.low = Number(rawData.data.p);

    if (Number(rawData.data.p) > currentSlotData.high)
      currentSlotData.high = Number(rawData.data.p);
  }
};
