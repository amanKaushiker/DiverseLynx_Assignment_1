const { kafka } = require("./kafka_Client");

//================== producer initialization foir kafka ====================//
async function init() {
  const producer = kafka.producer();
  console.log("//======= Connecting producer ========// ");

  await producer.connect();

  console.log("//========= Producer Connected Successfully =========//");

  //============= Now sending message/Data to kafka producer ==========//
  await producer.send({
    topic: "binance-data",
    messages: [
      {
        partition: 0,
        key: "name",
        value: "aman kaushik",
      },
      {
        partition: 0,
        key: "name",
        value: "deepak kumar",
      },
    ],
  });

  console.log("//====== Message has been Produced ============ // ");

  await producer.disconnect();
}

init();
