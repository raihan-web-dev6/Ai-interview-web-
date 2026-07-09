import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc = new URL(
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
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save PDF
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    // Extract text
    const pdf = await getDocument({
      data: new Uint8Array(buffer),
    }).promise;

    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");

      resumeText += pageText + "\n";
    }

    return NextResponse.json({
      success: true,
      resumeUrl: `/uploads/${fileName}`,
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