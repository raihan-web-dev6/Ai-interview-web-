"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "SJ",
    review:
      "InterviewAI helped me prepare for my React interview with realistic AI-generated questions. I landed my dream job after just two weeks of practice!",
  },
  {
    name: "Michael Lee",
    role: "Full Stack Developer",
    image: "ML",
    review:
      "The voice interview feature feels incredibly natural. The AI feedback highlighted mistakes I never noticed before.",
  },
  {
    name: "Emma Williams",
    role: "Software Engineer",
    image: "EW",
    review:
      "Resume analysis and personalized interview questions made my preparation much more effective. Highly recommended!",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Loved by
            <span className="text-blue-600"> Developers Worldwide</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of developers use InterviewAI to build confidence,
            improve communication, and prepare for technical interviews.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
            >
              {/* Quote */}
              <Quote
                size={36}
                className="text-blue-600 opacity-30"
              />

              {/* Stars */}
              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-6 leading-8 text-slate-600">
                "{user.review}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
                  {user.image}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;