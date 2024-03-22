const { kafka } = require("./kafka_Client");

async function init() {
  try {
    const consumer = kafka.consumer({ groupId: "user-1" });
    await consumer.connect();

    await consumer.subscribe({
      topics: ["binance-data"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(
          `${group}: [${topic}]: PART:${partition}:`,
          message.value.toString()
        );
      },
    });
  } catch (e) {
    console.log("Error : ", e);
  }
}

init();
