import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  try {
    console.log("========== CLOUDINARY DEBUG ==========");

    console.log({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret_exists: process.env.CLOUDINARY_API_SECRET,
    });

    // -------------------------------
    // Test Cloudinary FIRST
    // -------------------------------

    try {
      const testUpload = await cloudinary.uploader.upload(
        "data:text/plain;base64,SGVsbG8gQ2xvdWRpbmFyeQ==",
        {
          folder: "InterviewAI/Test",
          resource_type: "auto",
        }
      );

      console.log("TEST UPLOAD SUCCESS");
      console.log(testUpload.secure_url);
    } catch (err) {
      console.error("TEST UPLOAD FAILED");
      console.dir(err, { depth: null });

      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary test upload failed",
          error: err,
        },
        {
          status: 500,
        }
      );
    }

    // -------------------------------
    // Read uploaded PDF
    // -------------------------------

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

    // -------------------------------
    // Upload PDF
    // -------------------------------

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "InterviewAI/Resumes",
          resource_type: "auto",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          console.log("UPLOAD CALLBACK");

          console.log("Cloudinary Error:", error);
          console.log("Cloudinary Result:", result);

          if (error) return reject(error);

          resolve(result);
        }
      );

      stream.end(buffer);
    });

    // -------------------------------
    // Parse PDF
    // -------------------------------

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
  try {
    text += decodeURIComponent(run.T) + " ";
  } catch {
    // Some PDFs contain malformed encoded text.
    // If decoding fails, use the raw text instead.
    text += run.T + " ";
  }
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
    console.error("FINAL ERROR");
    console.dir(error, { depth: null });

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload resume",
        error,
      },
      {
        status: 500,
      }
    );
  }
}