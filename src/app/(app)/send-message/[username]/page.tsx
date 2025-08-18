"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Separator } from "@/components/ui/separator";
import { useDebounceCallback } from "usehooks-ts";

function Messageage() {
  const params = useParams<{ username: string }>();
  console.log(params);
  const [sending, setSending] = useState(false);
  const [writtenContent, setWrittenContent] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const debounced = useDebounceCallback(setWrittenContent, 4000)
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSend: SubmitHandler<z.infer<typeof messageSchema>> = async (data) => {
    setSending(true);
    const sendPromise = axios.post<ApiResponse>("/api/send-message", {
      username: params.username, content: data.content
    });
    toast.promise(sendPromise, {
      loading: "Sending message...",
      success: "Message Sent successfully",
      error: (err: AxiosError<ApiResponse>) =>
        err.response?.data.message || "Unable to send message.",
    });

    try {
      const response = await sendPromise;
      if (response?.data.success) {
      }
    } catch (error) {
      console.log("Error sending message: ", error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.post("/api/suggest-messages", {
          userInput: writtenContent,
        });

        if (writtenContent.trim() === "") {
          const parsed = response.data.text?.split("||") || [];
          setSuggestions(parsed);
        } else {
          const parsed = response.data.text?.split("||") || [];
          setSuggestions(parsed);
        }
      } catch (error) {
        console.error("Error parsing suggestion response:", error);
      }
    };

    fetchSuggestions();
  }, [writtenContent]);
  
  return (
    <div className="min-h-screen bg-gray-50 pointer-events-auto p-6">
      <Toaster />
      <div className="p-2 w-[340px] sm:w-[580px] md:w-[750px] lg:w-[900px]">
        <TextHoverEffect
          text="Send Anonymous Message"
          className="w-full h-full"
        />
        <p className="text-sm text-gray-600">
          *Don’t send any message which violates our terms and condition. About
          Terms and Condition:{" "}
          <Link className="underline cursor-pointer" href={"/terms-condition"}>
            click here
          </Link>
        </p>
      </div>
      <hr />
      <div className="mt-4 p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSend)} className="space-y-6">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Write Message to:{" "}
                    {
                      <span className="font-semibold text-lg">
                        {params.username}
                      </span>
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-[60px]"
                      placeholder="write your desired message"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-3">
        <h2 className="font-semibold text-lg font-serif bg-clip-text bg-gradient-to-bl from-gray-600 to-white">
          Suggested Messages
        </h2>
        <Separator />
        <div className="mt-2 flex flex-col gap-2">
          {suggestions.map((msg, idx) => (
            <button
              key={idx}
              className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              onClick={() => {
                form.setValue("content", msg);
                setWrittenContent(msg);
              }}
            >
              {msg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messageage;
