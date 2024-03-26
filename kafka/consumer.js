const Kafka = require("node-rdkafka");
const { connectToMongoDB } = require("./../DB/mongo_Connection");
const { MinuteData } = require("../DB/model/eachMinute.Model");

let minSlot;
const currentSlotData = {
  open: null,
  close: null,
  low: null,
  high: null,
  day: null,
  month: null,
  year: null,
};

function timeExtractor(unixTimeStamp) {
  const date = new Date(unixTimeStamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

function eachMinDataSaver(val) {
  const rawData = JSON.parse(val);
  const hourMinFormat = timeExtractor(rawData.data.T);

  if (minSlot == undefined) {
    minSlot = `${hourMinFormat.hours}:${hourMinFormat.minutes}`;
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
  } else if (minSlot === `${hourMinFormat.hours}:${hourMinFormat.minutes}`) {
    //console.log("//=== SameValue ======//");
    if (Number(rawData.data.p) < currentSlotData.low) {
      currentSlotData.low = Number(rawData.data.p);
    }
    if (Number(rawData.data.p) > currentSlotData.high) {
      currentSlotData.high = Number(rawData.data.p);
    }
    currentSlotData.close = Number(rawData.data.p);
  } else if (minSlot !== `${hourMinFormat.hours}:${hourMinFormat.minutes}`) {
    console.log("//========= New Minute arrived =========//");

    //=== old min data need to be saved in database ===//
    const data = new MinuteData({
      minuteKey: minSlot,
      open: currentSlotData.open,
      high: currentSlotData.high,
      low: currentSlotData.low,
      close: currentSlotData.close,
      date: `${currentSlotData.year}-${currentSlotData.month}-${currentSlotData.day}`,
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
    currentSlotData.open = Number(rawData.data.p);
    currentSlotData.close = Number(rawData.data.p);
    currentSlotData.low = Number(rawData.data.p);
    currentSlotData.high = Number(rawData.data.p);
  }
}

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
      consumer.subscribe(["binance-kafka-topic-1"]);
      consumer.consume();
    });
    consumer.on("data", (message) => {
      //console.log(`Received message: ${message.value.toString()}`); //${message.value.toString()}
      eachMinDataSaver(message.value.toString());
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
    console.log(d);
    consumer();
  })
  .catch((e) => {
    console.log("Err : ", e);
  });
