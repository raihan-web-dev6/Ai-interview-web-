"use client";

import { motion } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";

export default function LoadingInterview() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl border border-slate-200">

        <div className="flex items-center gap-3">

          <Brain
            size={40}
            className="text-blue-600"
          />

          <div>

            <h1 className="text-3xl font-bold">
              Preparing Your Interview
            </h1>

            <p className="text-slate-500 mt-1">
              AI is creating personalized questions...
            </p>

          </div>

        </div>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            Resume Uploaded
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            Resume Parsed
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent"
            />

            AI Reading Resume
          </div>

        </div>

        <div className="mt-10">

          <div className="h-4 overflow-hidden rounded-full bg-slate-200">

            <motion.div
              animate={{
                width: [
                  "10%",
                  "35%",
                  "60%",
                  "85%",
                  "100%",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="h-full rounded-full bg-blue-600"
            />

          </div>

          <p className="mt-5 text-center text-slate-500">
            Usually takes 10–20 seconds.
          </p>

        </div>

      </div>

    </div>
  );
}