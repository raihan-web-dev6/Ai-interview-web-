import React from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  weaknesses: string[];
}

function WeaknessesCard({ weaknesses }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-3">
          <AlertTriangle
            className="text-red-600"
            size={22}
          />
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          Areas to Improve
        </h2>
      </div>

      {weaknesses.length > 0 ? (
        <ul className="space-y-3">
          {weaknesses.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-red-50 p-4"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />

              <span className="text-slate-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-green-300 bg-green-50 p-6 text-center">
          <p className="font-medium text-green-700">
            🎉 No major weaknesses detected.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Great job! Keep practicing to maintain your performance.
          </p>
        </div>
      )}
    </div>
  );
}

export default WeaknessesCard;