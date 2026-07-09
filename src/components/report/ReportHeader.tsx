import { CheckCircle2 } from "lucide-react";

interface Props {
  interview: any;
}

function ReportHeader({ interview }: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            AI Interview Report
          </h1>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            {interview.jobTitle}
          </p>

          <p className="mt-1 text-slate-500">
            {interview.company || "Company not specified"}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-5 py-3 font-semibold text-green-700">
          <CheckCircle2 size={22} />
          Completed
        </div>

      </div>

    </div>
  );
}

export default ReportHeader;