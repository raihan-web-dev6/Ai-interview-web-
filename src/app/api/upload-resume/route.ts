import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.mjs",
  import.meta.url
).toString();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume is required",
        },
        {
          status: 400,
        }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // Upload PDF to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "InterviewAI/Resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    // Extract PDF text
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
    }).promise;

    let resumeText = "";

    for (let page = 1; page <= pdf.numPages; page++) {
      const currentPage = await pdf.getPage(page);

      const content = await currentPage.getTextContent();

      const pageText = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");

      resumeText += pageText + "\n";
    }

    return NextResponse.json({
      success: true,
      resumeUrl: uploadResult.secure_url,
      resumeText,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload resume",
      },
      {
        status: 500,
      }
    );
  }
}