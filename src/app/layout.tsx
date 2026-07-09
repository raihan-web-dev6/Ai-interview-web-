import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/SessionProvider";


const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewAI",
  description: "Practice technical interviews with AI.",
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