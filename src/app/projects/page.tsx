import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MotionReveal } from "@/components/site/Motion";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { portfolioProjects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects | Treydmark Tech",
  description:
    "Explore selected Treydmark Tech websites for real estate, live music, education, and local services.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div id="top" className="min-h-[100svh] bg-[#0B0B0C] text-[#F5F5F2]">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pt-40 lg:px-10 lg:pb-32">
          <div className="site-grid absolute inset-0 -z-20 opacity-60" />
          <div className="absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E6B8A2]/10 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-12 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E6B8A2]">
                Selected Work
              </p>
              <h1 className="mt-4 text-[2.75rem] font-semibold leading-[1.04] sm:text-6xl">
                Projects built for the people behind them.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#C9C9C3] sm:text-lg">
                Websites shaped around each client’s identity, audience, and next
                step. Explore the live sites below.
              </p>
            </MotionReveal>
            <PortfolioGrid projects={portfolioProjects} headingLevel="h2" />
            <div className="mt-14 flex flex-col gap-5 rounded-lg border border-[#E6B8A2]/20 bg-[#E6B8A2]/[0.045] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-2xl font-semibold">Have a project in mind?</h2>
                <p className="mt-2 text-sm leading-6 text-[#BDBDB7]">
                  Tell me what you’re building and what it needs to accomplish.
                </p>
              </div>
              <Link
                href="/#contact"
                className="interactive-button inline-flex shrink-0 items-center justify-center rounded-full bg-[#E6B8A2] px-6 py-3 text-sm font-semibold text-[#0B0B0C] hover:bg-[#F1C8B8]"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
