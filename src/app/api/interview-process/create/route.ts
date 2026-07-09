import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";

import User from "@/model/user.model";
import Interview from "@/model/interview.model";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const {
      jobTitle,
      company,
      resumeUrl,
      resumeText,
      jobDescription,
      difficulty,
      duration,
    } = await req.json();

    if (
      !jobTitle ||
      !resumeText ||
      !jobDescription ||
      !difficulty ||
      !duration
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // ===============================
    // Reset interview count after 24 hours
    // ===============================

    const now = new Date();

    const hoursPassed =
      (now.getTime() - new Date(user.lastInterviewReset).getTime()) /
      (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      user.interviewCount = 0;
      user.lastInterviewReset = now;
    }

    // ===============================
    // Daily Limit
    // ===============================

    if (user.interviewCount >= 3) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Daily interview limit reached. Please try again tomorrow.",
        },
        { status: 403 }
      );
    }

    user.interviewCount += 1;

    await user.save();

    // ===============================
    // Create Interview
    // ===============================

    const interview = await Interview.create({
      userId: user._id,

      jobTitle,

      company,

      resumeUrl,

      resumeText,

      jobDescription,

      difficulty,

      duration,

      questions: [],

      technicalScore: 0,

      communicationScore: 0,

      confidenceScore: 0,

      overallScore: 0,

      strengths: [],

      weaknesses: [],

      feedback: "",

      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,

        interviewId: interview._id,

        remainingToday: 3 - user.interviewCount,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}