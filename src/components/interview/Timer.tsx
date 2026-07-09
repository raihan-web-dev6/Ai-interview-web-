"use client";

interface Props {
  seconds: number;
}

export default function Timer({ seconds }: Props) {

  const minutes = Math.floor(seconds / 60);

  const sec = seconds % 60;

  let color = "text-green-600";

  if (seconds < 300) {
    color = "text-orange-500";
  }

  if (seconds < 120) {
    color = "text-red-600";
  }

  return (
    <div
      className={`rounded-2xl bg-slate-100 px-5 py-3 text-xl font-bold ${color}`}
    >
      ⏱ {minutes}:{sec.toString().padStart(2, "0")}
    </div>
  );
}