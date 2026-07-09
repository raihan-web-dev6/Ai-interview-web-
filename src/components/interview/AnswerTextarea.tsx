"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AnswerTextarea({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-lg p-8">

      <div className="mb-4">

        <h3 className="text-lg font-bold">
          Or Type Your Answer
        </h3>

        <p className="text-slate-500 text-sm mt-1">
          Your answer is automatically saved.
        </p>

      </div>

      <textarea
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Explain your answer here..."
        className="w-full rounded-2xl border border-slate-300 p-5 resize-none outline-none focus:border-blue-600"
      />

    </div>
  );
}