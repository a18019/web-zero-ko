"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "ニュース", href: "#" },
  { label: "生徒特集", href: "#" },
  { label: "講師特集", href: "#" },
  { label: "ゼロ高日常", href: "#" },
  { label: "生徒作品", href: "#" },
];

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="z-subnav sticky top-0 bg-white">
      <div className="mx-auto grid h-12 max-w-[1128px] grid-cols-[auto] lg:grid-cols-[auto_1fr] lg:items-center lg:gap-4">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center gap-4 px-4 font-bold lg:hidden"
        >
          Zero Ko Students
          <span className="relative grid place-items-center">
            {[
              {
                open: "-translate-y-1 rotate-135",
                closed: "translate-y-1 rotate-225",
              },
              {
                open: "-translate-y-1 rotate-45",
                closed: "translate-y-1 -rotate-45",
              },
            ].map((rot, i) => (
              <span
                key={i}
                className={cn(
                  "absolute h-px w-2.5 origin-[0.5px_50%] rounded-full bg-black transition-transform",
                  isMenuOpen ? rot.open : rot.closed,
                )}
              />
            ))}
          </span>
        </button>
        <Link href="/" className="hidden font-bold lg:block">
          Zero Ko Students
        </Link>
        <nav
          className={cn(
            "absolute top-12 right-0 left-0 grid bg-white transition-[grid-template-rows] lg:static",
            isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <ul className="overflow-hidden lg:flex lg:gap-6">
            {navLinks.map((navLink, i) => (
              <li
                key={navLink.label}
                className={cn(i === navLinks.length - 1 && "mb-4 lg:m-0")}
              >
                <Link
                  href={navLink.href}
                  className="block py-3.5 pl-12 text-[14px] leading-[20px] lg:p-0 lg:text-[12px] lg:leading-[18px]"
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
