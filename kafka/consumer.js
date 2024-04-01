const Kafka = require("node-rdkafka");
const { connectToMongoDB } = require("./../DB/mongo_Connection");
const { eachMinDataSaver } = require("./oneMin_DataHandler");
const { fiveMinDataHandler } = require("./fiveMin_DataHandler");
const { fifteenMinDataHandler } = require("./fifteenMin_DataHandler");
const { oneHourDataHandler } = require("./oneHour_DataHandler");
const { fourHourDataHandler } = require("./fourHour_DataHandler");
const { oneDayDataHandler } = require("./oneDay_DataHandler");

function consumer() {
  try {
    const consumerConfig = {
      "group.id": "Users",
      "metadata.broker.list": "3.133.74.32:9092", // Kafka broker address
      "auto.offset.reset": "earliest", // Start consuming from the earliest message in the topic
    };
    const consumer = new Kafka.KafkaConsumer(consumerConfig);
    consumer.on("ready", async () => {
      console.log("Consumer is ready");
      consumer.subscribe(["binance-kafka-topic-3"]);
      consumer.consume();
    });
    consumer.on("data", (message) => {
      //console.log(`Received message: ${message.value.toString()}`); //${message.value.toString()}
      eachMinDataSaver(message.value.toString());
      fiveMinDataHandler(message.value.toString());
      fifteenMinDataHandler(message.value.toString());
      oneHourDataHandler(message.value.toString());
      fourHourDataHandler(message.value.toString());
      oneDayDataHandler(message.value.toString());
    });
    consumer.on("event.error", (error) => {
      console.error("Consumer error:", error);
    });
    consumer.connect();
  } catch (e) {
    console.log("Err : ", e);
    return;
  }
}

connectToMongoDB()
  .then((d) => {
    consumer();
  })
  .catch((e) => {
    console.log("Err : ", e);
  });
