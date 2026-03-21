"use client";

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
    <>
      <div className="z-header-nav sticky top-0 border-b border-black bg-white">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-12 items-center gap-4 px-4 font-bold"
        >
          ZeroKo Students
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
                className={`absolute h-px w-2.5 origin-[0.5px_50%] rounded-full bg-black transition-transform ${
                  isMenuOpen ? rot.open : rot.closed
                }`}
              />
            ))}
          </span>
        </button>
        <nav
          className={`z-header-nav-menu absolute top-12 right-0 left-0 grid overflow-y-scroll border-b border-black bg-white transition-[grid-template-rows] ${
            isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mb-4">
              {navLinks.map((navLink) => {
                return (
                  <li key={navLink.label}>
                    <Link
                      href={navLink.href}
                      className="flex h-12 items-center pl-12"
                    >
                      {navLink.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
