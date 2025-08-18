import { v2 as cloudinary } from "cloudinary";
import { getServerSession, User } from "next-auth";
import { dbConnect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user.model";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session.user || !user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { image } = await request.json();
  const userId = user._id as string;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "profile-images",
    });

    foundUser.image = uploadResult.secure_url;
    await foundUser.save();

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
