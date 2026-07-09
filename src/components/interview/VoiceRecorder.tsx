"use client";

import { Mic, Square } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  recording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function VoiceRecorder({
  recording,
  onStart,
  onStop,
}: Props) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-lg p-10">

      <div className="flex flex-col items-center">

        <motion.button
          animate={
            recording
              ? {
                  scale: [1, 1.15, 1],
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
          onClick={recording ? onStop : onStart}
          className={`h-28 w-28 rounded-full flex items-center justify-center text-white shadow-xl transition
          ${
            recording
              ? "bg-red-500"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {recording ? (
            <Square size={36} />
          ) : (
            <Mic size={40} />
          )}
        </motion.button>

        <h3 className="mt-6 text-xl font-bold">
          {recording ? "Listening..." : "Tap to Speak"}
        </h3>

        <p className="text-slate-500 mt-2">
          {recording
            ? "Recording your answer"
            : "Click the microphone to answer using voice"}
        </p>

      </div>

    </div>
  );
}