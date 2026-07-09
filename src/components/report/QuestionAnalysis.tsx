"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Question {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

interface Props {
  questions: Question[];
}

function QuestionAnalysis({ questions }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

      <h2 className="mb-6 text-2xl font-bold">
        Question Analysis
      </h2>

      <div className="space-y-4">

        {questions.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200 overflow-hidden"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-5 text-left hover:bg-slate-50"
            >
              <div>

                <h3 className="font-semibold">
                  Q{index + 1}. {item.question}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Score : {item.score}/10
                </p>

              </div>

              {open === index ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </button>

            {open === index && (

              <div className="border-t bg-slate-50 p-6 space-y-6">

                <div>

                  <h4 className="font-semibold mb-2">
                    Your Answer
                  </h4>

                  <p className="text-slate-600">
                    {item.answer || "No answer submitted."}
                  </p>

                </div>

                <div>

                  <h4 className="font-semibold mb-2">
                    AI Feedback
                  </h4>

                  <p className="text-slate-600">
                    {item.feedback}
                  </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>

                    <h4 className="mb-3 font-semibold flex items-center gap-2">
                      <CheckCircle2
                        className="text-green-500"
                        size={18}
                      />
                      Strengths
                    </h4>

                    <ul className="space-y-2">

                      {item.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="mb-3 font-semibold flex items-center gap-2">
                      <AlertCircle
                        className="text-red-500"
                        size={18}
                      />
                      Improvements
                    </h4>

                    <ul className="space-y-2">

                      {item.improvements.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}

                    </ul>

                  </div>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuestionAnalysis;