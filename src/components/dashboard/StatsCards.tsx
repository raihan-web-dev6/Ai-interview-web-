"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Trophy,
  Target,
  Clock3,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";


function StatsCards() {
  
const [dashboard, setDashboard] = useState<any>(null);

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
const stats = [
  {
    title: "Total Interviews",
    value: dashboard?.totalInterviews ?? 0,
    icon: BrainCircuit,
    color: "bg-blue-100 text-blue-600",
    description: "Completed interviews",
  },
  {
    title: "Average Score",
    value: `${dashboard?.averageScore ?? 0}%`,
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
    description: "Overall performance",
  },
  {
    title: "Best Score",
    value: `${dashboard?.bestScore ?? 0}%`,
    icon: Trophy,
    color: "bg-yellow-100 text-yellow-600",
    description: "Highest interview score",
  },
  {
    title: "Remaining Today",
    value: dashboard?.remainingToday ?? 3,
    icon: Clock3,
    color: "bg-purple-100 text-purple-600",
    description: "Free interviews left",
  },
];
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <Target
                size={18}
                className="text-slate-300 transition group-hover:text-blue-500"
              />
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {item.title}
            </h3>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {item.description}
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
               animate={{
  width:
    index === 0
      ? `${Math.min(
          ((dashboard?.totalInterviews ?? 0) / 10) * 100,
          100
        )}%`
      : index === 1
      ? `${dashboard?.averageScore ?? 0}%`
      : index === 2
      ? `${dashboard?.bestScore ?? 0}%`
      : `${((dashboard?.remainingToday ?? 3) / 3) * 100}%`,
}}
                transition={{
                  duration: 1,
                  delay: 0.3 + index * 0.15,
                }}
                className="h-full rounded-full bg-blue-600"
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

export default StatsCards;