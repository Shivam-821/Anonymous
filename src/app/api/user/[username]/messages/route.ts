import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";

export async function GET(
  request: NextRequest,
  {params}
) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const username = await params.username;

    const user = await UserModel.findOne({ username }).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.messages || !Array.isArray(user.messages)) {
      return NextResponse.json(
        { success: false, message: "No messages found" },
        { status: 404 }
      );
    }

    const sortedMessages = [...user.messages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = (page - 1) * limit;
    const paginatedMessages = sortedMessages.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json(
      {
        success: true,
        messages: paginatedMessages,
        page,
        totalPages: Math.ceil(user.messages.length / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
