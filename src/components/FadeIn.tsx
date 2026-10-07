"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  className?: string;
  duration?: number;
  threshold?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 800,
}: FadeInProps) {
  const delaySec = delay > 5 ? delay / 1000 : delay;
  const durationSec = duration > 10 ? duration / 1000 : duration;

  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40, scale: 1 };
      case "down":
        return { opacity: 0, y: -40, scale: 1 };
      case "left":
        return { opacity: 0, x: 40, scale: 1 };
      case "right":
        return { opacity: 0, x: -40, scale: 1 };
      case "scale":
        return { opacity: 0, y: 0, scale: 0.94 };
      case "none":
      default:
        return { opacity: 0, y: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: durationSec,
        delay: delaySec,
        ease: [0.16, 1, 0.3, 1], // Apple fluid easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
