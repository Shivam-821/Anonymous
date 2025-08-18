/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: string;
    username: string;
    image?: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const router = useRouter()

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.username}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.username}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {item.image ? (
            <img
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              onClick={() => router.replace(`/send-message/${item.username}`)}
              src={item.image}
              alt={"/userIcon.jpg"}
              className="relative m-4 h-14 w-14 rounded-full border-2 border-gray-400 object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          ) : (
            <img
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              onClick={() => router.replace(`/send-message/${item.username}`)}
              src={"/userIcon.jpg"}
              alt={"profile_image"}
              className="relative m-4 h-14 w-14 rounded-full border-2 border-gray-400 object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          )}
        </div>
      ))}
    </>
  );
};
