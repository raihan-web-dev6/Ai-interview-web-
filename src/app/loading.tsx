"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            InterviewAI
          </h1>

          <p className="mt-2 text-slate-500">
            Preparing your interview experience...
          </p>
        </div>
      </div>
    </main>
  );
}