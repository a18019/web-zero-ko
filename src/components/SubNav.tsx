"use client";

import type { CategoryInfo } from "@/lib/notion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubNavToggle from "./SubNavToggle";

type Props = {
  categories: CategoryInfo[];
};

export default function SubNav({ categories }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-0" />
      <div
        className={cn(
          "subnav group z-subnav bg-background shadow-foreground/10 sticky top-0 isolate transition-shadow duration-200 [anchor-name:--subnav]",
          stuck && "shadow-[0_4px_12px]",
        )}
      >
        <div className="lg:w-content-lg flex h-12 max-w-[1128px] items-center justify-between md:mx-4 lg:mx-auto">
          <Link
            href="/"
            className="relative z-1 flex h-12 items-center px-4 text-xl font-bold md:h-auto md:p-0"
          >
            Zero Journal
          </Link>
          <SubNavToggle targetId="mobile-subnav" />
          <nav
            id="mobile-subnav"
            popover="auto"
            className="bg-background fixed inset-[anchor(--subnav_bottom)_0_0_0] h-auto w-auto transition-[display,overlay,clip-path] transition-discrete [clip-path:inset(0_0_100%_0)] open:[clip-path:inset(0_0_0_0)] md:hidden starting:open:[clip-path:inset(0_0_100%_0)]"
          >
            <ul className="flex flex-col gap-4 overflow-y-auto py-8">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/articles/${cat.slug}`}
                    className="flex h-12 items-center pl-12 text-2xl hover:underline hover:underline-offset-4"
                  >
                    {cat.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="hidden md:block">
            <ul className="flex gap-12">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/articles/${cat.slug}`}
                    className="text-xs hover:underline hover:underline-offset-4"
                  >
                    {cat.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
