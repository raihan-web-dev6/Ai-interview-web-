"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  Search,
  CalendarDays,
  BriefcaseBusiness,
  Building2,
  Eye,
  Star,
  Filter,
} from "lucide-react";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);

  const [interviews, setInterviews] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/history");

        setInterviews(res.data.interviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filtered = useMemo(() => {
    return interviews.filter((item) => {
      const matchesSearch =
        item.jobTitle
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.company
          ?.toLowerCase()
          .includes(search.toLowerCase());

      if (filter === "All") return matchesSearch;

      if (filter === "90+") {
        return matchesSearch && item.overallScore >= 90;
      }

      if (filter === "80+") {
        return (
          matchesSearch &&
          item.overallScore >= 80 &&
          item.overallScore < 90
        );
      }

      return (
        matchesSearch &&
        item.overallScore < 80
      );
    });
  }, [interviews, search, filter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
        

      <div className="mx-auto max-w-7xl">
        <button
  onClick={() => router.back()}
  className="mb-6 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 shadow transition hover:bg-slate-100"
>
  <ArrowLeft size={20} />
  Back
</button>

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Interview History
          </h1>

          <p className="mt-2 text-slate-500">
            Review every interview you've completed.
          </p>

        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">

          <div className="flex flex-1 items-center rounded-xl bg-white px-4 shadow">

            <Search size={20} />

            <input
              placeholder="Search Job Title..."
              className="w-full bg-transparent p-3 outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white px-4 shadow">

            <Filter size={18} />

            <select
              className="bg-transparent p-3 outline-none"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>90+</option>
              <option>80+</option>
              <option>Below 80</option>
            </select>

          </div>

        </div>

        {filtered.length === 0 && (
          <div className="rounded-3xl bg-white p-20 text-center shadow">

            <h2 className="text-2xl font-bold">
              No Interviews Found
            </h2>

            <p className="mt-3 text-slate-500">
              Complete an interview to see it here.
            </p>

          </div>
        )}

        <div className="grid gap-6">

          {filtered.map((item, index) => (

            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className="rounded-3xl bg-white p-7 shadow"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex gap-5">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                    <BriefcaseBusiness
                      className="text-blue-600"
                      size={30}
                    />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.jobTitle}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-4 text-slate-500">

                      <span className="flex items-center gap-1">

                        <Building2 size={16} />

                        {item.company ||
                          "Company"}

                      </span>

                      <span className="flex items-center gap-1">

                        <CalendarDays
                          size={16}
                        />

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}

                      </span>

                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-8">

                  <div>

                    <p className="text-sm text-slate-500">
                      Overall Score
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-3xl font-bold text-yellow-500">

                      <Star
                        fill="currentColor"
                        size={22}
                      />

                      {item.overallScore}%

                    </div>

                  </div>

                  <Link
                    href={`/report/${item._id}`}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    <Eye size={18} />

                    View Report

                  </Link>

                </div>

              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-slate-100 p-4">

                  <p className="text-sm text-slate-500">
                    Technical
                  </p>

                  <h3 className="text-2xl font-bold">
                    {item.technicalScore}%
                  </h3>

                </div>

                <div className="rounded-xl bg-slate-100 p-4">

                  <p className="text-sm text-slate-500">
                    Communication
                  </p>

                  <h3 className="text-2xl font-bold">
                    {item.communicationScore}%
                  </h3>

                </div>

                <div className="rounded-xl bg-slate-100 p-4">

                  <p className="text-sm text-slate-500">
                    Confidence
                  </p>

                  <h3 className="text-2xl font-bold">
                    {item.confidenceScore}%
                  </h3>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}