import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  await dbConnect();

  const {username} = await context.params;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const user = await UserModel.findOne({ username }).lean();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const sortedMessages = [...user.messages].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const startIndex = (page - 1) * limit;
  const paginatedMessages = sortedMessages.slice(startIndex, startIndex + limit);

  return NextResponse.json(
    {
      success: true,
      messages: paginatedMessages,
      page,
      totalPages: Math.ceil(user.messages.length / limit)
    },
    { status: 200 }
  );
}
