import mongoose from "mongoose";
import Point from "~/models/Point";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(import.meta.env.MONGO_KEY);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const points = await Point.find().lean();
    console.log("Points found:", points.length);

    return points;
  } catch (error) {
    console.error("Error fetching points:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch points",
    });
  }
});
