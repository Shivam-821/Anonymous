/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { singInSchema } from "@/schemas/signinSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonNotDisable, setButtonNotDisable] = useState(true);
  const router = useRouter();
  let display: boolean = false;

  const form = useForm<z.infer<typeof singInSchema>>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof singInSchema>> = async (
    data
  ) => {
    if (buttonNotDisable) {
      setButtonNotDisable(false);
      setIsSubmitting(true);

      const signinPromise = signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      toast.promise(signinPromise, {
        loading: "Signing In...",
        success: "Signin successful",
        error: "Signin failed. Try again.",
      });

      try {
        const result = await signinPromise;

        if (result?.ok) {
          router.replace("/dashboard");
        } else {
          toast.error(result?.error || "Invalid credentials");
        }
      } catch (error) {
        console.error("Error during signin: ", error);
        toast.error("Something went wrong.");
      } finally {
        setIsSubmitting(false);
        setButtonNotDisable(true);
      }
    }
  };

  useEffect(() => {
    if(!display){
      toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
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
            Please preffer google login!
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
      display = true;
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Join Mystery Message
          </h1>
          <p className="text-gray-600 mb-6">
            Sign in to start your anonymous adventure
          </p>
        </div>

        {/* Sign In Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your username or email" {...field} />
                  </FormControl>
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
                    <Input
                      type="password"
                      placeholder="your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Sign In Button */}
        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </Button>

        {/* Footer */}
        <div className="text-sm text-center mt-4">
          <p>
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
