"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Sparkles,
} from "lucide-react";

function StartInterviewCard() {const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/dashboard");
      setDashboard(res.data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  fetchDashboard();
}, []);
 {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
    >
      <div className="grid lg:grid-cols-2">
        {/* Left */}
        <div className="p-6 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Sparkles size={16} />
            AI Interview Practice
          </div>

          <h2 className="mt-6 text-3xl lg:text-4xl font-bold text-slate-900">
            Start a New Interview
          </h2>

          <p className="mt-5 max-w-xl leading-8 text-slate-600">
            Generate personalized interview questions based on your resume
            and target job description. Practice with AI in a realistic
            interview environment and receive detailed feedback after every
            session.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <BrainCircuit
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  AI Generated
                </p>

                <h4 className="font-semibold text-slate-900">
                  Smart Questions
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div className="rounded-xl bg-green-100 p-3">
                <Clock3
                  size={24}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Duration
                </p>

                <h4 className="font-semibold text-slate-900">
                  20–30 Minutes
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-10 text-white">
          <p className="text-lg text-blue-100">
            Today's Remaining
          </p>

          <h1 className="mt-2 text-5xl lg:text-7xl font-bold">
  {dashboard?.remainingToday ?? 3}
</h1>

          <p className="mt-3 text-blue-100">
  {dashboard?.interviewsUsed ?? 0} of <strong>3</strong> interviews used today.
</p>
<div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">

  <div
    className="h-full rounded-full bg-cyan-300 transition-all duration-500"
    style={{
      width: `${((dashboard?.interviewsUsed ?? 0) / 3) * 100}%`,
    }}
  />

</div>

<p className="mt-3 text-sm text-blue-100">
  Remaining Today:
  <span className="font-bold text-white">
    {" "}
    {dashboard?.remainingToday ?? 3}
  </span>
</p>

          {dashboard?.remainingToday > 0 ? (
  <Link
    href="/interview-process"
    className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-1"
  >
    Start Interview
    <ArrowRight size={20} />
  </Link>
) : (
  <button
    disabled
    className="mt-8 inline-flex cursor-not-allowed items-center rounded-2xl bg-gray-300 px-6 py-4 font-semibold text-gray-600"
  >
    Daily Limit Reached
  </button>
)}

          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm leading-7 text-blue-100">
  🎯 <span className="font-semibold text-white">Free Plan</span>
  <br />
  You receive <span className="font-semibold text-white">3 AI interviews</span>{" "}
  every 24 hours.
  <br />
  Your interview limit resets automatically every day.
</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}}

export default StartInterviewCard