/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth'
import { dbConnect } from '@/lib/dbConfig';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';


export async function POST(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User =  session?.user as User
    if(!user || !session){
        return  Response.json({
            success: false,
            message: "Not Authenticated"
        }, {status: 401})
    }

    const userId = user._id
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessage: acceptMessages }, {new: true});

        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, {status: 404}
            )
        } else {
            return Response.json(
              {
                success: true,
                message: "Messsage acceptance stauts updated successfully",
                updatedUser,
              },
              { status: 200 }
            );
        }
    } catch (error) {
        console.log("failed to update user status to accept messages", error)
        return Response.json({
            success: false,
            message: "failed to update user status to accept messages",
        }, {status: 500})
    }

}


export async function GET(request: Response){
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!user || !session) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId)
    
        if (!foundUser) {
          return Response.json(
            {
              success: false,
              message: "User Not Found",
            },
            { status: 404 }
          );
        }
    
        return Response.json(
          {
            success: true,
            isAcceptingMessage: foundUser.isAcceptingMessage,
            imageUrl: foundUser.image,
          },
          { status: 200 }
        );
    } catch (error) {
        console.log(
          "Error fetching user and getting info about isAcceptingMessage: ", error
        );
        return Response.json({
            success: false,
            message: "Error is getting message information"
        }, {status: 500})

    }

}