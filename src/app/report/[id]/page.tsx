"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ReportHeader from "@/components/report/ReportHeader";
import OverallScoreCard from "@/components/report/OverallScoreCard";
import ScoreCards from "@/components/report/ScoreCards";
import StrengthsCard from "@/components/report/StrengthsCard";
import WeaknessesCard from "@/components/report/WeaknessesCard";
import FeedbackCard from "@/components/report/FeedbackCard";
import QuestionAnalysis from "@/components/report/QuestionAnalysis";
import DownloadReportButton from "@/components/report/DownloadReportButton";

export default function ReportPage() {
  const { id } = useParams();
  const router = useRouter();

  const [interview, setInterview] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`/api/report/${id}`);
        setInterview(res.data.interview);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Report...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Report not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      

      <div className="mx-auto max-w-7xl space-y-8 px-6">
        <button
  onClick={() => router.push("/")}
  className="mb-6 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium shadow-sm transition hover:bg-slate-100"
>
  <ArrowLeft size={18} />
  Back to Home
</button>

        <ReportHeader interview={interview} />

        <OverallScoreCard
          score={interview.overallScore}
        />

        <ScoreCards interview={interview} />

        <div className="grid gap-8 lg:grid-cols-2">

          <StrengthsCard
            strengths={interview.strengths}
          />

          <WeaknessesCard
            weaknesses={interview.weaknesses}
          />

        </div>

        <FeedbackCard
          feedback={interview.feedback}
        />

        <QuestionAnalysis
          questions={interview.questions}
        />

        <div className="flex justify-center">

          <DownloadReportButton />

        </div>

      </div>

    </div>
  );
}