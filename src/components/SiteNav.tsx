"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/widgets", label: "Widgets" },
  { href: "/microsites", label: "Microsites" },
];

export function SiteNav() {
  const pathname = usePathname() || "";

  const isActive = (href: string) => {
    if (href === "/widgets") return pathname === "/widgets" || pathname.startsWith("/widgets/");
    if (href === "/microsites") return pathname === "/microsites" || pathname.startsWith("/microsites/");
    return pathname === href;
  };

  return (
    <header className="w-full bg-[#0B2341] text-white border-b border-[#153A5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading text-base font-bold text-[#17FFDC] group-hover:text-white transition-colors">
            CELPIP
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">Phase 1</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  active
                    ? "bg-[#153A5C] text-[#17FFDC] font-medium"
                    : "text-gray-300 hover:bg-[#153A5C] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
