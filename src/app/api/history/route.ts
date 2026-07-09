import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/model/user.model";
import Interview from "@/model/interview.model";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
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

    const interviews = await Interview.find({
      userId: user._id,
      status: "completed",
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}