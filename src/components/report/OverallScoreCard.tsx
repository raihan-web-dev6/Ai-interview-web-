import { Award } from "lucide-react";

interface Props {
  score: number;
}

function OverallScoreCard({ score }: Props) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white shadow-xl">

      <Award
        size={48}
        className="mx-auto mb-4"
      />

      <p className="text-xl font-medium">
        Overall Score
      </p>

      <h2 className="mt-3 text-7xl font-bold">
        {score}%
      </h2>

      <p className="mt-4 text-blue-100">
        AI Evaluation Summary
      </p>

    </div>
  );
}

export default OverallScoreCard;