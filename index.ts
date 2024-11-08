import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//router
app.use("/auth/", userRouter);

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.zokfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = process.env.PORT;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);

    console.log(`Connect to Database successfully`);
  } catch (err) {
    console.log(`Can not connect to database: ${err}`);
  }
};
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
