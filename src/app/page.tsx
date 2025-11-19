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
  const dropdownRef = React.useRef(null);


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
      <main className="min-h-screen bg-slate-100 dark:bg-black flex flex-col items-center py-22">
        <div className="flex flex-col gap-8">
          <div className="w-140 h-18 bg-gray-300/50 animate-pulse rounded-md"></div>
          <div className="ml-17 w-100 h-8 bg-gray-300/40 animate-pulse rounded-md"></div>
        </div>
        <div className="flex gap-3 mt-15">
          <div className="w-30 h-14 animate-pulse rounded-3xl bg-gray-300/40"></div>
          <div className="w-50 h-14 animate-pulse rounded-3xl bg-gray-300/40"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-black text-gray-900 dark:text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 blur-[120px] animate-ping"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-indigo-300 dark:to-purple-300 drop-shadow-sm"
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

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {session ? (
              <>
                <div
                  onClick={() => setIsDashboardOptionOpen((prev) => !prev)}
                  className="relative inline-block bg-slate-700/90 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform backdrop-blur-md shadow-lg cursor-pointer"
                >
                  <span>My Own</span>

                  {isDashboardOptionOpen && (
                    <div className="absolute z-10 top-5 -left-50 bg-slate-200 dark:bg-neutral-700 rounded-xl shadow-xl text-slate-900 dark:text-white flex flex-col w-[200px] overflow-hidden backdrop-blur-md">
                      <Link
                        href="/dashboard"
                        className="hover:bg-slate-300 dark:hover:bg-neutral-600 p-3 transition-all"
                      >
                        Go to Dashboard
                      </Link>
                      <Link
                        href={`/message-reply/${session?.user.username}`}
                        className="hover:bg-slate-300 dark:hover:bg-neutral-600 p-3 transition-all"
                      >
                        My Reply
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/users"
                  className="inline-block bg-gray-900 hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform backdrop-blur-md shadow-lg"
                >
                  Browse Members
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/users"
                  className="inline-block bg-slate-700/90 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform backdrop-blur-md shadow-lg"
                >
                  Explore Members
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-block bg-gray-900 hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform backdrop-blur-md shadow-lg"
                >
                  Join Now
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* FLOATING ANIMATION KEYFRAMES */}
        <style>{`
    @keyframes float-slow {
      0% { transform: translateY(0) translateX(0); opacity: 0.6; }
      50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
      100% { transform: translateY(0) translateX(0); opacity: 0.6; }
    }
    .animate-float-slow {
      animation: float-slow linear infinite;
    }
  `}</style>
      </section>

      {/* Values Section (Replaces Stats Section) */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Safe Space", desc: "Built for honest expression." },
            {
              title: "Anonymous by Design",
              desc: "Your identity stays yours.",
            },
            { title: "Community Driven", desc: "People supporting people." },
            { title: "Always Open", desc: "Share anytime, anywhere." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center p-6 rounded-xl shadow bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {item.title}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </div>
            </motion.div>
          ))}
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
              className={`relative overflow-hidden group ${card.color} p-8 rounded-3xl shadow-md border border-gray-200 dark:border-neutral-700 transition-all duration-300 
      hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-300 dark:hover:border-indigo-600`}
            >
              {/* Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-300 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl"></div>

              {/* Icon Wrapper */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl 
      bg-white dark:bg-neutral-800 shadow-sm group-hover:shadow-md transition-all duration-300 
      mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110"
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                {card.name}
              </h3>

              {/* Subtext */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                {card.designation}
              </p>

              {/* Content */}
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition">
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
              Getting started is simple — and you can send messages without even
              signing in.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Block 1 */}
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
                Sign up with your Google Account, or your email and username to
                receive message
              </p>
            </motion.div>

            {/* Block 2 */}
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
                Browse through members and find people you'd like to send
                messages anonymously.
              </p>
            </motion.div>

            {/* Block 3 */}
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
                Send your thoughts and receive messages in return. All sender
                identity will remain private.
              </p>
            </motion.div>

            {/* Block 4 - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">
                Send Without an Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To send anonymous messages, you don’t need to sign in or create
                an account — just type and send.
              </p>
            </motion.div>

            {/* Block 5 - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                5
              </div>
              <h3 className="text-xl font-bold mb-3">Stay Fully Anonymous</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We never store the sender's identity. Your privacy and anonymity
                are always protected.
              </p>
            </motion.div>

            {/* Block 6 - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-neutral-700"
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                6
              </div>
              <h3 className="text-xl font-bold mb-3">Interact Safely</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Report inappropriate messages anytime. We ensure a safe,
                respectful, and positive environment.
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
