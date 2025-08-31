"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Warming up the AI engines…",
  "Sketching the first strokes…",
  "Adding creative sparkles…",
  "Blending styles with magic…",
  "Polishing details…",
  "Almost done, hang tight!",
];

export function LoadingOverlay({ loading }: { loading: boolean }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // rotate messages every 2s
  useEffect(() => {
    if (!loading) return;
    const msgInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 500);
    return () => clearInterval(msgInterval);
  }, [loading]);

  // fake progress bar
  useEffect(() => {
    if (!loading) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p < 95 ? p + 2 : p)); // stop at 95% until complete
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-white">
      {/* Animated messages */}
      <div className="text-center mb-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-medium"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>
    </div>
  );
}
