"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface SciFiHeadingProps {
  text?: string;
  lines?: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  showLaser?: boolean;
  showHudTag?: boolean;
  hudTag?: string;
  align?: "center" | "left" | "right";
  delay?: number;
  duration?: number;
  scrambleOnHover?: boolean;
  trigger?: boolean;
}

const CYBER_GLYPHS = "0101XYZ79#%&*<>/[]$+=$ΔΩΣΨ_~::0x";

export default function SciFiHeading({
  text,
  lines,
  as: Component = "h1",
  className = "",
  showLaser = true,
  showHudTag = false,
  hudTag = "SYS.SPEC // 2026",
  align = "center",
  delay = 150,
  duration = 900,
  scrambleOnHover = true,
  trigger,
}: SciFiHeadingProps) {
  const contentLines = lines || (text ? [text] : []);
  const fullText = contentLines.join(" ");

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const animRef = useRef<number | null>(null);

  const startAnimation = useCallback(
    (customDuration = duration) => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsComplete(true);
        setAnimProgress(1);
        return;
      }

      setIsAnimating(true);
      setIsComplete(false);
      setAnimProgress(0);
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / customDuration, 1);
        setAnimProgress(progress);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          setIsAnimating(false);
          setIsComplete(true);
        }
      };

      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(tick);
    },
    [duration]
  );

  useEffect(() => {
    const shouldStart = trigger !== undefined ? (trigger && isInView) : isInView;
    if (!shouldStart) return;

    const timer = setTimeout(() => {
      startAnimation();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isInView, trigger, fullText, delay, startAnimation]);

  const handleTrigger = () => {
    if (!scrambleOnHover || isAnimating) return;
    startAnimation(550);
  };

  const alignClasses =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  const laserAlign =
    align === "left"
      ? "mr-auto"
      : align === "right"
      ? "ml-auto"
      : "mx-auto";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay: delay > 10 ? (delay / 1000) * 0.5 : delay * 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex flex-col ${alignClasses} group cursor-pointer select-text`}
      onMouseEnter={handleTrigger}
      onClick={handleTrigger}
      aria-label={fullText}
    >
      {/* Sci-Fi HUD Metadata Tag with Corner Reticles */}
      {showHudTag && (
        <div className="relative inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-black/[0.03] border border-capelton-green/30 select-none shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-ping inline-block" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.22em] text-capelton-green font-semibold uppercase">
            {hudTag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-capelton-green/70 inline-block" />
        </div>
      )}

      {/* Main Heading Container */}
      <Component className={`${className} relative text-[#1d1d1f]`}>
        {contentLines.map((line, lineIdx) => {
          const totalChars = line.length;
          const resolvedCount = isComplete
            ? totalChars + 10
            : Math.floor(animProgress * (totalChars + 3));

          // Split line into words to preserve word boundaries and prevent mid-word layout wrapping shifts
          const words = line.split(" ");
          let runningCharIndex = 0;

          return (
            <span key={lineIdx} className="block leading-[1.08] relative">
              {words.map((word, wIdx) => {
                const wordElement = (
                  <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char) => {
                      const cIdx = runningCharIndex++;
                      const isResolved = isComplete || cIdx < resolvedCount;
                      const isSpark = !isComplete && cIdx >= resolvedCount && cIdx < resolvedCount + 3;

                      const sparkGlyph = isSpark
                        ? CYBER_GLYPHS[
                            (cIdx * 7 + Math.floor(animProgress * 50)) % CYBER_GLYPHS.length
                          ]
                        : char;

                      return (
                        <span key={cIdx} className="relative inline-block align-baseline">
                          {/* Invariant Ghost Anchor: Fixes 100% exact permanent width & height in Kanit */}
                          <span
                            className="opacity-0 select-none pointer-events-none"
                            aria-hidden="true"
                          >
                            {char}
                          </span>
                          {/* Floating Display Glyph: Absolute inset-0 guarantees 0 layout footprint */}
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 flex items-center justify-center select-none transition-colors duration-75 ${
                              isResolved
                                ? "text-[#1d1d1f]"
                                : isSpark
                                ? "text-capelton-green font-bold drop-shadow-[0_0_10px_rgba(0,177,64,0.95)]"
                                : "text-black/25"
                            }`}
                          >
                            {isResolved ? char : isSpark ? sparkGlyph : char}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                );

                // Account for the space between words in running char index
                const isLastWord = wIdx === words.length - 1;
                if (!isLastWord) {
                  runningCharIndex++;
                }

                return (
                  <React.Fragment key={wIdx}>
                    {wordElement}
                    {!isLastWord && " "}
                  </React.Fragment>
                );
              })}

              {/* Sci-Fi Blinking Cursor: Permanently mounted with opacity toggle to eliminate baseline and line-box shifts */}
              {lineIdx === contentLines.length - 1 && (
                <span
                  className={`inline-block relative w-0 h-0 overflow-visible align-middle transition-opacity duration-200 ${
                    isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-hidden="true"
                >
                  <span className="absolute left-1.5 -top-[0.55em] inline-block w-[0.3em] h-[0.75em] bg-capelton-green animate-pulse shadow-[0_0_14px_#00b140]" />
                </span>
              )}
            </span>
          );
        })}
      </Component>

      {/* Futuristic Sci-Fi Laser Scanline */}
      {showLaser && (
        <div
          className={`relative mt-5 h-[2px] w-full max-w-xl ${laserAlign} overflow-hidden pointer-events-none`}
        >
          {/* Base glow track */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-capelton-green/40 to-transparent" />

          {/* High-Velocity Traveling Photon Beam */}
          <div className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-[#00b140] to-transparent animate-laser-scan shadow-[0_0_16px_#00b140]" />

          {/* Central Calibrated Tech Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00b140] shadow-[0_0_10px_#00b140]" />
        </div>
      )}
    </motion.div>
  );
}
