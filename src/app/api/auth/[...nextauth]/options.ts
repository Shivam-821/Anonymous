/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConfig";
import UserModel from "@/model/user.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          if (!user.password) {
            throw new Error("This account does not support password login.");
          }

          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPassCorrect) {
            return user;
          } else {
            throw new Error("Invalid credentials. Password doesn't match");
          }
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.email?.split("@")[0], // Add username to profile
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();

        try {
          let user = await UserModel.findOne({ email: profile?.email });

          if (!user) {
            user = await UserModel.create({
              username: profile?.email?.split("@")[0],
              email: profile?.email,
              isVerified: true,
              isGoogleUser: true,
            });
          }

          if (!user) return false;
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      await dbConnect();

      // Handle both credentials and google provider
      if (account?.provider === "google" && profile) {
        const dbUser = await UserModel.findOne({ email: profile.email });
        if (dbUser) {
          token._id = dbUser._id?.toString();
          token.username = dbUser.username;
          token.isVerified = dbUser.isVerified;
          token.isAcceptingMessage = dbUser.isAcceptingMessage;
        }
      } else if (user) {
        // For credentials provider
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          username: token.username,
          isVerified: token.isVerified,
          isAcceptingMessage: token.isAcceptingMessage,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
