import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDb from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Interview from "@/model/interview.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const interview = await Interview.findOne({
      _id: id,
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

    return NextResponse.json({
      success: true,
      interview,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch report",
      },
      {
        status: 500,
      }
    );
  }
}