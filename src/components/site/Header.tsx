import { navItems } from "@/lib/site-content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0B0C]/88 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-[#E6B8A2]/35 bg-[#E6B8A2]/10 text-sm font-semibold text-[#F5F5F2] shadow-[0_0_32px_rgba(230,184,162,0.14)]">
            TT
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-[#F5F5F2]">
              Treydmark Tech
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#A1A1AA]">
              Web / Brand / SEO
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#A1A1AA] transition hover:text-[#F5F5F2]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-[#E6B8A2] px-5 py-3 text-sm font-semibold text-[#0B0B0C] shadow-[0_0_28px_rgba(230,184,162,0.16)] transition hover:-translate-y-0.5 hover:bg-[#F1C8B8] lg:inline-flex"
        >
          Start a Project
        </a>

        <details className="group relative lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#F5F5F2] transition hover:border-[#E6B8A2]/35">
            <span className="sr-only">Open navigation menu</span>
            <span className="relative h-3.5 w-5">
              <span className="absolute left-0 top-0 h-px w-5 bg-current transition group-open:top-1.5 group-open:rotate-45" />
              <span className="absolute bottom-0 left-0 h-px w-5 bg-current transition group-open:bottom-2 group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 mt-4 w-64 rounded-lg border border-white/10 bg-[#111113] p-3 shadow-2xl shadow-black/50">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-3 text-sm text-[#D9D9D6] transition hover:bg-white/[0.04] hover:text-[#F5F5F2]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 flex items-center justify-center rounded-md bg-[#E6B8A2] px-4 py-3 text-sm font-semibold text-[#0B0B0C]"
            >
              Start a Project
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
