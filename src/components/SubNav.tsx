import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { label: "ニュース", href: "#" },
  { label: "生徒特集", href: "#" },
  { label: "講師特集", href: "#" },
  { label: "ゼロ高日常", href: "#" },
  { label: "生徒作品", href: "#" },
];

export default function SubNav() {
  return (
    <div className="group z-subnav bg-background shadow-foreground sticky top-0 grid h-12 grid-cols-[auto_1fr] items-center justify-between drop-shadow-[0_3px_2px]/10">
      <Link
        href="/"
        className="z-subnav-foreground relative grid h-12 place-items-center px-4 text-[16px] font-bold"
      >
        Zero Journal
      </Link>
      <label className="z-subnav-foreground relative h-12 items-center">
        <input type="checkbox" className="peer sr-only" />
        <span className="relative ml-auto grid size-12 place-items-center">
          <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 rotate-225 rounded-full transition-transform group-has-checked:-translate-y-1 group-has-checked:rotate-135" />
          <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 -rotate-45 rounded-full transition-transform group-has-checked:-translate-y-1 group-has-checked:rotate-45" />
        </span>
      </label>
      <nav className="z-subnav-menu bg-background absolute top-0 right-0 left-0 grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] group-has-checked:grid-rows-[1fr]">
        <ul className="min-h-0">
          {navLinks.map((navLink, i) => (
            <li
              key={i}
              className={cn(
                i === 0 ? "mt-12" : "",
                i === navLinks.length - 1 ? "mb-4" : "",
              )}
            >
              <Link
                href={navLink.href}
                className="flex h-12 items-center pl-12 text-[14px]"
              >
                {navLink.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
