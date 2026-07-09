import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import PDFParser from "pdf2json";

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
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "InterviewAI/Resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      );

      stream.end(buffer);
    });

    // Parse PDF
    const resumeText: string = await new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        try {
          let text = "";

          pdfData.Pages.forEach((page: any) => {
            page.Texts.forEach((item: any) => {
              item.R.forEach((run: any) => {
                text += decodeURIComponent(run.T) + " ";
              });

              text += "\n";
            });

            text += "\n";
          });

          resolve(text);
        } catch (err) {
          reject(err);
        }
      });

      pdfParser.parseBuffer(buffer);
    });

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