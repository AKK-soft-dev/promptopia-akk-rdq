import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
  const { bio } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // Update the user with new data
    existingUser.bio = bio;

    await existingUser.save();

    return new Response("Successfully updated the user", { status: 200 });
  } catch (error) {
    return new Response("Error Updating User", { status: 500 });
  }
};
