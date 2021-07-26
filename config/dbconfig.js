import mongoose from "mongoose";
import { DB_URL, DB_PASSWORD } from "./";

const DB = DB_URL.replace("<password>", DB_PASSWORD);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database connected on ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
