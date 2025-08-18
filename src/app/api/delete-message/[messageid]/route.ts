import { dbConnect } from "@/lib/dbConfig";
import { getServerSession, User } from "next-auth";
import UserModel from "@/model/user.model";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request, {params}: {params: Promise<{messageid: string}>}){
    const messageId = await params;
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Unauthorized",
        }, {status: 401})
    }

    try {
        const updatedResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        if(updatedResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "Message not found or already deleted"
            }, {status: 404})
        }

        return Response.json({
            success: true,
            message: "Message Deleted"
        }, {status: 201})
    } catch (error) {
        console.log("Error in deleting message route: ", error)
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, {status: 500})
    }

}