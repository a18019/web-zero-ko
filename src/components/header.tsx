"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "学校説明会", href: "https://www.zero-ko.com/information-session/" },
  { label: "資料請求", href: "https://www.zero-ko.com/request/" },
  { label: "個別相談", href: "https://www.zero-ko.com/information-session/" },
  { label: "転入を検討の方", href: "#" },
  { label: "入学案内", href: "#" },
  { label: "入学手続き", href: "#" },
  { label: "メディア", href: "#" },
  { label: "講師紹介", href: "#" },
  { label: "お問い合わせ", href: "#" },
];

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-header sticky top-0 left-0 h-12 bg-gray-400">
      <div className="mx-auto grid grid-cols-[48px_1fr] grid-rows-[48px]">
        <button
          className="z-header-toggle relative grid h-12 w-12 place-items-center"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {[
            ["rotate-45", "translate-y-2"],
            ["hidden", ""],
            ["-rotate-45", "-translate-y-2"],
          ].map(([opened, closed], i) => (
            <span
              key={i}
              className={`${isMenuOpen ? opened : closed} absolute h-px w-6 rounded-full bg-black`}
            />
          ))}
        </button>
        <Link href="/" className="grid h-12 w-12 place-items-center">
          <Image src="logo.svg" alt="" width={24} height={24} />
        </Link>
        <nav
          className={`z-header-nav ${isMenuOpen ? "h-dvh [clip-path:inset(0_0_0_0)] [transition:clip-path_150ms]" : "h-0 [clip-path:inset(0_0_100%_0)] [transition:clip-path_150ms,height_0s_150ms]"} animate-menu-reveal-down fixed w-dvw overflow-y-scroll bg-gray-200 [animation-direction:alternate]`}
        >
          <ul className="pt-20 pb-16">
            {navLinks.map((navLink) => (
              <li key={navLink.label}>
                <Link
                  className="relative flex h-12 items-center pl-12"
                  href={navLink.href}
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
