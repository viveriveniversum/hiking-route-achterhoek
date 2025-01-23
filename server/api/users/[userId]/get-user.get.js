import User from "~/models/User";

export default defineEventHandler(async (e) => {
  const userId = e.context.params.userId;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    return { user: user, message: "User retrieved!" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "Error updating favorites",
    });
  }
});
