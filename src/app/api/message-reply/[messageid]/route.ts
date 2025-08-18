import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request, { params }: { params: Promise<{ messageid: string }> }) {
  const messageId = await params;

  try {
    await dbConnect();

    // Authenticate user
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user || !user._id) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { reply } = await request.json();
    if (!reply || typeof reply !== "string") {
      return Response.json(
        {
          success: false,
          message: "Reply is required and must be a string",
        },
        { status: 400 }
      );
    }

    const userId = user._id;

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "messages._id": messageId,
      },
      {
        $set: {
          "messages.$.reply": reply,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Message or user not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Reply added successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message reply:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}