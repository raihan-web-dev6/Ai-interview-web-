"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 text-center">

      {/* Background Blur */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 rounded-3xl bg-blue-100 p-6 shadow-lg"
      >
        <Bot size={60} className="text-blue-600" />
      </motion.div>

      {/* 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-extrabold tracking-tight text-blue-600 md:text-9xl"
      >
        404
      </motion.h1>

      {/* Heading */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-5 text-3xl font-bold text-slate-900"
      >
        Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3 max-w-md text-slate-500"
      >
        The page you're looking for doesn't exist or may have been moved.
        Let's get you back to your AI interview journey.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
     
<Link href="/">
  <button
    className=" mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
  >
    <ArrowLeft size={18} />
    Back to Home
  </button>
</Link>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 flex gap-6 text-blue-600"
      >
        <Bot size={34} />
        <Bot size={44} />
        <Bot size={34} />
      </motion.div>
    </div>
  );
}