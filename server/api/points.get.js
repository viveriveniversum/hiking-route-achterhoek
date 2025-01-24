import Point from "~/models/Point";
import { connectDB } from "./utils/index.js";

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
