import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/model/user.model";
import Interview from "@/model/interview.model";

export async function GET() {
  try {
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

    await connectDb();

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

    // Until Interview model is created
   const now = new Date();

const hoursPassed =
  (now.getTime() - new Date(user.lastInterviewReset).getTime()) /
  (1000 * 60 * 60);

// Auto reset after 24 hours
if (hoursPassed >= 24) {
  user.interviewCount = 0;
  user.lastInterviewReset = now;
  await user.save();
}

const remainingToday = Math.max(0, 3 - user.interviewCount);

const nextReset = new Date(
  new Date(user.lastInterviewReset).getTime() + 24 * 60 * 60 * 1000
);

const interviews = await Interview.find({
  userId: user._id,
}).sort({ createdAt: -1 });

const completedInterviews = interviews.filter(
  (item) => item.status === "completed"
);

const totalInterviews = completedInterviews.length;

const averageScore =
  totalInterviews > 0
    ? Math.round(
        completedInterviews.reduce(
          (sum, item) => sum + item.overallScore,
          0
        ) / totalInterviews
      )
    : 0;

const bestScore =
  totalInterviews > 0
    ? Math.max(
        ...completedInterviews.map(
          (item) => item.overallScore
        )
      )
    : 0;

const recentInterviews = completedInterviews
  .slice(0, 3)
  .map((item) => ({
    _id: item._id,
    jobTitle: item.jobTitle,
    status: item.status,
    overallScore: item.overallScore,
    createdAt: item.createdAt,
  }));

const dashboardData = {
  totalInterviews,
  averageScore,
  bestScore,

  remainingToday,

  interviewsUsed: user.interviewCount,

  nextReset,

  recentInterviews,
};


    return NextResponse.json({
      success: true,
      dashboard: dashboardData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}