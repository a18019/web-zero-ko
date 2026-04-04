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
    <div className="group z-subnav lg:w-inner sticky top-0 isolate mx-auto flex h-12 max-w-[1128px] items-center justify-between">
      <Link
        href="/"
        className="relative z-1 flex h-12 items-center px-4 text-base lg:h-auto lg:p-0"
      >
        Zero Journal
      </Link>
      <label className="relative z-1 grid size-12 place-items-center lg:hidden">
        <input type="checkbox" className="sr-only" />
        <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 rotate-225 rounded-full transition-transform group-has-checked:-translate-y-1 group-has-checked:rotate-135" />
        <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 -rotate-45 rounded-full transition-transform group-has-checked:-translate-y-1 group-has-checked:rotate-45" />
      </label>
      <nav className="bg-background absolute top-0 right-0 left-0 hidden transition-[display,clip-path] transition-discrete [clip-path:inset(0_0_100%_0)] group-has-checked:block group-has-checked:[clip-path:inset(0_0_0_0)] lg:static lg:block lg:bg-transparent lg:[clip-path:inset(0_0_0_0)] starting:group-has-checked:[clip-path:inset(0_0_100%_0)]">
        <ul className="flex flex-col gap-2 pt-14 pb-4 lg:flex-row lg:gap-12 lg:p-0">
          {navLinks.map((navLink) => (
            <li key={navLink.label}>
              <Link
                href={navLink.href}
                className="flex h-12 items-center pl-12 text-xl lg:h-auto lg:p-0 lg:text-xs"
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
