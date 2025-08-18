"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { X, MailQuestionIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/user.model";
import toast from "react-hot-toast";
import { useState } from "react";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
  onRepliedUpdate: () => void
};

function MessageCard({
  message,
  onMessageDelete,
  onRepliedUpdate,
}: MessageCardProps) {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const [onOpen, setOnOpen] = useState(true);
  const [addingReply, setAddingReply] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      console.log(message._id);
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }

      onMessageDelete(message._id as string);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message as string);
      console.log(error);
    }
  };

  const handleReply = async () => {
    try {
      if (reply.trim() !== "") {
        setAddingReply(true);
        await axios.post(`/api/message-reply/${message._id}`, {
          reply,
        });
        setOnOpen(true);
        setOpen(false);
        onRepliedUpdate();
        setReply("")
      } else {
        toast.error("Cannot add empty reply");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingReply(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle className="text-lg">Anonymous Message</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-red-500 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground relative">
          <MailQuestionIcon className="w-4 h-4" />
          <p className="text-black">{message.content}</p>
          {message.reply !== "" && (
            <p className=" text-right text-cyan-700 mt-0 mr-3 absolute top-15 right-2">
              ✓ Replied
            </p>
          )}
        </div>
      </CardContent>
      {onOpen && (
        <Button
          onClick={() => {
            setOpen(true);
            setOnOpen(false);
          }}
          className="border-2 border-black w-18 ml-5"
        >
          Reply
        </Button>
      )}

      {open && (
        <div className="z-10 shadow-xl w-70 p-5 rounded-lg shadow-gray-400 ml-3 border-1 border-blue-200 relative">
          <p>
            <X
              onClick={() => {
                setOnOpen(true);
                setOpen(false);
              }}
              className="absolute right-1 top-2 text-gray-500"
            />
          </p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="block p-1 border-1 border-gray-200 mb-2 w-55"
          />
          <Button onClick={handleReply} disabled={addingReply}>
            {addingReply ? "Processing..." : "Add Reply"}
          </Button>
        </div>
      )}
    </Card>
  );
}

export default MessageCard;
