import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/SessionProvider";


const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview-AI | AI Interview Platform",
  description: "AI-powered interview practice made by Raihan Developer platform built with Next.js, TypeScript, MongoDB, NextAuth, and Gemini AI. Practice technical interviews with AI-generated questions, voice answers, detailed feedback, scoring, and interview history..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white text-black `}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}