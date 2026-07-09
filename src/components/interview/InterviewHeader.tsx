"use client";

import Timer from "./Timer";
import ProgressBar from "./ProgressBar";

interface Props {
  jobTitle: string;
  current: number;
  total: number;
  timeLeft: number;
}

export default function InterviewHeader({
  jobTitle,
  current,
  total,
  timeLeft,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {jobTitle}
          </h1>

          <p className="text-slate-500 mt-2">
            Question {current} / {total}
          </p>
        </div>

        <Timer seconds={timeLeft} />

      </div>

      <div className="mt-6">
        <ProgressBar
          current={current}
          total={total}
        />
      </div>

    </div>
  );
}