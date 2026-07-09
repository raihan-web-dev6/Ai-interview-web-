"use client";

interface Props {
  questions: {
    question: string;
    answer: string;
  }[];
  current: number;
}

export default function QuestionSidebar({
  questions,
  current,
}: Props) {
  return (
    <div className="hidden lg:block w-80">

      <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

        <h2 className="text-xl font-bold text-slate-900">
          Questions
        </h2>

        <div className="mt-6 space-y-3">

          {questions.map((item, index) => {
            const completed = item.answer?.trim() !== "";

            return (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

                ${
                  current === index
                    ? "bg-blue-600 text-white"
                    : completed
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-700"
                }
                `}
              >
                <div className="font-bold">

                  {completed
                    ? "✔"
                    : index === current
                    ? "▶"
                    : index + 1}

                </div>

                <p className="truncate text-sm">

                  {item.question}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}