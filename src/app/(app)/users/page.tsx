"use client";

import React, { useEffect, useState } from "react";
import { CardStack } from "@/components/ui/card-stack";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import axios from "axios";
import { Message } from "@/model/user.model";
import { ApiResponse } from "@/types/ApiResponse";
import { User_Username } from "@/app/api/all-users/route";
import { useRouter } from "next/navigation";
import { LoaderIcon, MessageSquare, Ghost } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; 

const CARDS = [
  {
    id: 0,
    name: "Safe Space Bot",
    designation: "Guardian of Anonymity",
    content: (
      <p>
        Speak freely. <strong>No names. No judgment.</strong> Just a space where
        your words are heard and your identity stays yours.
      </p>
    ),
  },
  {
    id: 1,
    name: "Whispering Soul",
    designation: "Seeker of Silence",
    content: (
      <p>
        Some thoughts are too raw to share aloud.{" "}
        <strong>Here, you can whisper without fear</strong> — and still be
        heard.
      </p>
    ),
  },
  {
    id: 2,
    name: "Echo",
    designation: "Reflection of You",
    content: (
      <p>
        This is where <strong>unspoken thoughts find a voice</strong>. No
        labels, no looks — just honest echoes.
      </p>
    ),
  },
  {
    id: 3,
    name: "Pixel Guardian",
    designation: "Privacy Engineer",
    content: (
      <p>
        No tracking. No identity. Just a platform{" "}
        <strong>built to protect your words</strong>, not expose them.
      </p>
    ),
  },
  {
    id: 4,
    name: "Open Heart",
    designation: "User #0042",
    content: (
      <p>
        I shared something I never could say out loud.{" "}
        <strong>This place felt safe — like being understood in silence</strong>
        .
      </p>
    ),
  },
  {
    id: 5,
    name: "Unfiltered Poet",
    designation: "Serial Overthinker",
    content: (
      <p>
        I say little in life, but here,{" "}
        <strong>every silent thought becomes a story</strong>. No faces, no
        filters — just truth.
      </p>
    ),
  },
];

const testimonials = [
  {
    quote:
      "I came here not knowing what to expect, but the way this platform connects people anonymously is nothing short of revolutionary. I could finally express myself without fear, and the responses felt genuine and empathetic. It's not just a feature — it's a necessity in today’s world where safe spaces are rare.",
    name: "Anonymous User",
    title: "Student, 21",
  },
  {
    quote:
      "Being anonymous allowed me to share things I never had the courage to say aloud. It’s surprising how freeing it feels. I hope this platform continues to grow and becomes a safe space for many more like me who just need to be heard without judgment.",
    name: "Anonymous Contributor",
    title: "Mental Health Advocate",
  },
  {
    quote:
      "This platform embodies the future of digital communication — where authenticity thrives without the constraints of identity. It’s a powerful experiment in vulnerability and empathy. I expect the next evolution to include guided peer support, but as it stands now, it’s already changing lives.",
    name: "Dr. Nivia Pearson",
    title: "Clinical Psychologist & Author",
  },
  {
    quote:
      "As a first-time user, I found the interface clean, the anonymity strict, and the community shockingly kind. I expected trolls — what I found instead was validation, insight, and even a bit of healing. My hope is that it never loses this essence as it scales.",
    name: "Anonymous Feedback",
    title: "First-Time User",
  },
  {
    quote:
      "In an age of surveillance and curated online personas, this platform gives back what we’ve lost: honesty without consequence. The stories I’ve read here are raw, beautiful, and often heartbreaking. It proves that when people are freed from identity, their truth shines through.",
    name: "Kavi Subramanian",
    title: "Best-selling Author & Tech Thinker",
  },
];

