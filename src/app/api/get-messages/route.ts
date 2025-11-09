/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!user || !session) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const userAggre = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!userAggre || userAggre.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No message available",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: userAggre[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching message: ", error);
    return Response.json(
      {
        success: false,
        message: "Unable to fetch message",
      },
      { status: 500 }
    );
  }
}
