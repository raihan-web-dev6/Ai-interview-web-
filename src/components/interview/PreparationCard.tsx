"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  BriefcaseBusiness,
  Building2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface Props {
  interview: {
    _id: string;
    jobTitle: string;
    company?: string;
    difficulty: string;
    duration: number;
    questions: any[];
  };
  generating?: boolean;
}

export default function PreparationCard({
  interview,
  generating = false,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl">

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">
            <Brain
              size={34}
              className="text-blue-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Preparation
            </h1>

            <p className="text-slate-500 mt-1">
              Everything is ready before your interview begins.
            </p>

          </div>

        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center gap-3">

              <BriefcaseBusiness className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Position
                </p>

                <h3 className="font-bold text-lg">
                  {interview.jobTitle}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center gap-3">

              <Building2 className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Company
                </p>

                <h3 className="font-bold text-lg">
                  {interview.company || "Company not specified"}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Difficulty
                </p>

                <h3 className="font-bold">
                  {interview.difficulty}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center gap-3">

              <Clock3 className="text-orange-500" />

              <div>

                <p className="text-sm text-slate-500">
                  Duration
                </p>

                <h3 className="font-bold">
                  {interview.duration} Minutes
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="my-10 h-px bg-slate-200" />

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            Resume Uploaded
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            Resume Parsed
          </div>

          <div className="flex items-center gap-3">

            {generating ? (
              <>
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

                AI Generating Personalized Questions
              </>
            ) : (
              <>
                <CheckCircle2 className="text-green-600" />
                AI Questions Generated
              </>
            )}

          </div>

          {!generating && (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Interview Ready
            </div>
          )}

        </div>

        <div className="mt-10">

          {generating ? (
            <>
              <div className="h-4 overflow-hidden rounded-full bg-slate-200">

                <motion.div
                  animate={{
                    width: [
                      "10%",
                      "40%",
                      "65%",
                      "90%",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="h-full rounded-full bg-blue-600"
                />

              </div>

              <p className="mt-4 text-center text-slate-500">
                Usually takes 10–20 seconds.
              </p>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-8">

                <div className="rounded-2xl bg-blue-50 p-5 text-center">

                  <p className="text-sm text-slate-500">
                    Questions
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-blue-700">
                    {interview.questions.length}
                  </h2>

                </div>

                <div className="rounded-2xl bg-green-50 p-5 text-center">

                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-green-700">
                    {interview.duration}
                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-50 p-5 text-center">

                  <p className="text-sm text-slate-500">
                    Difficulty
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-orange-600">
                    {interview.difficulty}
                  </h2>

                </div>

              </div>

              <Link
                href={`/interview/${interview._id}/session`}
                className="block w-full rounded-2xl bg-blue-600 py-4 text-center text-lg font-bold text-white transition hover:bg-blue-700"
              >
                Start Interview →
              </Link>
            </>
          )}

        </div>

      </div>

    </div>
  );
}