import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import {
  carePlans,
  detailedServices,
  portfolioProjects,
  processSteps,
  projectTiers,
  reasons,
  resumeHighlights,
  servicePreviews,
  technicalSkills,
  trustPoints,
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
            Boutique creative-tech studio
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#F5F5F2] sm:text-6xl lg:text-7xl">
            Modern websites for businesses ready to grow.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#C9C9C3] sm:text-xl">
            Treydmark Tech helps small and medium-sized businesses modernize
            outdated sites, strengthen their brand, improve SEO foundations,
            and turn more visitors into qualified customer inquiries.
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
      copy="Whether the next move is a sharper redesign, a new website, or a more capable platform, the work is structured around credibility, clarity, and measurable business use."
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
      eyebrow="Portfolio structure"
      title="Visual project slots ready for real case studies."
      copy="These placeholders are built like client work, with space for problem, solution, services, tech, and outcomes as completed projects are added."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {portfolioProjects.map((project, index) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-lg border border-white/10 bg-[#101011] transition hover:-translate-y-1 hover:border-[#E6B8A2]/35"
          >
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
      title="A clear path from unclear site to confident launch."
      copy="The process keeps decisions visible and practical, so the website does not drift away from business goals."
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
      eyebrow="Pricing preview"
      title="Starting points, not one-size-fits-all packages."
      copy="Final pricing depends on scope, timeline, content needs, integrations, and functionality. The goal is to price the work around the real business problem instead of forcing every project into the same box."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {projectTiers.map((tier) => (
          <article
            key={tier.name}
            className="rounded-lg border border-white/10 bg-[#101011] p-6"
          >
            <h3 className="text-xl font-semibold text-[#F5F5F2]">
              {tier.name}
            </h3>
            <p className="mt-4 text-3xl font-semibold text-[#E6B8A2]">
              {tier.price}
            </p>
            <p className="mt-4 text-sm leading-6 text-[#BDBDB7]">
              {tier.description}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-lg border border-[#E6B8A2]/20 bg-[#E6B8A2]/8 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E6B8A2]">
          Monthly care plans
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {carePlans.map((plan) => (
            <div key={plan.name}>
              <h3 className="font-semibold text-[#F5F5F2]">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#C9C9C3]">
                {plan.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ServicesDetail() {
  return (
    <Section
      id="service-detail"
      eyebrow="Service depth"
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
      title="A technical builder with design taste and business context."
      copy="This placeholder bio is structured for Trey, founder of Treydmark Tech, and can be tightened once the final resume details, background, and client story are ready."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/10 bg-[#101011] p-6">
          <div className="grid aspect-square place-items-center rounded-lg border border-[#E6B8A2]/20 bg-[radial-gradient(circle_at_center,rgba(230,184,162,0.18),transparent_55%),#0B0B0C]">
            <div className="text-center">
              <p className="text-7xl font-semibold text-[#F5F5F2]">T</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#A1A1AA]">
                Founder / Builder
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-[#F5F5F2]">
            I am Trey, founder of Treydmark Tech.
          </h3>
          <p className="mt-5 text-base leading-8 text-[#C9C9C3]">
            I combine software development, design sense, and practical business
            strategy to help companies build websites that look better, perform
            better, and communicate more clearly. The goal is not just a nicer
            homepage. It is a stronger digital foundation that makes the
            business easier to trust, understand, and contact.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-[#F5F5F2]">
                Resume highlights
              </h4>
              <ul className="mt-4 space-y-3">
                {resumeHighlights.map((item) => (
                  <li key={item} className="text-sm leading-6 text-[#BDBDB7]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F5F5F2]">Technical skills</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#D9D9D3]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
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
        <form className="rounded-lg border border-white/10 bg-[#101011] p-5 shadow-2xl shadow-black/30 sm:p-7">
          {/* TODO: Wire this form to Resend or another email service. */}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" placeholder="you@business.com" type="email" />
            <Field label="Business name" name="business" placeholder="Business name" />
            <Field label="Existing website URL" name="website" placeholder="https://" type="url" />
            <SelectField
              label="Service interested in"
              name="service"
              options={[
                "Website Refresh",
                "New Business Website",
                "Advanced Web Platform",
                "Logo and Brand Refresh",
                "SEO Setup",
                "Monthly Care Plan",
              ]}
            />
            <SelectField
              label="Budget range"
              name="budget"
              options={[
                "$750 - $2,500",
                "$2,500 - $5,000",
                "$5,000 - $10,000",
                "$10,000+",
                "Not sure yet",
              ]}
            />
            <SelectField
              label="Timeline"
              name="timeline"
              options={[
                "As soon as possible",
                "Within 1 month",
                "1 - 3 months",
                "Flexible",
              ]}
            />
            <div className="md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-[#F5F5F2]">
                Project goals / message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="What needs to change, what is working now, and what would make the project successful?"
                className="mt-2 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 py-3 text-sm text-[#F5F5F2] outline-none transition placeholder:text-[#73737A] focus:border-[#E6B8A2]/55"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#E6B8A2] px-6 py-4 text-sm font-semibold text-[#0B0B0C] transition hover:-translate-y-0.5 hover:bg-[#F1C8B8] sm:w-auto"
          >
            Start a Project
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-[#F5F5F2]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 py-3 text-sm text-[#F5F5F2] outline-none transition placeholder:text-[#73737A] focus:border-[#E6B8A2]/55"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-[#F5F5F2]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 py-3 text-sm text-[#F5F5F2] outline-none transition focus:border-[#E6B8A2]/55"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
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
