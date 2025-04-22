// lib/mongodb.ts
import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected or connecting
    return;
  }

  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {}
    );
    if (connection) {
      console.log("MongoDB connected successfully");
    }

    // console.log("Connected to MongoDB", connection);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
