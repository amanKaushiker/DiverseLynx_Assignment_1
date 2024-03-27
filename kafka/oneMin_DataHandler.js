const { MinuteData } = require("../DB/model/eachMinute.Model");

let minSlot;
const currentSlotData = {
  open: null,
  close: null,
  low: null,
  high: null,
  timestamp: null,
};

function timeExtractor(unixTimeStamp) {
  const date = new Date(unixTimeStamp);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

exports.eachMinDataSaver = (val) => {
  const rawData = JSON.parse(val);
  const hourMinFormat = timeExtractor(rawData.data.T);
  let currentSlot = `${hourMinFormat.hours}:${hourMinFormat.minutes}`;

  if (minSlot == undefined) {
    minSlot = currentSlot;
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = Number(rawData.data.T);
  } else if (minSlot === currentSlot) {
    //console.log("//=== SameValue ======//");
    if (Number(rawData.data.p) < currentSlotData.low) {
      currentSlotData.low = Number(rawData.data.p);
    }
    if (Number(rawData.data.p) > currentSlotData.high) {
      currentSlotData.high = Number(rawData.data.p);
    }
    currentSlotData.close = Number(rawData.data.p);
  } else if (minSlot != currentSlot) {
    console.log("//========= New Minute arrived =========//");

    //=== old min data need to be saved in database ===//
    const data = new MinuteData({
      timeStampKey: currentSlotData.timestamp,
      open: currentSlotData.open,
      high: currentSlotData.high,
      low: currentSlotData.low,
      close: currentSlotData.close,
      date: new Date(currentSlotData.timestamp),
    });

    data
      .save()
      .then(() => {
        console.log("time stamp data saved successfully");
      })
      .catch((err) => {
        console.error("Error saving user:", err.message);
      });

    //=== new Data need to be save temporaily
    minSlot = `${hourMinFormat.hours}:${hourMinFormat.minutes}`;

    currentSlotData.open = currentSlotData.close; ///==> close is equals to new min open
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
    currentSlotData.timestamp = Number(rawData.data.T);
  }
};
