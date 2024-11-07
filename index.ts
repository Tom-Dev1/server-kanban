import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.zokfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
