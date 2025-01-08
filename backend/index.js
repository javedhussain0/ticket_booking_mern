import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

const ConnectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
const StartServer = ()=>{
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});
}


StartServer();