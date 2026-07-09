"use client";

import {
  BrainCircuit,
  Mic,
  FileText,
  BarChart3,
  Zap,
  History,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Generated Questions",
    description:
      "Generate personalized interview questions based on your resume and target job role.",
  },
  {
    icon: Mic,
    title: "Voice Interview",
    description:
      "Practice naturally by answering interview questions using your voice in real time.",
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description:
      "Upload your resume and receive AI-powered insights before starting your interview.",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description:
      "View detailed analytics including strengths, weaknesses, and overall interview score.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Receive immediate AI feedback after every answer to improve your performance.",
  },
  {
    icon: History,
    title: "Interview History",
    description:
      "Access all your previous interviews and monitor your progress over time.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Features
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Everything You Need to
            <span className="text-blue-600"> Ace Your Interview</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Practice smarter with AI-powered interview simulations, resume
            analysis, voice interaction, and detailed performance reports.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-600">
                  <Icon
                    size={32}
                    className="text-blue-600 transition group-hover:text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;