"use client";

import Link from "next/link";
import { BrainCircuit, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";




function Navbar() {
    const [showuserpopup,setshouserwpopup]=useState(false)
    const [showloginpopup,setshowloginpopup]=useState(false)
    const { data: session, status } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);
const router = useRouter();
     // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setshouserwpopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 flex h-16 w-[95%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-5 shadow-xl backdrop-blur-xl">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
          <BrainCircuit size={22} />
        </div>

        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-slate-900">
            InterviewAI
          </h1>
          <p className="-mt-1 text-xs text-slate-500">
            AI Interview Agent
          </p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 md:flex">
        <Link
          href="#features"
          className="font-medium text-slate-600 transition hover:text-blue-600"
        >
          Features
        </Link>

        <Link
          href="#how-it-works"
          className="font-medium text-slate-600 transition hover:text-blue-600"
        >
          How It Works
        </Link>

        <Link
          href="#pricing"
          className="font-medium text-slate-600 transition hover:text-blue-600"
        >
          Pricing
        </Link>

        <Link
          href="#contact"
          className="font-medium text-slate-600 transition hover:text-blue-600"
        >
          Contact
        </Link>
      </nav>

      {/* Right Side */}
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/login"
          className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
        >
          Login
        </Link>

        <button
           onClick={() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
        >
          Get Started
        </button>

        {/* AVATAR */}
             <div className="relative" ref={dropdownRef}>
  {/* Avatar */}
  <div
    onClick={() => setshouserwpopup((prev) => !prev)}
    className="flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-600 text-lg font-bold text-white shadow-md transition hover:scale-105"
  >
    {session?.user?.image ? (
  <Image
    src={session.user.image}
    alt={session.user.name || "User"}
    width={44}
    height={44}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-blue-600 text-lg font-bold text-white">
    {session?.user?.name?.charAt(0).toUpperCase()}
  </div>
)}
  </div>

  {/* Dropdown */}
  {showuserpopup && (
    <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
            R
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {session?.user?.name || "Guest"}
            </h3>

            <p className="text-sm text-slate-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-2">

        <button className="flex w-full items-center rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100">
          Dashboard
        </button>

        <button className="flex w-full items-center rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100">
          My Profile
        </button>

        <button className="flex w-full items-center rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100">
          Interview History
        </button>

        <button className="flex w-full items-center rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100">
          Settings
        </button>

        <hr className="my-2" />

        <button
  onClick={() => {
    setshouserwpopup(false);

    signOut({
      callbackUrl: "/",
    });
  }}
  className="flex w-full items-center rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
>
  Logout
</button>

      </div>
    </div>
  )}
</div>
      </div>

      {/* Mobile Menu Button */}
      <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 md:hidden">
        <Menu size={22} className="text-slate-700" />
      </button>
    </header>
  );
}

export default Navbar;