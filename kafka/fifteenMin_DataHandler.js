const { FifteenMinuteData } = require("./../DB/model/fifteenMinute.Model");
const { timeExtractor } = require("./../helper_functions/timeExtractor");

const currentSlotData = {
  open: null,
  close: null,
  low: null,
  high: null,
  timestamp: null,
};

let initialmin;
let currentmin;

exports.fifteenMinDataHandler = async (val) => {
  const rawData = JSON.parse(val);
  const hourMinFormat = timeExtractor(rawData.data.T);
  currentmin = hourMinFormat.minutes;

  if (initialmin == undefined) {
    console.log(rawData.data.T);
    initialmin = currentmin;
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = rawData.data.T;
  } else if (initialmin != currentmin && currentmin % 15 == 0) {
    initialmin = currentmin;
    ///============= save in Database =============//
    // console.log("currentSlotdata : ", currentSlotData);

    await FifteenMinuteData.create({
      _id:
        currentSlotData.timestamp -
        Math.floor(currentSlotData.timestamp % 60000),
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
    ``;
    currentSlotData.close = Number(rawData.data.p);
    if (Number(rawData.data.p) < currentSlotData.low)
      currentSlotData.low = Number(rawData.data.p);

    if (Number(rawData.data.p) > currentSlotData.high)
      currentSlotData.high = Number(rawData.data.p);
  }
};
