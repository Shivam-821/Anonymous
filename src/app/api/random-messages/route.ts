/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";

export async function GET(request: Response) {
  await dbConnect();

  try {
    const randomMessages = await UserModel.aggregate([
      { $unwind: "$messages" },
      { $match: { "messages.reply": { $ne: "" } } },
      { $sample: { size: 10 } },
      {
        $project: {
          _id: 0,
          content: "$messages.content",
          reply: "$messages.reply",
          createdAt: "$messages.createdAt",
        },
      },
    ]);
    console.log(randomMessages)

    return NextResponse.json({
      success: true,
      messages: randomMessages,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something unexpected occur",
    });
  }
  
}
