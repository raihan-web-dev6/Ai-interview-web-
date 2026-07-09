"use client";

import { motion } from "framer-motion";

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: Props) {

  const percent = (current / total) * 100;

  return (
    <div>

      <div className="flex justify-between text-sm text-slate-500 mb-2">

        <span>Progress</span>

        <span>{Math.round(percent)}%</span>

      </div>

      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
          className="h-full rounded-full bg-blue-600"
        />

      </div>

    </div>
  );
}