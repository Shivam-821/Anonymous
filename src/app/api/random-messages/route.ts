/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";
import { redisClient } from "@/lib/redisConfig";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const CACHE_EXPIRY = process.env.CACHE_EXPIRY;
    if(redisClient.isReady){
      const randomRedisMessages = await redisClient.get("randomMessages");
      if (randomRedisMessages) {
        console.log("randomRedisMessages: ", randomRedisMessages);
        return NextResponse.json({
          success: true,
          messages: JSON.parse(randomRedisMessages as string),
        });
      }
    }
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

    if(redisClient.isReady){
      await redisClient.set("randomMessages", JSON.stringify(randomMessages), { EX: parseInt(CACHE_EXPIRY) });
    }
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