function UserPage() {
  const [randomMessages, setRandomMessage] = useState<Message[]>([]);
  const [limitedUser, setLimitedUser] = useState<User_Username[]>([]);
  const [allUsers, setAllUsers] = useState<Array<{ username: string }>>([]);
  const [filteredUser, setFilteredUser] = useState<Array<{ username: string }>>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsMessagesLoading(true);

        const [messagesResponse, usersResponse] = await axios.all([
          axios.get<ApiResponse>("/api/random-messages"),
          axios.get<ApiResponse>("/api/all-users"),
        ]);

        setRandomMessage(messagesResponse?.data.messages || []);
        setLimitedUser(usersResponse.data.users || []);
        setAllUsers(usersResponse.data.allUsers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsMessagesLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterUser = (query: string) => {
    if (query === "") {
      setFilteredUser([]);
      return;
    }
    const filtered = allUsers.filter((oneUser) =>
      oneUser.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUser(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex text-black justify-center gap-5">
        <div className="w-60 h-60 md:w-80 bg-gray-300/40 rounded-xl animate-pulse mt-50 border-t-8 border-gray-300/60"></div>
        <div className="h-[550px] w-[680px] bg-gray-300/50 rounded-xl animate-pulse mt-5">
          <div className="w-[600px] h-[150px] bg-gray-300/80 rounded-xl animate-pulse m-10"></div>
          <div className="w-[600px] h-[150px] bg-gray-300/80 rounded-xl animate-pulse m-10"></div>
          <div className="w-[600px] h-[150px] bg-gray-300/80 rounded-xl animate-pulse m-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100 dark:bg-black text-gray-800 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              EXPLORE OUR SPECIAL GANG MEMBERS
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              * You can send them anonymous messages
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col relative">
            <input
              type="text"
              className="border border-gray-400 w-full rounded-md px-3 py-2"
              placeholder="Search user 🔍︎"
              onChange={(e) => filterUser(e.target.value)}
            />
            {filteredUser.length > 0 && (
              <div
                className={`pl-5 py-2 pr-8 absolute z-10 top-11 shadow-lg shadow-slate-300 rounded-xl bg-gray-300`}
              >
                {filteredUser.map((user, inx) => (
                  <div
                    key={inx}
                    onClick={() =>
                      router.push(`/message-reply/${user.username}`)
                    }
                    className="border-b-1 border-gray-500 pr-10 pl-2 py-1 mb-1 rounded-md cursor-pointer hover:bg-gray-400 hover:scale-105"
                  >
                    {user?.username}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 gap-3 mt-6">
          {/* Card Stack */}
          <div className="row-span-2 flex py-1 justify-center md:justify-start items-center">
            <CardStack items={CARDS} />
          </div>

          {/* Random Messages */}
          <div className="col-span-1 lg:col-span-2 row-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-neutral-900 overflow-y-auto h-[500px] scroll-smooth relative">
            <h2 className="text-xl font-semibold mb-4">Anonymous Thoughts</h2>

            {isMessagesLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoaderIcon className="h-8 w-8 animate-spin" />
              </div>
            ) : randomMessages.length > 0 ? (
              <div className="space-y-4">
                {randomMessages.map((mess, indx) => (
                  <div
                    key={(mess._id as string) || indx}
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-sm">{mess.content}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Reply:{" "}
                      {mess.reply || (
                        <span className="text-gray-500 text-xl">
                          <LoaderIcon className="h-4 w-4 animate-spin inline" />
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(mess.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="h-12 w-12 mb-4" />
                <p>No anonymous thoughts yet</p>
                <p className="text-sm mt-2">Be the first to share something</p>
              </div>
            )}
          </div>

          {/* Tooltip Section */}
          <div className="rounded-lg col-span-1 lg:col-span-3 p-0 h-auto">
            <p className="text-2xl font-semibold">
              Our Users Whom you can send message anonymously
            </p>
            <div className="flex justify-center items-center p-5">
              {limitedUser.length > 0 ? (
                <AnimatedTooltip items={limitedUser} />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Ghost className="h-12 w-12 mb-4" />
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>

          {/* Infinite Moving Cards */}
          <div className="rounded-lg col-span-1 lg:col-span-3 py-4">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
