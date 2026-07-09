"use client";

import axios from "axios";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InterviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [interview, setInterview] = useState<any>(null);

  const fetchInterview = async () => {
    const res = await axios.get(`/api/interview/${id}`);
    const data = res.data.interview;

    setInterview(data);

    if (data.questions.length === 0) {
      await generateQuestions();
    } else {
      setLoading(false);
    }
  };

  const generateQuestions = async () => {
    try {
      setGenerating(true);

      const ress = await axios.post("/api/makeinterview/generateapi", {
  interviewId: id,
});

console.log(ress.data);

      const res = await axios.get(`/api/interview/${id}`);

      setInterview(res.data.interview);
    } catch (err) {
      console.log(err);
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchInterview();
  }, [id]);

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl"
        >
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 p-5">
              <BrainCircuit className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Preparing Your Interview
          </h1>

          <p className="mt-2 text-center text-slate-500">
            Our AI is analyzing your resume and generating personalized interview
            questions.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <span>Resume Uploaded</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <span>Resume Parsed</span>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-600 animate-pulse" />
              <span>AI Reading Resume</span>
            </div>
          </div>

          <div className="mt-10">
            <div className="h-4 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 12,
                  ease: "linear",
                }}
              />
            </div>

            <p className="mt-5 text-center text-slate-500">
              Generating personalized interview...
            </p>

            <p className="mt-2 text-center text-sm text-slate-400">
              Usually takes 10–20 seconds.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Interview not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="mx-auto max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <BrainCircuit size={42} />
            </div>

            <h1 className="mt-5 text-4xl font-bold">
              AI Interview Preparation
            </h1>

            <p className="mt-3 text-blue-100">
              Everything is ready for your personalized interview.
            </p>

          </div>

          <div className="p-10">

            <h2 className="text-3xl font-bold">
              {interview.jobTitle}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <Building2 size={18} />
              {interview.company || "Company not specified"}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl bg-blue-50 p-5">
                <BriefcaseBusiness className="mb-2 text-blue-600" />
                <p className="text-sm text-slate-500">
                  Difficulty
                </p>
                <h3 className="font-bold">
                  {interview.difficulty}
                </h3>
              </div>

              <div className="rounded-2xl bg-green-50 p-5">
                <Clock3 className="mb-2 text-green-600" />
                <p className="text-sm text-slate-500">
                  Duration
                </p>
                <h3 className="font-bold">
                  {interview.duration} Minutes
                </h3>
              </div>

              <div className="rounded-2xl bg-purple-50 p-5">
                <BrainCircuit className="mb-2 text-purple-600" />
                <p className="text-sm text-slate-500">
                  Questions
                </p>
                <h3 className="font-bold">
                  {interview.questions.length}
                </h3>
              </div>

            </div>

            <div className="my-10 border-t" />

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                Resume Uploaded
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                Resume Parsed
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                AI Questions Generated
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                Interview Ready
              </div>

            </div>

            <button
              onClick={() =>
                router.push(`/interview/${id}/session`)
              }
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Start Interview
              <ArrowRight size={20} />
            </button>

          </div>

        </motion.div>
      </div>
    </div>
  );
}