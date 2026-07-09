"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Bell, CalendarDays, Search } from "lucide-react";

function Topbar() {
  const { data: session } = useSession();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:h-24 lg:items-center lg:justify-between rounded-3xl border border-slate-200 bg-white p-5 lg:px-8 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back,{" "}
          <span className="text-blue-600">
            {session?.user?.name?.split(" ")[0] || "User"} 👋
          </span>
        </h1>

        <div className="mt-2 flex items-center gap-2 text-slate-500">
          <CalendarDays size={18} />

          <span>{today}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search interviews..."
            className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
          <Bell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        {/* User */}
       <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User"
              width={46}
              height={46}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-900">
              {session?.user?.name}
            </h3>

            <p className="text-sm text-slate-500">
              Candidate
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;