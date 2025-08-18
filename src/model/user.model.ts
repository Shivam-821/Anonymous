import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  reply: string;
  createdAt: Date;
  isReported: boolean
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isReported: {
    type: Boolean,
    default: false,
  }, 
});

export interface User extends Document {
  username: string;
  email: string;
  password?: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  isGoogleUser?: boolean;
  messages: Message[];
  image?: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    image: {
      type: String,
      default: ""
    }, 
    verifyCode: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    verifyCodeExpiry: {
      type: Date,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
