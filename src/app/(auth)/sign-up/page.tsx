"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Loader2} from 'lucide-react'


const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isvalid, setIsValid] = useState(true)
  const [email, setEmail] = useState("")
  const [buttonNotDisable, setButtonNotDisable] = useState(true)
  const [display, setDisplay] = useState<boolean>(false)
  const router = useRouter();

  const debounced = useDebounceCallback(setUsername, 300); // not want to call api on every keystroke(onKeyDown)

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkValidation = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (email.length === 0) {
        setIsValid(true);
      } else if (emailRegex.test(email)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    checkValidation()
  }, [email])
  

  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const res = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          console.log(res);
          setUsernameMessage(res?.data.message);
        } catch (error) {
          console.log(error);
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUniqueUsername()
  }, [username]);

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data
  ) => {
    if (buttonNotDisable) {
      setButtonNotDisable(false)
      setIsSubmitting(true);
  
      const signupPromise = axios.post<ApiResponse>("/api/signup", data);
  
      toast.promise(signupPromise, {
        loading: "Creating your account...",
        success: (res) => res.data.message || "Signup successful!",
        error: (err: AxiosError<ApiResponse>) =>
          err.response?.data.message || "Signup failed. Try again.",
      });
  
      try {
        const response = await signupPromise;
        // console.log(response)
        if(response.data.success){
          router.replace(`/verify/${username}`)
        }
      } catch (error) {
        // error already handled by toast
        console.error("Error in signup of user: ", error)
      } finally {
        setIsSubmitting(false);
        setButtonNotDisable(false)
      }
    }
  };

  useEffect(() => {
    if (!display) {
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="./anonymousLogo.png"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Team Developer
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Please preffer google login, visit sign in page.
                  OTP cannot be sent, because of free-tier.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))
      setDisplay(true)
    }
    }, [])
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                  {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" 
                     {...field} 
                     onChange={(e) => {
                      field.onChange(e)
                      setEmail(e.target.value)
                     }}/>
                  </FormControl>
                  {!isvalid && (<p className="text-sm text-red-500">Invalid email!</p>)}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <p className="text-sm text-gray-400">*password must have atleast 6 characters</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
        <div>
          <p>
            Already a member?{" "}
            <Link
              href={"/sign-in"}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
