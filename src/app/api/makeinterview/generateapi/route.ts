import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDb from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Interview from "@/model/interview.model";

import { model } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { interviewId } = await req.json();
    console.log("Interview ID:", interviewId);
console.log("Session User ID:", session.user.id);

    const interview = await Interview.findOne({
      _id: interviewId,
      userId: session.user.id,
    });
    console.log(interview);

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found",
        },
        {
          status: 404,
        }
      );
    }

    if (interview.questions.length > 0) {
      return NextResponse.json({
        success: true,
        questions: interview.questions,
      });
    }

    const prompt = `
You are an expert technical interviewer.

Generate exactly 10 interview questions.

Job Title:
${interview.jobTitle}

Company:
${interview.company}

Difficulty:
${interview.difficulty}

Resume:
${interview.resumeText}

Job Description:
${interview.jobDescription}

Rules:

Return ONLY JSON.

Example:

[
{
"question":"Tell me about yourself."
},
{
"question":"Explain React Virtual DOM."
}
]

Do not write markdown.
Do not write explanation.
Only JSON.
`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    const text = result.response.text();

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(clean);

   const formattedQuestions = questions.map(
  (q: { question: string }, index: number) => ({
    index: index + 1,
    question: q.question,
    answer: "",
    answerType: "voice",
    score: 0,
    feedback: "",
    strengths: [],
    improvements: [],
  })
);

await Interview.findByIdAndUpdate(
  interviewId,
  {
    $set: {
      questions: formattedQuestions,
    },
  },
  { new: true }
);

return NextResponse.json({
  success: true,
  questions: formattedQuestions,
});
   

    return NextResponse.json({
      success: true,
      
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate interview",
      },
      {
        status: 500,
      }
    );
  }
}