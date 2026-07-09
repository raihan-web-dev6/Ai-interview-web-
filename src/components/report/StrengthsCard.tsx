import { CheckCircle } from "lucide-react";

interface Props {
  strengths: string[];
}

function StrengthsCard({ strengths }: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        Strengths
      </h2>

      <div className="space-y-4">

        {strengths.length > 0 ? (
          strengths.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <CheckCircle
                size={22}
                className="mt-1 text-green-600"
              />

              <p className="text-slate-700">
                {item}
              </p>
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            No strengths available.
          </p>
        )}

      </div>

    </div>
  );
}

export default StrengthsCard;