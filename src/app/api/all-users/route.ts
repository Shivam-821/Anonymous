/* eslint-disable @typescript-eslint/no-unused-vars */
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export type User_Username = {
  id: string;
  username: string;
  image?: string;
};

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const allUsers = await UserModel.find();

    if (allUsers.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No User Found",
        },
        { status: 404 }
      );
    }

    const limitedUsers = allUsers.slice(0, 15);

    const users: User_Username[] = limitedUsers.map((oneUser) => ({
      id: oneUser._id as string,
      username: oneUser.username,
      image: oneUser.image || "",
    }));

    const allUsernames = allUsers.map((oneUser) => ({
      username: oneUser.username,
    }));

    return NextResponse.json(
      {
        status: true,
        message: "Users fetched successfully",
        users,
        allUsers: allUsernames,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
