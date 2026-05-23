import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";
import Image from "next/image";
import {
  growthPlans,
  mainBuildTiers,
  modernizationServices,
  detailedServices,
  portfolioProjects,
  processSteps,
  reasons,
  servicePreviews,
  trustPoints,
  whatGoesIntoTheWork,
} from "@/lib/site-content";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#0B0B0C] text-[#F5F5F2]">
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesPreview />
        <PortfolioPreview />
        <ProcessSection />
        <PricingSection />
        <ServicesDetail />
        <AboutSection />
        <WhySection />
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
        <div className="fade-up">
          <p className="mb-5 inline-flex rounded-full border border-[#E6B8A2]/25 bg-[#E6B8A2]/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#E6B8A2]">
            MODERN DIGITAL STRATEGY
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#F5F5F2] sm:text-6xl lg:text-7xl">
            Intentionally crafted websites for businesses ready to grow.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#C9C9C3] sm:text-xl">
            Treydmark Tech helps small and medium-sized businesses build sharper
            websites, stronger branding, and a cleaner digital presence designed
            to turn visitors into real inquiries.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#E6B8A2] px-6 py-4 text-sm font-semibold text-[#0B0B0C] shadow-[0_0_34px_rgba(230,184,162,0.2)] transition hover:-translate-y-0.5 hover:bg-[#F1C8B8]"
            >
              Start a Project
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-4 text-sm font-semibold text-[#F5F5F2] transition hover:-translate-y-0.5 hover:border-[#E6B8A2]/45 hover:bg-white/[0.04]"
            >
              View Work
            </a>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="fade-up-delay relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-lg bg-[#E6B8A2]/8 blur-3xl" />
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
                <p className="font-mono text-2xl text-[#F5F5F2]">38%</p>
                <p className="mt-1 text-xs text-[#A1A1AA]">Lead clarity</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                <p className="font-mono text-2xl text-[#F5F5F2]">A+</p>
                <p className="mt-1 text-xs text-[#A1A1AA]">Structure</p>
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
    </div>
  );
}

