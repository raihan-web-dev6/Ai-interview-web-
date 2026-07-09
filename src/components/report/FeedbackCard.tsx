import React from "react";
import { MessageSquareQuote } from "lucide-react";

interface Props {
  feedback: string;
}

function FeedbackCard({ feedback }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-xl bg-blue-100 p-3">
          <MessageSquareQuote className="text-blue-600" size={22} />
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          AI Feedback
        </h2>
      </div>

      <p className="leading-8 text-slate-600 whitespace-pre-wrap">
        {feedback}
      </p>
    </div>
  );
}

export default FeedbackCard;