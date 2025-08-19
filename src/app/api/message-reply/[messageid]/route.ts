import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }
) {
  const messageid = await params.messageid

  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user || !user._id) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { reply } = await request.json();
    if (!reply || typeof reply !== "string") {
      return Response.json(
        { success: false, message: "Reply is required and must be a string" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: user._id,
        "messages._id": messageid,
      },
      {
        $set: {
          "messages.$.reply": reply,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Message or user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Reply added successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message reply:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
