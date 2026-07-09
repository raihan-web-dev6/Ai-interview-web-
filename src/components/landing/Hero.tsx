"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-40 pb-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-15 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700"
        >
          🤖 AI Powered Smart Interview Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl"
        >
          Ace Your Next
          <br />
          Technical Interview with
          <span className="text-blue-600"> AI Intelligence</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-slate-600"
        >
          Practice real technical interviews with AI-generated questions,
          voice conversations, instant feedback, resume analysis, and detailed
          performance reports—all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Start Free Interview
            <ArrowRight size={18} />
          </Link>

          <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 shadow transition hover:border-blue-600 hover:text-blue-600">
            <PlayCircle size={20} />
            Learn How to Use
          </button>
        </motion.div>


      </div>
    </section>
  );
}

export default Hero;