"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function WelcomeCard() {
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(" ")[0] || "Developer";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl"
    >
      {/* Background Blur */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles size={16} />
            AI Interview Practice
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight lg:text-5xl">
            Welcome back,
            <br />
            <span className="text-cyan-300">{firstName} 👋</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Practice realistic technical interviews, receive instant AI
            feedback, improve your confidence, and track your progress over
            time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div
              
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-1"
            >
              Click the down Start buttton to start New Interview
              <ArrowRight size={18} />
            </div>

            <Link
              href="/history"
              className="inline-flex items-center rounded-2xl border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <div className="flex h-36 w-36 lg:h-48 lg:w-48 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
            <div className="flex h-28 w-28 lg:h-36 lg:w-36  items-center justify-center rounded-full bg-white text-blue-600 shadow-2xl">
              <BrainCircuit size={70} />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default WelcomeCard;


