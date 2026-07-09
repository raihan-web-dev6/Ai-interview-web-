import connectDb from "@/lib/db";
import Interview from "@/model/interview.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ FIX: unwrap params Promise
    const { id } = await params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      interview,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching interview" },
      { status: 500 }
    );
  }
  
}