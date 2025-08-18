import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export async function dbConnect(): Promise<void> {
  // void means i don't care about what's the return type is.
  if (connection.isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log(" 🛢️ MONGODB connected successfully");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    process.exit(1);
  }
}
