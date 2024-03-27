const { FiveMinuteData } = require("../DB/model/fiveMinute.Model");

let minSlot = 0;
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
    miliSeconds: date.getMilliseconds(),
  };
}
let initialmin = 0;
let currentmin;

exports.fiveMinDataHandler = (val) => {
  const rawData = JSON.parse(val);
  const hourMinFormat = timeExtractor(rawData.data.T);
  //let currentSlot = `${hourMinFormat.hours}:${hourMinFormat.minutes}`;

//   if (hourMinFormat.seconds == 0 && hourMinFormat.minutes % 5 == 0) {
//     if (flag) {
//       console.log(
//         "min with miliseconds : ",
//         hourMinFormat.minutes,
//         " : ",
//         hourMinFormat.seconds,
//         " : ",
//         hourMinFormat.miliSeconds
//       );
//       flag = false;
//     }
//   }
  currentmin = hourMinFormat.minutes;

  if (initialmin != currentmin && currentmin % 5 == 0) {
    console.log("//=========== every five min ==========//");
    initialmin = currentmin;
  }

  //     if (currentSlotData.timestamp != null) {
  //       //============ save data in db ===========//
  //       //console.log("//========== save data in db ================ //");
  //     }
  //     currentSlotData.open = currentSlotData.close;
  //     currentSlotData.close = rawData.data.p;
  //     currentSlotData.low = rawData.data.p;
  //     currentSlotData.high = rawData.data.p;
  //     currentSlotData.timestamp = Number(rawData.data.T);
  //   }
  //  else {
  //     if (flag) {
  //       console.log("min : ", hourMinFormat.minutes);
  //       flag = false;
  //     }
  //     if (Number(rawData.data.p) < currentSlotData.low) {
  //       currentSlotData.low = Number(rawData.data.p);
  //     }
  //     if (Number(rawData.data.p) > currentSlotData.high) {
  //       currentSlotData.high = Number(rawData.data.p);
  //     }
  //     currentSlotData.close = Number(rawData.data.p);
  //   }
};
