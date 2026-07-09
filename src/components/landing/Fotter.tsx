"use client";

import Link from "next/link";
import {
  BrainCircuit,
  
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                <BrainCircuit size={24} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                InterviewAI
              </h2>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Practice Smarter.
              <br />
              Interview Better.
            </p>

            <div className="mt-6 flex items-center gap-4">

              <Link
                href="https://github.com/"
                target="_blank"
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                github
              </Link>

              <Link
                href="https://linkedin.com/"
                target="_blank"
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                linkedin
              </Link>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="#features"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#pricing"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="#about"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  About
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Ready to Start?
            </h3>

            <p className="mb-6 text-slate-600">
              Practice AI-powered interviews and improve your confidence before your next job interview.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Get Started
              <ArrowUpRight size={18} />
            </Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 InterviewAI. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy"
              className="transition hover:text-blue-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-600"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-600"
            >
              Support
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;