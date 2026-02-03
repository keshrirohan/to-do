import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/todoApp";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    mongoose.connection.on("connected", () => {
      mongoUri;
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
