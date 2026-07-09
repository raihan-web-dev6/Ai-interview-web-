"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  History,
  User,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}

      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow lg:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <BrainCircuit className="text-blue-600" />

          <span className="font-bold">
            InterviewAI
          </span>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
fixed top-0 left-0 z-50 h-screen w-72 border-r bg-white
transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"}
lg:translate-x-0
`}
      >
        {/* Close */}

        <div className="flex items-center justify-between border-b p-6 lg:hidden">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-blue-600" />

            <span className="font-bold text-lg">
              InterviewAI
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Logo */}

        <div className="hidden border-b p-6 lg:block">
          <Link
            href="/dashboard"
            className="flex items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <BrainCircuit size={30} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                InterviewAI
              </h2>

              <p className="text-sm text-slate-500">
                AI Interview Agent
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}

        <nav className="space-y-2 p-5">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <Icon size={22} />

                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Card */}

        <div className="m-5 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
          <div className="flex items-center gap-3">
            <Sparkles />

            <div>
              <h3 className="font-semibold">
                Daily Interviews
              </h3>

              <p className="text-sm text-blue-100">
                3 per day
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-4xl font-bold">
                3
              </p>

              <p className="text-sm text-blue-100">
                Upgrade for unlimited
              </p>
            </div>

            <div className="rounded-xl bg-white/20 px-3 py-2">
              Free
            </div>
          </div>
        </div>

        {/* Logout */}

        <div className="border-t p-5">
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-red-600 hover:bg-red-50"
          >
            <LogOut />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}