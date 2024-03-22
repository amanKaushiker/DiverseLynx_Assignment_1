const WebSocket = require("ws");
const { kafka } = require("./kafka_Client");

// const ws = new WebSocket(
//   "wss://fstream.binance.com/stream?streams=btcusdt@trade"
// );

// ws.on("open", function open() {
//   ws.on("message", function message(data) {
//     //console.log(`${data}`);

//     const rawData = JSON.parse(data.toString());
//     //console.log("raw data : ", rawData.data);
//   });
// });

//=============== connect client to admin oif kafka ======================//

async function init() {
  const admin = kafka.admin();

  console.log("//============= admin connecting ============//");

  admin.connect();

  console.log("//==== admin connected ==========//");

  //===============  now need to create topics/Channel on kafka ============//
  await admin.createTopics({
    topics: [
      {
        topic: "binance-data",
        numPartitions: 2,
      }
    ],
  });

  console.log("//============== Topics created ===============// ");

  await admin.disconnect();
}

init();
