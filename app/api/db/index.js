import mongoose from "mongoose";

const mongoURI = process.env.mongoURI;
const connectToDatabase = () =>
  mongoose
    .connect(mongoURI, {})
    // .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

export default connectToDatabase;
