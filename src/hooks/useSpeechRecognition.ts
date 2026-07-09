"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function useSpeechRecognition() {
  const recognitionRef = useRef<any>(null);

  const [recording, setRecording] = useState(false);

  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onresult = (event: any) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    recording,
    startRecording,
    stopRecording,
  };
}