import Link from "next/link";
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
            Treydmark Tech is a founder-led web and software studio building
            polished websites, digital tools, and long-term client partnerships.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#A1A1AA]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#F5F5F2]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
