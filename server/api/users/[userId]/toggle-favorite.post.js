import User from "~/models/User";

export default defineEventHandler(async (e) => {
  const userId = e.context.params.userId;
  const { routeId } = await readBody(e);

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    const isAlreadyFav = user.favorites.includes(routeId);

    if (isAlreadyFav) {
      user.favorites = user.favorites.filter(
        (fav) => fav.toString() !== routeId.toString()
      );
    } else {
      user.favorites.push(routeId);
    }
    await user.save();

    return { favorites: user.favorites, message: "Favorites updated!" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "Error updating favorites",
    });
  }
});