function TrustStrip() {
  return (
    <section aria-label="Treydmark Tech value points" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl gap-px px-5 py-4 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center gap-3 py-4">
            <span className="size-2 rounded-full bg-[#E6B8A2]" />
            <p className="text-sm font-medium text-[#E6E6E1]">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="The right web foundation for where your business is now."
      copy="Whether the next step is a sharper redesign, a new website, or a more tailored platform, every build is structured around clarity, usability, and long-term business value."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {servicePreviews.map((service) => (
          <article
            key={service.title}
            className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[#E6B8A2]/35 hover:bg-white/[0.055]"
          >
            <p className="text-sm text-[#E6B8A2]">{service.audience}</p>
            <h3 className="mt-4 text-2xl font-semibold text-[#F5F5F2]">
              {service.title}
            </h3>
            <p className="mt-4 min-h-24 text-sm leading-6 text-[#BDBDB7]">
              {service.description}
            </p>
            <ul className="mt-6 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-[#D7D7D1]">
                  <span className="mt-2 h-px w-4 bg-[#E6B8A2]" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-7 inline-flex text-sm font-semibold text-[#F5F5F2] transition group-hover:text-[#E6B8A2]"
            >
              Discuss this service
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

function PortfolioPreview() {
  return (
    <Section
      id="work"
      eyebrow="Recent Work"
      title="Thoughtfully crafted websites for brands, creatives, and growing businesses."
      copy="A curated collection of completed work focused on thoughtful design, intuitive user experience, and real business impact."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {portfolioProjects.map((project, index) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-lg border border-white/10 bg-[#101011] transition hover:-translate-y-1 hover:border-[#E6B8A2]/35"
          >
            {project.href ? (
              <div className="relative border-b border-white/10 bg-[#0B0B0C] p-5">
                <div className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_22%_10%,rgba(230,184,162,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%)]" />
                <div className="relative isolate overflow-hidden rounded-md border border-white/10 bg-[#09090A] shadow-[0_18px_45px_rgba(0,0,0,0.35)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/[0.03]">
                  <div className="relative overflow-hidden rounded-t-[inherit] border-b border-white/10 bg-[linear-gradient(180deg,rgba(26,26,28,0.98),rgba(15,15,17,0.95))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-1px_0_rgba(0,0,0,0.35)] backdrop-blur-sm">
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
                      <span className="truncate font-mono">jw-xperience.com</span>
                    </a>
                    <div className="flex-1" />
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full border border-[#E6B8A2]/15 bg-[#E6B8A2]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9B19E] transition hover:border-[#E6B8A2]/24 hover:bg-[#E6B8A2]/11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B8A2]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                    >
                      Live Site
                    </a>
                    </div>
                  </div>
                  <div className="relative h-[336px] overflow-hidden border-t border-white/[0.03] bg-[#050506] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_18px_30px_rgba(0,0,0,0.14)] before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_22px_30px_rgba(0,0,0,0.18),inset_0_-22px_28px_rgba(0,0,0,0.12)] sm:h-[400px] lg:h-[500px]">
                    <iframe
                      src={project.href}
                      title={`${project.title} website preview`}
                      className="h-full w-full border-0 bg-white"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-b-[inherit] flex items-center justify-between gap-3 border-t border-white/10 bg-[#0F0F10] px-4 py-3">
                    <p className="text-xs leading-5 text-[#8F8F89]">
                      If this preview does not load on your device, open the site in a new tab.
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-medium text-[#E6B8A2] transition hover:text-[#F1C8B8]"
                    >
                      Open Site
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
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-[#E6B8A2] transition hover:text-[#F1C8B8]"
                >
                  Visit Site
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section
      id="process"
      eyebrow="Process"
      title="A clear path from concept and planning to confident launch."
      copy="The process keeps decisions clear, practical, and collaborative so the final site stays aligned with the goals of the business and the people behind it."
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
      eyebrow="Project Investment"
      title="Custom websites, redesigns, and growth partnerships."
      copy="Treydmark Tech builds modern React and Next.js websites, migrations, and web platforms for businesses that need more than a generic drag-and-drop template. Every project is scoped around the business goal, technical needs, and long-term direction."
    >
      <div className="rounded-lg border border-[#E6B8A2]/20 bg-[#E6B8A2]/8 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E6B8A2]">
          NOTE ON PRICING
        </p>
        <p className="mt-3 text-sm leading-6 text-[#D8D8D2]">
          Starting prices give a realistic entry point. Final investment depends on scope, timeline, integrations, content, and functionality. Larger or specialized builds are quoted custom.
        </p>
      </div>

      <PricingGroup
        eyebrow="Main Build Tiers"
        title="Modern custom builds for serious presentation and scalable growth."
        items={mainBuildTiers}
        columns="three"
      />

      <PricingGroup
        eyebrow="Redesign / Modernization"
        title="Upgrade an existing site into a stronger long-term foundation."
        items={modernizationServices}
        columns="two"
      />

      <PricingGroup
        eyebrow="Ongoing Care / Growth Plans"
        title="Recurring support for infrastructure, optimization, and active iteration."
        items={growthPlans}
        columns="three"
      />
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
}: {
  eyebrow: string;
  title: string;
  items: PricingItem[];
  columns: "two" | "three";
}) {
  const gridClassName =
    columns === "two" ? "grid gap-5 lg:grid-cols-2" : "grid gap-5 lg:grid-cols-3";

  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E6B8A2]">
            {eyebrow}
          </p>
          <h3 className="mt-2 max-w-5xl text-2xl font-semibold leading-tight text-[#F5F5F2]">
            {title}
          </h3>
        </div>
      </div>
      <div className={gridClassName}>
        {items.map((item) => (
          <PricingCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function PricingCard({ item }: { item: PricingItem }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-[#101011] p-6 transition hover:-translate-y-1 hover:border-[#E6B8A2]/35 hover:bg-white/[0.045]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1A1AA]">
        {item.bestFor ? "Best For" : "Good For"}
      </p>
      <p className="mt-3 min-h-16 text-sm leading-6 text-[#C9C9C3]">
        {item.bestFor || item.goodFor}
      </p>
      <div className="mt-6 border-t border-white/10 pt-6">
        <h4 className="text-2xl font-semibold text-[#F5F5F2]">{item.name}</h4>
        <p className="mt-3 text-3xl font-semibold text-[#E6B8A2]">
          {item.startingAt}
        </p>
        <p className="mt-4 text-sm leading-6 text-[#BDBDB7]">
          {item.positioning}
        </p>
      </div>
      <ul className="mt-6 grid gap-3">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-[#D7D7D1]">
            <span className="mt-2 h-px w-4 shrink-0 bg-[#E6B8A2]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ServicesDetail() {
  return (
    <Section
      id="service-detail"
      eyebrow="Beyond the Website"
      title="More than a new coat of paint."
      copy="Treydmark Tech can handle the public-facing brand layer and the technical systems behind it, so the site can grow with the business."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {detailedServices.map((service) => (
          <div
            key={service}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-base font-medium text-[#F5F5F2]"
          >
            {service}
          </div>
        ))}
      </div>
    </Section>
  );
}

function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Technical depth paired with thoughtful design."
      copy="Treydmark Tech combines exceptional engineering, thoughtful design, and practical business strategy to build websites that perform as well as they look."
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
          <p className="mt-5 text-base leading-8 text-[#C9C9C3]">
            My focus is building websites that feel polished, perform well,
            and communicate clearly. Having a background in software engineering and
            product development allows me to approach projects from both the
            technical and visual side. Beyond design, I value usability,
            performance, responsive layouts, SEO foundations, and the systems
            underneath the site that support long-term growth.
            <br /><br />
            I’ve worked across enterprise and product-focused environments
            building scalable systems, APIs, frontend applications, and
            user-facing tools. That experience now carries into client work
            focused on helping businesses, brands, and creatives present
            themselves more clearly online.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-[#F5F5F2]">
                What Goes Into the Work
              </h4>
              <ul className="mt-4 space-y-3">
                {whatGoesIntoTheWork.map((item) => (
                  <li key={item} className="text-sm leading-6 text-[#BDBDB7]">
                    {item}
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
                className="group mt-4 block rounded-lg border border-white/10 bg-[#0F0F10] p-4 transition hover:border-[#E6B8A2]/35 hover:bg-white/[0.045]"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[1275/1651] overflow-hidden rounded-md border border-[#E6B8A2]/20 bg-[#151516] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                    <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-[#0F0F10]/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E6B8A2] backdrop-blur-sm">
                      PDF
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,184,162,0.08),transparent_38%)]" />
                    <div className="absolute inset-[0.7rem] overflow-hidden rounded-[0.55rem] border border-black/10">
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

function WhySection() {
  return (
    <section className="bg-[#F5F5F2] text-[#0B0B0C]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8A6555]">
            Why Treydmark Tech
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            A better online presence without agency drag.
          </h2>
        </div>
        <div className="grid gap-4">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="rounded-lg border border-[#0B0B0C]/10 bg-white p-5 shadow-sm"
            >
              <p className="text-base font-medium">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 translate-x-1/3 rounded-full bg-[#E6B8A2]/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E6B8A2]">
            Start a project
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-[#F5F5F2] sm:text-5xl">
            Ready to modernize your online presence?
          </h2>
          <p className="mt-5 text-base leading-8 text-[#C9C9C3]">
            Tell me where your business is now and where you want your online
            presence to go. The first conversation is about fit, scope, and the
            clearest next move.
          </p>
        </div>
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
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E6B8A2]">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-[#F5F5F2] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#C9C9C3]">{copy}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
