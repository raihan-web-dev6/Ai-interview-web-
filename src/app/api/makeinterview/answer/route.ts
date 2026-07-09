import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDb from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Interview from "@/model/interview.model";

export async function PATCH(req: NextRequest) {
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

    const {
      interviewId,
      questionIndex,
      answer,
      answerType,
    } = await req.json();

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
        {
          status: 404,
        }
      );
    }

    if (
      questionIndex < 0 ||
      questionIndex >= interview.questions.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid question index",
        },
        {
          status: 400,
        }
      );
    }

    interview.questions[questionIndex].answer = answer;

    interview.questions[questionIndex].answerType =
      answerType || "text";

    await interview.save();

    return NextResponse.json({
      success: true,
      message: "Answer saved",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save answer",
      },
      {
        status: 500,
      }
    );
  }
}