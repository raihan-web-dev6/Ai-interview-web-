"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import {
  AnswerTextarea,
  BottomNavigation,
  InterviewHeader,
  QuestionCard,
  QuestionSidebar,
  VoiceRecorder,
} from "@/components/interview";

import useSpeechRecognition from "@/hooks/useSpeechRecognition";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<any>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finishing, setFinishing] = useState(false);

  // prevents duplicate auto submit
  const submittedRef = useRef(false);

  const {
    transcript,
    recording,
    startRecording,
    stopRecording,
  } = useSpeechRecognition();

  //------------------------------------------------
  // Fetch Interview
  //------------------------------------------------

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`/api/interview/${id}`);

        const data = res.data.interview;

        setInterview(data);

        setTimeLeft(data.duration * 60);

        if (data.questions.length > 0) {
          setAnswer(data.questions[0].answer || "");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInterview();
    }
  }, [id]);

  //------------------------------------------------
  // Countdown Timer
  //------------------------------------------------

  useEffect(() => {
    if (!interview) return;

    if (isSubmitting) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [interview, isSubmitting]);

  //------------------------------------------------
  // Speech Recognition -> Textarea
  //------------------------------------------------

  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  //------------------------------------------------
  // Read Question Aloud
  //------------------------------------------------

  useEffect(() => {
    if (!interview) return;

    if (typeof window === "undefined") return;

    const speakQuestion = () => {
      window.speechSynthesis.cancel();

      const question =
        interview.questions[currentQuestion]?.question;

      if (!question) return;

      const utterance =
        new SpeechSynthesisUtterance(question);

      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();

      const bestVoice =
        voices.find((v) =>
          v.name.includes("Google US English")
        ) ||
        voices.find((v) =>
          v.name.includes("Microsoft David")
        ) ||
        voices.find((v) => v.lang === "en-US") ||
        voices[0];

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakQuestion;
    } else {
      speakQuestion();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentQuestion, interview]);

  //------------------------------------------------
  // Save Answer
  //------------------------------------------------

  const saveAnswer = async () => {
    if (!interview) return;

    try {
      await axios.patch("/api/makeinterview/answer", {
        interviewId: id,
        questionIndex: currentQuestion,
        answer,
        answerType: recording ? "voice" : "text",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //------------------------------------------------
  // Autosave
  //------------------------------------------------

  useEffect(() => {
    if (!answer) return;

    const timeout = setTimeout(() => {
      saveAnswer();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [answer]);

  //------------------------------------------------
  // Auto Submit when Timer Ends
  //------------------------------------------------

  useEffect(() => {
    if (!interview) return;

    if (timeLeft > 0) return;

    if (submittedRef.current) return;

    submittedRef.current = true;

    const autoSubmit = async () => {
      try {
        setIsSubmitting(true);

        window.speechSynthesis.cancel();

        await saveAnswer();

        await axios.post("/api/makeinterview/analyze", {
          interviewId: id,
        });

        router.replace(`/report/${id}`);
      } catch (err) {
        console.log(err);
        submittedRef.current = false;
        setIsSubmitting(false);
      }
    };

    autoSubmit();
  }, [timeLeft]);

  //------------------------------------------------
  // Next Question
  //------------------------------------------------

  const handleNext = async () => {
  speechSynthesis.cancel();

  await saveAnswer();

  if (currentQuestion < interview.questions.length - 1) {
    const next = currentQuestion + 1;

    setCurrentQuestion(next);
    setAnswer(interview.questions[next].answer || "");
  } else {
    try {
      setFinishing(true);

      await axios.post("/api/makeinterview/analyze", {
        interviewId: id,
      });

      router.push(`/report/${id}`);
    } catch (error) {
      console.log(error);
      setFinishing(false);
    }
  }
};

  //------------------------------------------------
  // Previous Question
  //------------------------------------------------

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    window.speechSynthesis.cancel();

    const prev = currentQuestion - 1;

    setCurrentQuestion(prev);

    setAnswer(
      interview.questions[prev].answer || ""
    );
  };

 if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
      Loading Interview...
    </div>
  );
}

if (!interview) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Interview not found
    </div>
  );
}

if (isSubmitting) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <h2 className="mt-6 text-2xl font-bold">
          Time's Up!
        </h2>

        <p className="mt-2 text-slate-500">
          Submitting your interview and generating AI feedback...
        </p>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-7xl p-8">

      <InterviewHeader
        jobTitle={interview.jobTitle}
        current={currentQuestion + 1}
        total={interview.questions.length}
        timeLeft={timeLeft}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

        {/* LEFT */}
        <div>

          <QuestionCard
            question={
              interview.questions[currentQuestion]?.question || ""
            }
            current={currentQuestion + 1}
            total={interview.questions.length}
          />

          <div className="my-8">
            <VoiceRecorder
              recording={recording}
              onStart={startRecording}
              onStop={stopRecording}
            />
          </div>

          <AnswerTextarea
            value={answer}
            onChange={setAnswer}
          />

          <BottomNavigation
  current={currentQuestion}
  total={interview.questions.length}
  loading={loading}
  finishing={finishing}
  onPrevious={handlePrevious}
  onSave={saveAnswer}
  onNext={handleNext}
/>

        </div>

        {/* RIGHT */}
        <QuestionSidebar
          questions={interview.questions}
          current={currentQuestion}
        />

      </div>

    </div>
  </div>
);
}

export default Page;