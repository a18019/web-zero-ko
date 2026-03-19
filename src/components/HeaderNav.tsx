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
      <div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-12 items-center gap-4 px-4 font-bold"
        >
          ZeroKo Students
          <span className="relative grid place-items-center">
            <span
              className={` ${
                isMenuOpen
                  ? "-translate-y-1 rotate-135"
                  : "translate-y-1 rotate-225"
              } absolute h-px w-2.5 origin-[0.5px_50%] rounded-full bg-black transition-transform`}
            ></span>
            <span
              className={`${
                isMenuOpen
                  ? "-translate-y-1 rotate-45"
                  : "translate-y-1 -rotate-45"
              } absolute h-px w-2.5 origin-[0.5px_50%] rounded-full bg-black transition-transform`}
            ></span>
          </span>
        </button>
        <nav
          className={`${
            isMenuOpen
              ? "grid-rows-[1fr] [clip-path:inset(0_0_0_0)] [transition:clip-path_150ms]"
              : "grid-rows-none [clip-path:inset(0_0_100%_0)] [transition:clip-path_150ms,grid-template-rows_0s_150ms]"
          } fixed top-24 right-0 left-0 overflow-y-scroll rounded-b-3xl bg-white`}
        >
          <ul className="pb-4">
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
        </nav>
      </div>
    </>
  );
}
