"use client";

interface Props {
  current: number;
  total: number;
  loading?: boolean;
  finishing?: boolean;
  onPrevious: () => void;
  onSave: () => void;
  onNext: () => void;
}

export default function BottomNavigation({
  current,
  total,
  loading = false,
  finishing = false,
  onPrevious,
  onSave,
  onNext,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex flex-wrap justify-between gap-4">

        <button
          disabled={current === 0 || finishing}
          onClick={onPrevious}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        <button
          onClick={onSave}
          disabled={loading || finishing}
          className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              Saving...
            </>
          ) : (
            "Save Draft"
          )}
        </button>

        <button
          onClick={onNext}
          disabled={loading || finishing}
          className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {finishing ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating Report...
            </>
          ) : current === total - 1 ? (
            "Finish Interview"
          ) : (
            "Next →"
          )}
        </button>

      </div>
    </div>
  );
}