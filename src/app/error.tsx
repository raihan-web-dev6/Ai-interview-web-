"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <span className="text-4xl">⚠️</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-500">
          We couldn't complete your request. Please try again.
        </p>

        <button
          onClick={reset}
          className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}