import mongoose from "mongoose";
import Route from "~/models/Route";

export default defineEventHandler(async (event) => {
  const selectedRouteId = event.context.params.selectedRouteId;
  const body = await readBody(event);
  const { isFav } = body;

  try {
    const route = await Route.findOne({ id: selectedRouteId });
    if (!route) {
      throw createError({ statusCode: 404, message: "Route not found" });
    }

    route.isFav = isFav;
    await route.save();

    return { message: "Route favorite status updated", isFav: route.isFav };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to update favorite status",
    });
  }
});
