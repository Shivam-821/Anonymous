/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const CARDS = [
  {
    id: 1,
    name: "No Judgement",
    designation: "Speak Freely",
    content: (
      <p>
        Share your thoughts openly — <strong>no names, no fear</strong>.
      </p>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    color: "bg-indigo-100 dark:bg-neutral-900",
  },
  {
    id: 2,
    name: "Total Privacy",
    designation: "Zero Tracking",
    content: <p>We don&apos;t store who you are — just your words.</p>,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    color: "bg-emerald-100 dark:bg-neutral-900",
  },
  {
    id: 3,
    name: "Raw Honesty",
    designation: "Real Connection",
    content: (
      <p>
        When identity fades, <strong>truth comes alive</strong>.
      </p>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: "bg-amber-100 dark:bg-neutral-900",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    content:
      "This platform gave me the courage to share things I've never told anyone.",
    author: "Anonymous User",
  },
  {
    id: 2,
    content:
      "Finally a place where I can be completely honest without worrying about consequences.",
    author: "Anonymous User",
  },
  {
    id: 3,
    content: "The messages I received helped me understand myself better.",
    author: "Anonymous User",
  },
];

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession();
  const [isDashboardOptionOpen, setIsDashboardOptionOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true);

    // Cleanup extension attributes
    const cleanup = () => {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });
    };


    const timer = setTimeout(() => {
      cleanup();
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  if (!isMounted) {
    return (
      <main className="min-h-screen bg-slate-100 dark:bg-black">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-black text-gray-900 dark:text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-indigo-400 dark:to-purple-400"
          >
            Where Your Secrets Find a Safe Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-10"
          >
            No names. No judgement. Just you, your thoughts — and a community
            ready to listen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {session ? (
              <>
                <div
                  onClick={() => setIsDashboardOptionOpen((prev) => !prev)}
                  className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform relative cursor-pointer"
                >
                  <div>My Own</div>
                  {isDashboardOptionOpen && (
                    <div className="absolute z-10 top-14 left-0 bg-slate-300 rounded-xl text-slate-900 flex flex-col w-[190px]">
                      <Link
                        href="/dashboard"
                        className="hover:bg-slate-400 p-2 rounded-t-xl"
                      >
                        Go to Dashboard
                      </Link>
                      <Link
                        href={`/message-reply/${session?.user.username}`}
                        className="hover:bg-slate-400 p-2 rounded-b-xl"
                      >
                        My Reply
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/users"
                  className="inline-block bg-gray-800 hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Browse Members
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/users"
                  className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Explore Members
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-block bg-gray-800 hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Join Now
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              100%
            </div>
            <div className="text-gray-500 dark:text-gray-400">Safe</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              5K+
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Messages Shared
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              100%
            </div>
            <div className="text-gray-500 dark:text-gray-400">Anonymous</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
              24/7
            </div>
            <div className="text-gray-500 dark:text-gray-400">Thoughts</div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;ve built a space where you can express yourself without any
            barriers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${card.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-neutral-700`}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 mb-6 text-indigo-600 dark:text-indigo-400">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                {card.designation}
              </p>
              <div className="text-gray-700 dark:text-gray-300">
                {card.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting started is simple and completely anonymous
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up with just a username - no personal details required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Connect With Others</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through members and find people you&apos;d like to send
                anonymous messages to.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Share & Receive</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Send your thoughts and receive anonymous messages in return. All
                completely private.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What People Are Saying
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our community of anonymous users
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
              >
                <div className="text-gray-600 dark:text-gray-300 italic mb-6">
                  {testimonial.content}
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium">
                  — {testimonial.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show if user is not logged in */}
      {!session && (
        <section className="w-full bg-gradient-to-r from-gray-600 to-slate-500 text-white py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to be part of something honest?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto"
            >
              Join thousands who have found freedom in anonymous expression.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isMounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/sign-up"
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Sign Up Now - It&apos;s Free
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
