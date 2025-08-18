import UserModel from '@/model/user.model';
import { dbConnect } from "@/lib/dbConfig";
import { Message } from '@/model/user.model';


export async function POST(request: Request){
    await dbConnect()

    const {username, content} = await request.json()
    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json(
              {
                success: false,
                message: `User not found`,
              },
              { status: 404 }
            );
        }

        // Is user accepting the message or not.
        if(!user.isAcceptingMessage){
            return Response.json(
              {
                success: false,
                message: `${username} is not accepting the messages`,
              },
              { status: 403 }
            );
        }

        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, {status: 200})
    } catch (error) {
        console.log("Error sending content to the required account: ", error)
        return Response.json({
            success: false,
            message: `Unable to send message to the ${username}`
        }, {status: 500})
    }
}