import { cn } from "@/lib/utils";
import Image from "next/image";

const MobileNavLinks = [
  {
    label: "説明会／個別相談",
    href: "https://www.zero-ko.com/information-session/",
  },
  { label: "資料請求", href: "https://www.zero-ko.com/request/" },
  // { label: "個別相談", href: "https://www.zero-ko.com/information-session/" },
  { label: "転入を検討の方", href: "https://www.zero-ko.com/transfer-school/" },
  { label: "入学案内", href: "https://www.zero-ko.com/enrollment01/" },
  { label: "メディア", href: "https://www.zero-ko.com/press-release/" },
  { label: "講師紹介", href: "https://www.zero-ko.com/instructor/" },
  { label: "お問い合わせ", href: "https://www.zero-ko.com/contact/" },
];

export default function Header() {
  return (
    <header className="bg-surface">
      <div className="group mx-auto flex max-w-[1128px] items-center justify-between">
        <a
          href="https://www.zero-ko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 shrink-0 place-items-center px-2"
        >
          <Image
            src="/header-logo.svg"
            alt="ゼロ高等学院 ZERO HIGH SCHOOL"
            width={168}
            height={32}
          />
        </a>
        <label className="z-header-toggle relative grid size-12 place-items-center lg:hidden">
          <input type="checkbox" className="sr-only" />
          {[
            "translate-y-2 group-has-checked:translate-y-0 group-has-checked:rotate-45",
            "group-has-checked:hidden",
            "-translate-y-2 group-has-checked:-translate-y-0 group-has-checked:-rotate-45",
          ].map((className, i) => (
            <span
              key={i}
              className={cn(
                "bg-foreground absolute h-px w-6 rounded-full",
                className,
              )}
            />
          ))}
        </label>
        <nav className="z-header-menu bg-surface fixed inset-0 hidden overflow-y-scroll transition-[clip-path,display] transition-discrete [clip-path:inset(0_0_100%_0)] group-has-checked:block group-has-checked:[clip-path:inset(0_0_0_0)] lg:static lg:block lg:[clip-path:none] starting:group-has-checked:[clip-path:inset(0_0_100%_0)]">
          <ul className="flex flex-col gap-2 pt-20 pb-16">
            {MobileNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <a
                  className="flex h-12 items-center pl-12 text-[24px] lg:p-0 lg:text-[12px]"
                  href={navLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navLink.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
