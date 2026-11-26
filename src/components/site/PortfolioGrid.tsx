import Image from "next/image";
import { LivePortfolioPreview } from "@/components/site/LivePortfolioPreview";
import { MotionAnchor, MotionCard, MotionStagger } from "@/components/site/Motion";
import type { PortfolioProject } from "@/lib/site-content";

export function PortfolioGrid({
  projects,
  headingLevel = "h3",
}: {
  projects: readonly PortfolioProject[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <MotionStagger
      className="grid gap-5 lg:grid-cols-2"
      viewport={{ once: true, amount: 0.05 }}
    >
      {projects.map((project) => (
        <MotionCard
          key={project.title}
          className={`interactive-card group overflow-hidden rounded-lg border border-white/10 bg-[#101011] ${
            project.featured ? "lg:col-span-2" : ""
          }`}
        >
          <div className="relative border-b border-white/10 bg-[#0B0B0C] p-5">
            <div className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_22%_10%,rgba(230,184,162,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%)]" />
            <div className="browser-preview-shell relative isolate overflow-hidden rounded-md border border-white/10">
              <div className="browser-chrome relative overflow-hidden rounded-t-[inherit] border-b border-white/10 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-1px_0_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div aria-hidden="true" className="hidden shrink-0 items-center gap-1.5 sm:flex">
                    <span className="size-1.5 rounded-full bg-[#5A302A] transition group-hover:bg-[#C96B5A]" />
                    <span className="size-1.5 rounded-full bg-[#65512B] transition group-hover:bg-[#D6AE59]" />
                    <span className="size-1.5 rounded-full bg-[#2B5735] transition group-hover:bg-[#55B46D]" />
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full min-w-0 items-center gap-2 rounded-full border border-white/8 bg-[#0F1011] px-3 py-1.5 text-[10px] text-[#8E8E89] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition hover:border-white/14 hover:text-[#CFCFC8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] sm:text-[11px]"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 shrink-0 text-[#A27D6D]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                    </svg>
                    <span className="truncate font-mono" title={getProjectHost(project.href)}>
                      {getProjectHost(project.href)}
                    </span>
                  </a>
                </div>
              </div>
              <MobilePortfolioFallback project={project} />
              <LivePortfolioPreview src={getProjectPreviewHref(project)} title={project.title} />
              <div className="relative hidden overflow-hidden rounded-b-[inherit] items-center justify-between gap-3 border-t border-white/10 bg-[#0F0F10] px-4 py-3 sm:flex">
                <p className="text-xs leading-5 text-[#8F8F89]">
                  Preview unavailable? View the live site.
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-[#E6B8A2] transition hover:bg-white/[0.045] hover:text-[#F1C8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                >
                  View Live Site
                </a>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-[#E6B8A2]">{project.type}</p>
            <Heading className="mt-3 text-2xl font-semibold text-[#F5F5F2]">
              {project.title}
            </Heading>
            <p className="mt-3 text-sm leading-6 text-[#BDBDB7]">
              {project.summary}
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#A1A1AA]">
              {project.tone}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D9D9D3]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <MotionAnchor
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-button secondary-cta mt-6 inline-flex rounded-full border border-[#E6B8A2]/15 px-4 py-2 text-sm font-semibold text-[#E6B8A2] hover:bg-[#E6B8A2]/8 hover:text-[#F1C8B8]"
            >
              View Live Site
            </MotionAnchor>
          </div>
        </MotionCard>
      ))}
    </MotionStagger>
  );
}

function MobilePortfolioFallback({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="browser-stage relative overflow-hidden sm:hidden">
      <div className="relative aspect-[9/12] overflow-hidden bg-[#050506]">
        <Image
          src={getProjectMobilePreviewImage(project)}
          alt={`${project.title} mobile website preview`}
          fill
          sizes="(max-width: 639px) 90vw, 0px"
          className="object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035),inset_0_-28px_40px_rgba(0,0,0,0.18)]" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#0F0F10] px-3 py-3">
        <p className="text-xs leading-5 text-[#8F8F89]">
          Preview optimized for mobile.
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-[#E6B8A2] transition hover:bg-white/[0.045] hover:text-[#F1C8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
        >
          View Live Site
        </a>
      </div>
    </div>
  );
}

function getProjectPreviewHref(project: {
  href: string;
  iframeUrl?: string;
  previewHref?: string;
}) {
  return project.iframeUrl || project.previewHref || project.href;
}

function getProjectMobilePreviewImage(project: { mobilePreviewImage: string }) {
  return project.mobilePreviewImage;
}

function getProjectHost(href: string) {
  try {
    return new URL(href).hostname.replace(/^www[.]/, "");
  } catch {
    return href;
  }
}
