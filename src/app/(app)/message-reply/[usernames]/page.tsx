"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Message } from "@/model/user.model";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function MessageReplyPage() {
  const { usernames } = useParams<{ usernames: string }>();
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [owner, setOwner] = useState<boolean>(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  const loggedInUsername = session?.user?.username;

  useEffect(() => {
    if (loggedInUsername && loggedInUsername === usernames) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [loggedInUsername, usernames]);
  
  useEffect(() => {
    const getAllMessage = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `/api/user/${usernames}/messages?page=${page}&limit=5`
        );

        setAllMessages(response.data?.messages || []);
        setTotalPages(response.data?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    if (usernames) getAllMessage();
  }, [usernames, page]);

  if (status === "loading") {
    return (
      <p className="w-full min-h-screen flex justify-center">Loading...</p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-2 px-8 pt-3">
      <h2 className="text-2xl md:text-4xl font-bold">
        All Anonymous Messages and Replies
      </h2>

      <div className="flex justify-between">
        <p className="text-md md:text-lg font-semibold">
          Owner:{" "}
          <span className="text-xl md:text-xl text-semibold">{usernames}</span>
        </p>

        {!owner && (
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-0">
            <p>To Send Message:</p>
            <button
              onClick={() => router.push(`/send-message/${usernames}`)}
              className="bg-gray-700 text-white p-2 px-3 hover:bg-gray-950 rounded-md text-sm"
            >
              Click here
            </button>
          </div>
        )}
      </div>

      {allMessages.length > 0 ? (
        <>
          {allMessages.map((msg, index) => (
            <Card
              key={msg._id?.toString() ?? `msg-${index}`}
              className="hover:bg-yellow-50 mt-2"
            >
              <CardContent>
                <p>📩 {msg.content}</p>
                {msg.reply ? (
                  <p className="text-green-600 font-medium mt-2">
                    💬 {msg.reply}
                  </p>
                ) : (
                  <p className="text-gray-500 mt-2 italic">
                    ⏳ No reply yet...
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <TextHoverEffect
          text="No Messages To Display"
          className="w-full h-full"
        />
      )}
    </div>
  );
}

export default MessageReplyPage;
