import { navItems } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080809]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-base font-semibold text-[#F5F5F2]">
            Treydmark Tech
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#A1A1AA]">
            Modern websites, brand refinement, SEO foundations, and custom web
            systems for small and medium-sized businesses.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#A1A1AA]">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[#F5F5F2]">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
