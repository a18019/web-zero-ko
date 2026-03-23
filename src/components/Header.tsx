import { cn } from "@/lib/utils";
import Image from "next/image";

const mobileNavLinks = [
  { label: "学校説明会", href: "https://www.zero-ko.com/information-session/" },
  { label: "資料請求", href: "https://www.zero-ko.com/request/" },
  { label: "個別相談", href: "https://www.zero-ko.com/information-session/" },
  { label: "転入を検討の方", href: "https://www.zero-ko.com/transfer-school/" },
  { label: "入学案内", href: "https://www.zero-ko.com/enrollment01/" },
  { label: "入学手続き", href: "https://www.zero-ko.com/enrollment/" },
  { label: "メディア", href: "https://www.zero-ko.com/press-release/" },
  { label: "講師紹介", href: "https://www.zero-ko.com/instructor/" },
  { label: "お問い合わせ", href: "https://www.zero-ko.com/contact/" },
];

export default function Header() {
  return (
    <header className="bg-white">
      <div className="group mx-auto grid h-12 max-w-[1128px] grid-cols-[48px_48px_1fr] items-center lg:grid-cols-[48px_1fr_auto]">
        <label className="z-header-toggle relative grid h-full place-items-center lg:hidden">
          <input type="checkbox" className="sr-only" />
          {[
            "translate-y-2 group-has-checked:translate-y-0 group-has-checked:rotate-45",
            "group-has-checked:hidden",
            "-translate-y-2 group-has-checked:-translate-y-0 group-has-checked:-rotate-45",
          ].map((className, i) => (
            <span
              key={i}
              className={`absolute h-px w-6 rounded-full bg-black ${className}`}
            />
          ))}
        </label>
        <a
          href="https://www.zero-ko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-full place-items-center"
        >
          <Image src="/logo.svg" alt="" width={24} height={24} />
        </a>
        <nav
          className={cn(
            "z-header-menu fixed inset-0 hidden overflow-y-scroll bg-white [clip-path:inset(0_0_100%_0)]",
            "lg:static lg:block lg:[clip-path:none]",
            "[transition:clip-path_150ms,display_150ms_allow-discrete]",
            "group-has-checked:block group-has-checked:[clip-path:inset(0_0_0_0)] starting:group-has-checked:[clip-path:inset(0_0_100%_0)]",
          )}
        >
          <ul className="pt-20 pb-16 lg:flex lg:justify-evenly lg:p-0">
            {mobileNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <a
                  className="lg;leading-[18px] block py-3.5 pl-12 text-[14px] leading-[20px] lg:p-0 lg:text-[12px]"
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
        <a
          href="https://www.zero-ko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 ml-auto grid h-6 place-items-center rounded-full bg-black px-2.5 text-xs text-white"
        >
          公式サイトへ
        </a>
      </div>
    </header>
  );
}
