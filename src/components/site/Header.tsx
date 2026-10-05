"use client";

import { useState } from "react";
import Link from "next/link";

import { navItems } from "@/lib/site-content";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0B0C]/88 shadow-[0_1px_0_rgba(255,255,255,0.025),0_14px_42px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-[#E6B8A2]/35 bg-[#E6B8A2]/10 text-sm font-semibold text-[#F5F5F2] shadow-[0_0_32px_rgba(230,184,162,0.14)]">
            TT
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-[#F5F5F2]">
              Treydmark Tech
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#A1A1AA]">
              DESIGN • DEVELOPMENT • STRATEGY
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#A1A1AA] transition hover:text-[#F5F5F2]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="interactive-button hidden rounded-full bg-[#E6B8A2] px-5 py-3 text-sm font-semibold text-[#0B0B0C] shadow-[0_0_28px_rgba(230,184,162,0.16)] hover:bg-[#F1C8B8] lg:inline-flex"
        >
          Start a Project
        </Link>

        <div className="relative lg:hidden">
          <button
            type="button"
            aria-controls="mobile-navigation-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="interactive-button flex size-11 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#F5F5F2]"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? "Close" : "Open"} navigation menu
            </span>
            <span className="relative h-3.5 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-current transition ${
                  isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-current transition ${
                  isMobileMenuOpen ? "bottom-2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
          {isMobileMenuOpen ? (
            <div
              id="mobile-navigation-menu"
              className="absolute right-0 mt-4 w-64 rounded-lg border border-white/10 bg-[#111113] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.42),0_0_24px_rgba(230,184,162,0.055)]"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm text-[#D9D9D6] transition hover:bg-white/[0.04] hover:text-[#F5F5F2]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="interactive-button mt-2 flex items-center justify-center rounded-md bg-[#E6B8A2] px-4 py-3 text-sm font-semibold text-[#0B0B0C] hover:bg-[#F1C8B8]"
              >
                Start a Project
              </Link>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
