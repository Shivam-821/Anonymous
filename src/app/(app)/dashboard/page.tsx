/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Message } from "@/model/user.model";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchmea";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw, User2Icon } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [image, setImage] = useState<string|null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [enableUpload, setEnableUpload] = useState(false)
  const router = useRouter()

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      if (typeof response.data.isAcceptingMessage === "boolean") {
        setValue("acceptMessages", response.data.isAcceptingMessage);
      } else {
        setValue("acceptMessages", false);
      }
      setImage(response.data.imageUrl || null)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error during fetching the accepting message state: ",
        error
      );
      toast("Failed to fetch message setting", {
        icon: "😞",
        style: {
          borderRadius: "10px",
          background: "#fb2c36",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);

      try {
        const response = await axios.get("/api/get-messages");
        // console.log(response.data.messages);
        setMessages(response?.data.messages || []);
        toast.success("Showing latest messages", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast(axiosError.response?.data.message || "Failed to load message", {
          icon: "😐",
          style: {
            borderRadius: "10px",
            background: "#fb2c36",
            color: "#fff",
          },
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  //handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error during fetching the accepting message state: ",
        error
      );
      toast("Failed to toggle the change", {
        icon: "😞",
        style: {
          borderRadius: "10px",
          background: "#fb2c36",
          color: "#fff",
        },
      });
    }
  };

  // image upload section
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const uploadImage = async () => {
    if (!image) {
      toast.error("No image selected");
      return;
    }

    if(!imageUploading && enableUpload){
      setEnableUpload(false)
      setImageUploading(true);
      const imagePromise = axios.post<ApiResponse>(
        "/api/upload-profile-image",
        { image }
      );

      toast.promise(
        imagePromise,
        {
          loading: "Uploading Image...",
          success: (res) => res.data.message || "Image Uploaded Successfully",
          error: (err: AxiosError<ApiResponse>) =>
            err.response?.data.message || "Error uploading image",
        },
        {
          style: {
            background: "#333",
            color: "#fff",
          },
        }
      );

      try {
        await imagePromise;
      } catch (error) {
        console.error(error);
      } finally {
        setImageUploading(false);
      }
    } else {
      return;
    }
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("url copied to clipboard", {
      style: {
        background: "#333",
        color: '#fff'
      },
    });
  };

  if (!session || !session.user) {
    return (
      <div className="w-screen min-h-screen p-6 bg-white relative">
        <div className="flex flex-col md:flex-row justify-between pr-14 pl-2">
          <div className="flex flex-col gap-3 rounded-lg">
            <div className="w-66 h-14 bg-gray-300/50 animate-pulse rounded-lg"></div>
            <div className="w-45 h-8 bg-gray-300/40 animate-pulse rounded-lg"></div>
            <div className="w-20 h-10 bg-gray-300/40 animate-pulse rounded-lg border-2 border-gray-300/60"></div>
          </div>
          <div className="w-28 h-28 rounded-full bg-gray-300/50 animate-pulse mr-3"></div>
        </div>
        <div className="mt-5 ">
          <div className="w-40 h-8 bg-gray-300/60 animate-pulse rounded-md px-5"></div>
          <div className="flex justify-between pr-2 items-center gap-3 mt-5">
            <div className="w-full h-10 py-1 bg-gray-300/40 rounded-lg animate-pulse"></div>
            <div className="w-15 h-7 bg-gray-300/40 animate-pulse rounded-lg"></div>
          </div>
          <div className="mt-5 flex gap-5 items-center">
            <div className="w-10 h-[21px] bg-gray-300/50 rounded-lg animate-pulse"></div>
            <div className="w-40 h-9 bg-gray-300/40 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full h-[1px] mt-5 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/send-message/${username}`;

  return (
    <div className="my-3 lg:my-1 p-7 pt-5 bg-white rounded w-full max-w-6xl">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row justify-between pt-3 gap-6">
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-bold mb-3">User Dashboard</h1>
          <h1 className="text-xl font-semibold">Username: {username}</h1>
          <button
            onClick={() => router.push(`/message-reply/${username}`)}
            className="p-1 mt-2 border-3 border-black rounded-lg hover:bg-black hover:text-white cursor-pointer">My Reply</button>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-500 rounded-full w-25 h-25 md:w-28 md:h-28 flex items-center justify-center text-white font-bold text-sm">
            {image !== null ? (
              <img
                src={image}
                alt="profile_picture"
                className="w-25 h-25 md:w-28 md:h-28 rounded-full"
                onClick={uploadImage}
              />
            ) : (
              <User2Icon
                onClick={uploadImage}
                className="w-25 h-25 md:w-28 md:h-28 rounded-full"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.size > MAX_FILE_SIZE) {
                toast.error("Image size is larger than 2MB");
                return;
              }

              const reader = new FileReader();
              reader.onloadend = () => {
                const base64Image = reader.result as string;
                setImage(base64Image);
              };
              reader.readAsDataURL(file);
              setEnableUpload(true)
            }}
            className="text-sm mt-1 file:bg-slate-600 file:text-white file:px-3 file:rounded file:border-none bg-amber-50 text-center hover:file:bg-slate-800"
          />
          <h3 className="text-sm text-slate-400">
            *click on image to upload it
          </h3>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 border-1 border-slate-300 rounded-md"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Message: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-col-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, inx) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
              onRepliedUpdate={fetchMessages}
            />
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
