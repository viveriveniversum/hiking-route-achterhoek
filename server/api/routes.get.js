import Route from "~/models/Route";
import { connectDB } from "./utils/index.js";

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
