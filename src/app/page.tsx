import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";
import {
  MotionAnchor,
  MotionCard,
  MotionReveal,
  MotionStagger,
} from "@/components/site/Motion";
import Image from "next/image";
import {
  growthPlans,
  mainBuildTiers,
  modernizationServices,
  portfolioProjects,
  processSteps,
  servicePreviews,
  whatGoesIntoTheWork,
} from "@/lib/site-content";

export default function Home() {
  return (
    <div id="top" className="min-h-[100svh] bg-[#0B0B0C] text-[#F5F5F2]">
      <Header />
      <main>
        <HeroSection />
        <PortfolioPreview />
        <AboutSection />
        <ServicesPreview />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      <div className="site-grid absolute inset-0 -z-20 opacity-70" />
      <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E6B8A2]/12 blur-3xl sm:h-96 sm:w-96" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-28">
        <MotionReveal>
          <p className="mb-5 inline-flex rounded-full border border-[#E6B8A2]/25 bg-[#E6B8A2]/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#E6B8A2]">
            MODERN DIGITAL STRATEGY
          </p>
          <h1 className="max-w-4xl text-[2.75rem] font-semibold leading-[1.04] text-[#F5F5F2] sm:text-6xl sm:leading-[1.02] lg:text-7xl lg:leading-[0.99]">
            Intentionally crafted websites for businesses ready to grow.
          </h1>
          <p className="mt-7 max-w-[40rem] text-lg leading-8 text-[#C9C9C3] sm:text-xl sm:leading-9">
            Treydmark Tech helps small and medium-sized businesses build sharper
            websites, stronger branding, and a cleaner digital presence designed
            to turn visitors into real inquiries.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <MotionAnchor
              href="#contact"
              className="interactive-button inline-flex items-center justify-center rounded-full bg-[#E6B8A2] px-6 py-4 text-sm font-semibold text-[#0B0B0C] shadow-[0_0_34px_rgba(230,184,162,0.2)] hover:bg-[#F1C8B8]"
            >
              Start a Project
            </MotionAnchor>
            <MotionAnchor
              href="#work"
              className="interactive-button secondary-cta inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-4 text-sm font-semibold text-[#F5F5F2] hover:bg-white/[0.04]"
            >
              View Work
            </MotionAnchor>
          </div>
        </MotionReveal>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <MotionReveal delay={0.1} className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-3 rounded-lg bg-[#E6B8A2]/8 blur-3xl sm:-inset-6" />
      <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#111113]/92 p-4 shadow-2xl shadow-black/50">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex gap-2">
            <span className="size-2.5 rounded-full bg-[#E6B8A2]" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/12" />
          </div>
          <span className="font-mono text-xs text-[#A1A1AA]">
            treydmark.tech/build
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-[#0B0B0C] p-5">
            <div className="h-3 w-24 rounded-full bg-[#E6B8A2]/70" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded-full bg-white/80" />
              <div className="h-4 w-4/5 rounded-full bg-white/55" />
              <div className="h-4 w-2/3 rounded-full bg-white/25" />
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-[#E6B8A2]/20 bg-[#E6B8A2]/10 p-3">
                <p className="font-mono text-xl text-[#F5F5F2]">Clear</p>
                <p className="mt-1 text-xs text-[#A1A1AA]">Inquiry path</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                <p className="font-mono text-xl text-[#F5F5F2]">Modular</p>
                <p className="mt-1 text-xs text-[#A1A1AA]">Page structure</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#A1A1AA]">
                SEO foundation
              </p>
              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-[#E6B8A2]/80" />
                <div className="h-2 w-5/6 rounded-full bg-white/25" />
                <div className="h-2 w-2/3 rounded-full bg-white/14" />
              </div>
            </div>
            <div className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0C]">
              <div className="hero-line absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-[#E6B8A2] to-transparent" />
              <div className="hero-line absolute left-0 top-2/3 h-px w-full bg-gradient-to-r from-transparent via-white/35 to-transparent [animation-delay:1.2s]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-white/[0.04] p-3">
                <p className="text-sm font-medium text-[#F5F5F2]">
                  Brand refresh in progress
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Cleaner hierarchy, sharper offer, faster path to contact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}

function ServicesPreview() {
  return (
    <Section
      id="services"
      className="section-soft-transition section-vertical-texture pt-24 pb-28 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40"
      eyebrow="Services"
      title="Practical web systems built for real business needs."
      copy="Websites, booking flows, ecommerce, and internal tools shaped around how the business actually operates."
    >
      <MotionStagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicePreviews.map((service, index) => (
          <MotionCard
            key={service.title}
            className="interactive-card group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1A1AA]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <span className="h-px w-10 bg-[#E6B8A2]/45 transition group-hover:w-14 group-hover:bg-[#E6B8A2]" />
            </div>
            <h3 className="text-xl font-semibold text-[#F5F5F2]">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#BDBDB7]">
              {service.description}
            </p>
            <ul className="mt-5 grid gap-2.5 border-t border-white/10 pt-5">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm leading-6 text-[#D7D7D1]"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-[#E6B8A2]"
                  />
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
          </MotionCard>
        ))}
      </MotionStagger>
    </Section>
  );
}

function PortfolioPreview() {
  return (
    <Section
      id="work"
      className="section-soft-transition section-vertical-texture py-20 lg:py-32"
      eyebrow="Selected Work"
      title="Thoughtfully designed websites for brands, creatives, and growing businesses."
      copy="Selected work across real estate, media, creative, and service-focused brands."
    >
      <MotionStagger className="grid gap-5 lg:grid-cols-2">
        {portfolioProjects.map((project, index) => (
          <MotionCard
            key={project.title}
            className={`interactive-card group overflow-hidden rounded-lg border border-white/10 bg-[#101011] ${
              project.featured ? "lg:col-span-2" : ""
            }`}
          >
            {project.href ? (
              <div className="relative border-b border-white/10 bg-[#0B0B0C] p-5">
                <div className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_22%_10%,rgba(230,184,162,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%)]" />
                <div className="browser-preview-shell relative isolate overflow-hidden rounded-md border border-white/10 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/[0.03]">
                  <div className="browser-chrome relative overflow-hidden rounded-t-[inherit] border-b border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-1px_0_rgba(0,0,0,0.35)] backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#5A302A] transition group-hover:bg-[#C96B5A]" />
                      <span className="size-1.5 rounded-full bg-[#65512B] transition group-hover:bg-[#D6AE59]" />
                      <span className="size-1.5 rounded-full bg-[#2B5735] transition group-hover:bg-[#55B46D]" />
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full max-w-[340px] min-w-0 items-center gap-2 rounded-full border border-white/8 bg-[#0F1011] px-3 py-1.5 text-[11px] text-[#8E8E89] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition hover:border-white/14 hover:text-[#CFCFC8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
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
                      <span className="truncate font-mono">{getProjectHost(project.href)}</span>
                    </a>
                    <div className="flex-1" />
                    <MotionAnchor
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-button secondary-cta shrink-0 rounded-full border border-[#E6B8A2]/15 bg-[#E6B8A2]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9B19E] hover:bg-[#E6B8A2]/11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                    >
                      View Live Site
                    </MotionAnchor>
                    </div>
                  </div>
                  <MobilePortfolioFallback project={project} />
                  <div className="browser-stage relative hidden h-[400px] overflow-hidden border-t border-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_18px_30px_rgba(0,0,0,0.14)] before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_22px_30px_rgba(0,0,0,0.18),inset_0_-22px_28px_rgba(0,0,0,0.12)] sm:block lg:h-[500px]">
                    <iframe
                      src={getProjectPreviewHref(project)}
                      title={`${project.title} website preview`}
                      className="h-full w-full border-0 bg-white"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-b-[inherit] flex items-center justify-between gap-3 border-t border-white/10 bg-[#0F0F10] px-4 py-3">
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
            ) : (
              <div className="relative h-64 overflow-hidden border-b border-white/10 bg-[#0B0B0C]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(230,184,162,0.22),transparent_34%),linear-gradient(135deg,rgba(245,245,242,0.1),transparent_45%)]" />
                <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-md border border-white/10 bg-[#111113]/88 p-3">
                  <span className="text-xs text-[#A1A1AA]">Before</span>
                  <span className="text-xs text-[#E6B8A2]">After</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                  <div className="rounded-md border border-white/10 bg-black/35 p-4">
                    <div className="h-3 w-16 rounded-full bg-white/18" />
                    <div className="mt-4 space-y-2">
                      <div className="h-2 rounded-full bg-white/12" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    </div>
                  </div>
                  <div className="rounded-md border border-[#E6B8A2]/25 bg-[#E6B8A2]/10 p-4 shadow-[0_0_30px_rgba(230,184,162,0.1)]">
                    <div className="h-3 w-20 rounded-full bg-[#E6B8A2]/80" />
                    <div className="mt-4 space-y-2">
                      <div className="h-2 rounded-full bg-white/45" />
                      <div className="h-2 w-4/5 rounded-full bg-white/25" />
                      <div className="h-2 w-3/5 rounded-full bg-white/18" />
                    </div>
                  </div>
                </div>
                <span className="absolute left-6 top-20 font-mono text-sm text-white/30">
                  0{index + 1}
                </span>
              </div>
            )}
            <div className="p-6">
              <p className="text-sm text-[#E6B8A2]">{project.type}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F5F5F2]">
                {project.title}
              </h3>
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
              {project.href ? (
                <MotionAnchor
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-button secondary-cta mt-6 inline-flex rounded-full border border-[#E6B8A2]/15 px-4 py-2 text-sm font-semibold text-[#E6B8A2] hover:bg-[#E6B8A2]/8 hover:text-[#F1C8B8]"
                >
                  View Live Site
                </MotionAnchor>
              ) : null}
            </div>
          </MotionCard>
        ))}
      </MotionStagger>
    </Section>
  );
}

function MobilePortfolioFallback({
  project,
}: {
  project: (typeof portfolioProjects)[number];
}) {
  return (
    <div className="browser-stage relative overflow-hidden border-t border-white/[0.03] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_18px_30px_rgba(0,0,0,0.14)] before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_22px_30px_rgba(0,0,0,0.18),inset_0_-22px_28px_rgba(0,0,0,0.12)] sm:hidden">
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#080809] shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#111113]/95 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-[#C96B5A]" />
            <span className="size-1.5 rounded-full bg-[#D6AE59]" />
            <span className="size-1.5 rounded-full bg-[#55B46D]" />
          </div>
          <div className="ml-2 min-w-0 flex-1 rounded-full border border-white/8 bg-[#0B0B0C] px-3 py-1.5">
            <p className="truncate font-mono text-[10px] text-[#8E8E89]">
              {getProjectHost(project.href)}
            </p>
          </div>
        </div>
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

function ProcessSection() {
  return (
    <Section
      id="process"
      className="relative border-y border-[#E6B8A2]/[0.06] bg-[#100F0E] py-28 sm:py-32 lg:py-40"
      eyebrow="Process"
      title="A clear path from first conversation to launch."
      copy="Four stages keep scope, decisions, and delivery focused."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((item) => (
          <article
            key={item.step}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="font-mono text-sm text-[#E6B8A2]">{item.step}</p>
            <h3 className="mt-5 text-xl font-semibold text-[#F5F5F2]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#BDBDB7]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section
      id="pricing"
      className="py-28 sm:py-32 lg:py-44"
      eyebrow="Project Investment"
      title="Investment shaped by scope, not templates."
      copy="Projects are scoped around goals, content, integrations, and technical complexity. Larger or specialized builds receive a tailored quote."
    >
      <div className="border-t border-white/10 pt-10">
        <PricingGroup
          eyebrow="New Builds"
          title="Websites and software designed for distinct stages of growth."
          items={mainBuildTiers}
          columns="three"
        />

        <PricingGroup
          eyebrow="Redesign & Migration"
          title="A stronger system for an existing digital presence."
          items={modernizationServices}
          columns="two"
          isSecondary
        />
      </div>

      <div className="mt-20 border-t border-[#E6B8A2]/20 pt-10">
        <PricingSubsectionIntro
          eyebrow="Ongoing Support"
          title="Care after launch, from maintenance to active development."
          copy="Choose steady site care, ongoing optimization, or a closer development partnership."
        />
        <MotionStagger className="mt-8 grid gap-5 lg:grid-cols-3">
          {growthPlans.map((item) => (
            <PricingCard key={item.name} item={item} />
          ))}
        </MotionStagger>
      </div>
    </Section>
  );
}

type PricingItem = {
  name: string;
  startingAt: string;
  bestFor?: string;
  goodFor?: string;
  positioning: string;
  features: string[];
};

function PricingGroup({
  eyebrow,
  title,
  items,
  columns,
  isSecondary = false,
}: {
  eyebrow: string;
  title: string;
  items: PricingItem[];
  columns: "two" | "three";
  isSecondary?: boolean;
}) {
  const gridClassName =
    columns === "two" ? "grid gap-5 lg:grid-cols-2" : "grid gap-5 lg:grid-cols-3";

  return (
    <div className={isSecondary ? "mt-14" : "mt-8"}>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E6B8A2]">
            {eyebrow}
          </p>
          <h3 className="mt-3 max-w-4xl text-2xl font-semibold leading-[1.08] text-[#F5F5F2] sm:text-3xl lg:leading-[1.03]">
            {title}
          </h3>
        </div>
      </div>
      <MotionStagger className={gridClassName}>
        {items.map((item) => (
          <PricingCard key={item.name} item={item} />
        ))}
      </MotionStagger>
    </div>
  );
}

function PricingSubsectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6B8A2]">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-3xl font-semibold leading-[1.07] text-[#F5F5F2] sm:text-4xl lg:leading-[1.02]">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[#BDBDB7]">{copy}</p>
    </div>
  );
}

function PricingCard({ item }: { item: PricingItem }) {
  const visibleFeatures = item.features.slice(0, 5);

  return (
    <MotionCard className="interactive-card flex h-full flex-col rounded-lg border border-white/10 bg-[#101011] p-6 hover:bg-white/[0.045] sm:p-7">
      <h4 className="text-2xl font-semibold text-[#F5F5F2]">{item.name}</h4>
      <p className="mt-3 text-3xl font-semibold text-[#E6B8A2]">
        {item.startingAt}
      </p>
      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1A1AA]">
          Best For
        </p>
        <p className="mt-3 text-sm leading-6 text-[#C9C9C3]">
          {item.bestFor || item.goodFor}
        </p>
        <p className="mt-4 text-sm leading-6 text-[#BDBDB7]">
          {item.positioning}
        </p>
      </div>
      <ul className="mt-6 grid gap-2.5">
        {visibleFeatures.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 text-sm leading-6 text-[#D7D7D1]"
          >
            <span
              aria-hidden="true"
              className="h-px w-4 shrink-0 bg-[#E6B8A2]"
            />
            <span className="min-w-0">{feature}</span>
          </li>
        ))}
      </ul>
    </MotionCard>
  );
}

function AboutSection() {
  return (
    <Section
      id="about"
      className="section-soft-transition section-vertical-texture py-20 lg:py-32"
      eyebrow="About"
      title="Founder-led work. Product-level standards."
      copy="Treydmark Tech is a founder-led web and software studio combining engineering experience, design judgment, and practical business thinking."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start rounded-lg border border-white/10 bg-[#101011] p-6">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-[#E6B8A2]/20 bg-[#0B0B0C]">
            <Image
              src="/about-photo.png"
              alt="Trey, the founder of Treydmark Tech"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-contain"
              loading="eager"
            />
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-[#F5F5F2]">
            I&apos;m Trey, the founder of Treydmark Tech.
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9C9C3]">
            I build websites and digital tools that communicate clearly, perform
            reliably, and remain maintainable as the business evolves. My
            background in software engineering and product development helps me
            consider both the visible experience and the systems behind it.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9C9C3]">
            I’ve worked across enterprise and product environments building APIs,
            frontend applications, internal systems, and customer-facing products.
            I bring that same technical discipline to every client project.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-[#F5F5F2]">
                What Goes Into the Work
              </h4>
              <ul className="mt-4 space-y-3">
                {whatGoesIntoTheWork.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-sm leading-6 text-[#BDBDB7]"
                  >
                    <span
                      className="inline-flex size-5 shrink-0 items-center justify-center text-[#E6B8A2]"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5 drop-shadow-[0_0_8px_rgba(230,184,162,0.22)]"
                        fill="none"
                      >
                        <g fill="currentColor">
                          <circle cx="12" cy="4" r="1.45" />
                          <circle cx="16" cy="5.07" r="1.45" />
                          <circle cx="18.93" cy="8" r="1.45" />
                          <circle cx="20" cy="12" r="1.45" />
                          <circle cx="18.93" cy="16" r="1.45" />
                          <circle cx="16" cy="18.93" r="1.45" />
                          <circle cx="12" cy="20" r="1.45" />
                          <circle cx="8" cy="18.93" r="1.45" />
                          <circle cx="5.07" cy="16" r="1.45" />
                          <circle cx="4" cy="12" r="1.45" />
                          <circle cx="5.07" cy="8" r="1.45" />
                          <circle cx="8" cy="5.07" r="1.45" />
                        </g>
                      </svg>
                    </span>
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F5F5F2]">
                Background &amp; Experience
              </h4>
              <a
                href="/documents/HLB3_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Trey Bryant resume PDF"
                className="interactive-card group mt-4 block rounded-lg border border-white/10 bg-[#0F0F10] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.22)] hover:bg-white/[0.045]"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[1275/1651] overflow-hidden rounded-md border border-[#E6B8A2]/20 bg-[#151516] shadow-[0_22px_48px_rgba(0,0,0,0.38)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,transparent_58%,rgba(0,0,0,0.24))]">
                    <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-[#0F0F10]/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E6B8A2] backdrop-blur-sm">
                      PDF
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,184,162,0.08),transparent_38%)]" />
                    <div className="absolute inset-[0.45rem] overflow-hidden rounded-[0.55rem] border border-black/10 shadow-[0_8px_22px_rgba(0,0,0,0.22)]">
                      <Image
                        src="/documents/HLB3_Resume-thumb.png"
                        alt="Preview of Trey Bryant resume"
                        width={1275}
                        height={1651}
                        className="h-full w-full object-contain object-top"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#E6B8A2] transition group-hover:text-[#F1C8B8]">
                    View Resume →
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-40">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E6B8A2]/10 blur-3xl sm:left-auto sm:right-0 sm:h-96 sm:w-96 sm:translate-x-1/3" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <MotionReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E6B8A2]">
            Start a project
          </p>
          <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.06] text-[#F5F5F2] sm:text-5xl lg:leading-[1.02]">
            Let’s talk about what needs to change.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9C9C3]">
            Share where the site stands, what is not working, and what the next
            version needs to accomplish.
          </p>
        </MotionReveal>
        <ContactForm />
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  copy,
  children,
  className = "py-20 lg:py-32",
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-12 max-w-[46rem]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E6B8A2]">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.06] text-[#F5F5F2] sm:text-5xl lg:leading-[1.02]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9C9C3]">{copy}</p>
        </MotionReveal>
        {children}
      </div>
    </section>
  );
}
