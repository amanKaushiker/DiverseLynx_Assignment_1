const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./../.env") });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

exports.connectToMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        resolve("Mongo Connected Successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
};
