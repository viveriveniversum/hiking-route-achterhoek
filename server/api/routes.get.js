import mongoose from "mongoose";
import Route from "~/models/Route";

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

    const routes = await Route.find().lean();
    console.log("Routes found:", routes.length);

    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch routes",
    });
  }
});
