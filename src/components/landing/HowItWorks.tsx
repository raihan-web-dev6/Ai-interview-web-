"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FileUp,
  BriefcaseBusiness,
  BrainCircuit,
  Mic,
  ChartColumnBig,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Upload Resume",
    description:
      "Upload your latest resume so AI can understand your skills and experience.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Description",
    description:
      "Paste the job description to generate role-specific interview questions.",
  },
  {
    icon: BrainCircuit,
    title: "AI Creates Interview",
    description:
      "Our AI prepares personalized technical and behavioral questions.",
  },
  {
    icon: Mic,
    title: "Voice Interview",
    description:
      "Answer questions naturally using your voice in a real interview simulation.",
  },
  {
    icon: ChartColumnBig,
    title: "Detailed Report",
    description:
      "Receive scores, feedback, strengths, weaknesses, and improvement tips.",
  },
];

export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -340,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 340,
      behavior: "smooth",
    });
  };

  return (
    <section id="how-it-works" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Your Interview Journey in{" "}
            <span className="text-blue-600">Five Simple Steps</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            From uploading your resume to receiving detailed AI feedback,
            InterviewAI makes interview preparation simple and effective.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:bg-blue-600 hover:text-white lg:flex"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:bg-blue-600 hover:text-white lg:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-2 lg:px-14 [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="group relative min-w-[300px] rounded-3xl border border-slate-200 bg-slate-50 p-7 text-center shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-2xl"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-600">
                    <Icon
                      size={32}
                      className="text-blue-600 transition group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}