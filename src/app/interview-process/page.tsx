"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Clock3,
  FileText,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


function Page() {
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState(20);
  const router = useRouter();

const [loading, setLoading] = useState(false);

const [resume, setResume] = useState<File | null>(null);

const [jobTitle, setJobTitle] = useState("");

const [company, setCompany] = useState("");

const [jobDescription, setJobDescription] = useState("");

const handleContinue = async () => {
    try {

        if (!resume)
            return toast.error("Upload Resume");

        if (!jobTitle)
            return toast.error("Enter Job Title");

        if (!jobDescription)
            return toast.error("Enter Job Description");

        setLoading(true);

        // -----------------------------
        // Upload Resume
        // -----------------------------

        const formData = new FormData();

        formData.append("resume", resume);

        const uploadRes = await axios.post(
            "/api/upload-resume",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const {
            resumeUrl,
            resumeText,
        } = uploadRes.data;

        // -----------------------------
        // Create Interview
        // -----------------------------

        const createRes = await axios.post(
            "/api/interview-process/create",
            {
                jobTitle,
                company,
                resumeUrl,
                resumeText,
                jobDescription,
                difficulty,
                duration,
            }
        );

        toast.success("Interview Created");

        router.push(
            `/interview/${createRes.data.interviewId}`
        );

    } catch (error: any) {

        toast.error(
            error.response?.data?.message ||
            "Something went wrong"
        );

    } finally {
        setLoading(false);
    }
};
  return (
    <div className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-slate-900">
            Start New Interview
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Upload your resume, enter the job details, and let AI prepare a
            personalized interview.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="grid gap-8">
            {/* Resume */}
            <div>
              <label className="mb-3 block font-semibold text-slate-700">
                Upload Resume (PDF)
              </label>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 transition hover:border-blue-500 hover:bg-blue-100">
                <UploadCloud
                  size={50}
                  className="text-blue-600"
                />

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Choose PDF
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Drag & drop or click to upload your resume
                </p>

                <input
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={(e) => {
        if (e.target.files?.length) {
            setResume(e.target.files[0]);
        }
    }}
/>
{resume && (
    <p className="mt-4 text-sm text-blue-600 font-medium">
        {resume.name}
    </p>
)}
              </label>
            </div>

            {/* Job Title */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <BriefcaseBusiness size={18} />
                Job Title
              </label>

             <input
value={jobTitle}
onChange={(e)=>setJobTitle(e.target.value)}
type="text"
placeholder="Frontend Developer"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <Building2 size={18} />
                Company (Optional)
              </label>

             <input
value={company}
onChange={(e)=>setCompany(e.target.value)}
type="text"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <FileText size={18} />
                Job Description
              </label>

             <textarea
value={jobDescription}
onChange={(e)=>setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full resize-none rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="mb-4 font-semibold text-slate-700">
                Difficulty
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                {["Easy", "Medium", "Hard"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setDifficulty(item)}
                    className={`rounded-2xl border p-5 text-lg font-semibold transition ${
                      difficulty === item
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                        : "border-slate-300 hover:border-blue-500"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-700">
                <Clock3 size={18} />
                Estimated Duration
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                {[10, 20, 30].map((time) => (
                  <button
                    key={time}
                    onClick={() => setDuration(time)}
                    className={`rounded-2xl border p-5 text-lg font-semibold transition ${
                      duration === time
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                        : "border-slate-300 hover:border-blue-500"
                    }`}
                  >
                    {time} Minutes
                  </button>
                ))}
              </div>
            </div>

            {/* Button */}
           <button
    disabled={loading}
    onClick={handleContinue}
    className="mt-4 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
>
    {loading ? "Creating Interview..." : "Continue →"}
</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;