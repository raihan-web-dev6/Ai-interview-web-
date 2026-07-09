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
        { status: 401 }
      );
    }

    const { interviewId } = await req.json();

    const interview = await Interview.findOne({
      _id: interviewId,
      userId: session.user.id,
    });

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found",
        },
        { status: 404 }
      );
    }

    const qa = interview.questions
      .map(
        (q: any, index: number) => `
Question ${index + 1}
${q.question}

Answer
${q.answer}
`
      )
      .join("\n");

    const prompt = `
You are an expert AI Interview Evaluator.

Evaluate every interview answer.

Return ONLY JSON.

Example:

{
  "technicalScore":85,
  "communicationScore":80,
  "confidenceScore":88,
  "overallScore":84,

  "strengths":[
    "Strong React knowledge",
    "Good communication",
    "Clear examples"
  ],

  "weaknesses":[
    "Need deeper system design",
    "Improve optimization knowledge"
  ],

  "feedback":"Overall excellent interview.",

  "questions":[
    {
      "score":90,
      "feedback":"Excellent answer.",
      "strengths":[
        "Clear explanation"
      ],
      "improvements":[
        "Mention more examples"
      ]
    }
  ]
}

Interview

Job Title:
${interview.jobTitle}

Difficulty:
${interview.difficulty}

Questions & Answers

${qa}

Return ONLY JSON.
No markdown.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const report = JSON.parse(clean);

    const updatedQuestions = interview.questions.map(
  (q: any, index: number) => ({
    ...q.toObject(),
    score: report.questions[index]?.score || 0,
    feedback: report.questions[index]?.feedback || "",
    strengths: report.questions[index]?.strengths || [],
    improvements: report.questions[index]?.improvements || [],
  })
);

await Interview.findByIdAndUpdate(
  interviewId,
  {
    $set: {
      questions: updatedQuestions,
      technicalScore: report.technicalScore,
      communicationScore: report.communicationScore,
      confidenceScore: report.confidenceScore,
      overallScore: report.overallScore,
      strengths: report.strengths,
      weaknesses: report.weaknesses,
      feedback: report.feedback,
      status: "completed",
    },
  },
  { new: true }
);


    return NextResponse.json({
      success: true,
      interview,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to analyze interview",
      },
      {
        status: 500,
      }
    );
  }
}