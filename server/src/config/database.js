import mongoose from "mongoose";
import constants from "./constants";

module.exports = () => {
  try {
    mongoose.connect(constants.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  } catch (err) {
    mongoose.createConnection(constants.MONGO_URL);
  }
  mongoose.connection
    .once("open", () => console.log("MongoDB: Connected & Running"))
    .on("error", (e) => {
      throw e;
    });
};
