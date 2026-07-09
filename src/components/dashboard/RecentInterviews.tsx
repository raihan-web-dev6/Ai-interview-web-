"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Eye,
  Star,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

function RecentInterviews() {
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/dashboard");
        setInterviews(res.data.dashboard.recentInterviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 lg:p-8 shadow-lg"
    >
      {/* Heading */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl lg:text-3xl  font-bold text-slate-900">
            Recent Interviews
          </h2>

          <p className="mt-2 text-slate-500">
            Review your latest AI interview sessions.
          </p>
        </div>

        <Link
          href="/history"
          className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="space-y-5">
        {interviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              No interviews yet
            </h3>

            <p className="mt-2 text-slate-500">
              Complete your first AI interview to see it here.
            </p>
          </div>
        ) : (
          interviews.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <BriefcaseBusiness
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.jobTitle}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 capitalize">
                      {item.status}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays size={16} />
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="text-center">
                  <p className="text-sm text-slate-500">
                    AI Score
                  </p>

                  <div className="mt-1 flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                    <Star size={20} fill="currentColor" />
                    {item.overallScore}%
                  </div>
                </div>

                <Link
                  href={`/report/${item._id}`}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Eye size={18} />
                  View Report
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.section>
  );
}

export default RecentInterviews;