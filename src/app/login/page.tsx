"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Brain,
  FileText,
  Mic,
  ChartColumnBig,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";


export default  function   LoginPage() {
      
const [loading, setLoading] = useState(false);
const handleGoogleLogin = async () => {
  try {
    setLoading(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-12 text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              AI Interview Agent
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight">
              Ace Your Next
              <br />
              Technical Interview
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Practice realistic interviews powered by AI, receive detailed
              feedback, and improve your confidence before applying.
            </p>

            <div className="mt-10 space-y-5">
              <Feature icon={<Brain />} text="AI Generated Questions" />
              <Feature icon={<FileText />} text="Resume Analysis" />
              <Feature icon={<Mic />} text="Voice Interview" />
              <Feature icon={<ChartColumnBig />} text="Detailed Reports" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
                  <Brain
                    className="text-blue-600"
                    size={40}
                  />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-slate-900">
                  Welcome Back
                </h2>

                <p className="mt-3 text-slate-500">
                  Continue with your Google account to start practicing AI
                  interviews.
                </p>
              </div>

              <button
  onClick={handleGoogleLogin}
  disabled={loading}
  className={`mt-10 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-semibold text-white transition
    ${
      loading
        ? "cursor-not-allowed bg-blue-400"
        : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
    }`}
>
  {loading ? (
    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      Redirecting...
    </>
  ) : (
    <>
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-6 w-6"
      />

      Continue with Google

      <ArrowRight size={18} />
    </>
  )}
</button>

              <p className="mt-6 text-center text-sm text-slate-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-white/10 p-2">{icon}</div>
      <span className="text-blue-100">{text}</span>
    </div>
  );
}