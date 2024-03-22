const { Kafka } = require("kafkajs");

//===================== Need to setup KAfka Client ======================/
exports.kafka = new Kafka({
  clientId: "myApp",
  brokers: ["192.168.180.14:9092"],
});
