"use client";

interface Props {
  question: string;
  current: number;
  total: number;
}

export default function QuestionCard({
  question,
  current,
  total,
}: Props) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-lg p-8">

      <div className="flex items-center justify-between">

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
          Question {current} / {total}
        </span>

        <span className="text-slate-500">
          AI Generated
        </span>

      </div>

      <h2 className="mt-8 text-3xl font-bold leading-relaxed text-slate-900">
        {question}
      </h2>

      <p className="mt-6 text-slate-500">
        Answer naturally with examples from your experience.
      </p>

    </div>
  );
}