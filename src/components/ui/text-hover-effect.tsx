"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100"
      viewBox="0 0 1000 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none ${className ?? ""}`}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        {/* Vibrant gradient colors that show up on light backgrounds */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ff7f50" />
              <stop offset="25%" stopColor="#ff4b91" />
              <stop offset="50%" stopColor="#6c5ce7" />
              <stop offset="75%" stopColor="#00b894" />
              <stop offset="100%" stopColor="#0984e3" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="35%" // Enlarged for more visibility
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0.4, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Faint stroke underneath, shown on hover */}
      <text
        x="0"
        y="70"
        strokeWidth="1"
        className="fill-transparent stroke-gray-400 font-[helvetica] text-[64px] font-bold dark:stroke-gray-700"
        style={{ opacity: hovered ? 0 : 0 }}
      >
        {text}
      </text>

      {/* Black outline draw animation */}
      <motion.text
        x="0"
        y="70"
        strokeWidth="1"
        className="fill-transparent stroke-black hover:stroke-neutral-400 font-[helvetica] text-[65px] font-bold dark:stroke-white"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Gradient stroke with mask reveal */}
      <text
        x="0"
        y="70"
        stroke="url(#textGradient)"
        strokeWidth="1.2"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-[64px] font-bold drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]"
      >
        {text}
      </text>
    </svg>
  );
};
