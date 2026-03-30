import Link from "next/link";

// const navLinks = [
//   { label: "ニュース", href: "#" },
//   { label: "生徒特集", href: "#" },
//   { label: "講師特集", href: "#" },
//   { label: "ゼロ高日常", href: "#" },
//   { label: "生徒作品", href: "#" },
// ];

export default function SubNav() {
  return (
    <div className="z-subnav bg-background sticky top-0 flex items-center justify-between">
      <Link href="/" className="grid h-12 place-items-center px-4 text-[16px]">
        Zero Journal
      </Link>
      <label className="grid size-12 place-items-center">
        <input type="checkbox" className="peer sr-only" />
        <span className="bg-foreground absolute h-px w-2.5 origin-[0.5px_50%] translate-x-[calc(50%-0.5px)] translate-y-1 rotate-225 rounded-full transition-transform peer-checked:-translate-y-1 peer-checked:rotate-135" />
        <span className="bg-foreground absolute h-px w-2.5 origin-[0.5px_50%] translate-x-[calc(50%-0.5px)] translate-y-1 -rotate-45 rounded-full transition-transform peer-checked:-translate-y-1 peer-checked:rotate-45" />
      </label>
    </div>
  );
}
