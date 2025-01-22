// server/api/auth/google.post.js
import User from "~/models/User";
import { decodeJwtResponse } from "~/utils/auth.js";

export default defineEventHandler(async (e) => {
  try {
    const { credential } = await readBody(e);
    const decodedToken = decodeJwtResponse(credential);

    const userData = {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
    };

    // Find existing user or create new one
    let user = await User.findOne({ id: userData.id });

    if (!user) {
      user = new User(userData);
      await user.save();
      console.log("New user created:", user);
    }

    return {
      user: userData,
    };
  } catch (error) {
    console.error("Google auth error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to process Google authentication to db",
    });
  }
});
