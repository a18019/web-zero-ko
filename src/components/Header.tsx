import Image from "next/image";
import Link from "next/link";

const mobileNavLinks = [
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

export default function Header() {
  return (
    <header className="group bg-white">
      <div className="flex items-center justify-between">
        <div className="flex">
          <label className="z-header-toggle relative grid h-12 w-12 place-items-center">
            <input type="checkbox" className="sr-only inset-0" />
            {[
              "group-has-checked:rotate-45 group-has-checked:translate-y-0 translate-y-2",
              "group-has-checked:hidden",
              "group-has-checked:-rotate-45 group-has-checked:-translate-y-0 -translate-y-2",
            ].map((className, i) => (
              <span
                key={i}
                className={`absolute h-px w-6 rounded-full bg-black ${className}`}
              />
            ))}
          </label>
          <Link href="/" className="grid h-12 w-12 place-items-center">
            <Image src="/logo.svg" alt="" width={24} height={24} />
          </Link>
        </div>
        <nav className="z-header-nav-menu fixed inset-0 hidden overflow-y-scroll bg-white [clip-path:inset(0_0_100%_0)] [transition:clip-path_150ms,display_150ms_allow-discrete] group-has-checked:block group-has-checked:[clip-path:inset(0_0_0_0)] starting:group-has-checked:[clip-path:inset(0_0_100%_0)]">
          <ul className="pt-20 pb-16">
            {mobileNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <Link
                  className="flex h-12 items-center pl-12"
                  href={navLink.href}
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/"
          className="mr-4 grid h-6 place-items-center rounded-full bg-black px-2.5 text-xs text-white"
        >
          公式ページへ
        </Link>
      </div>
    </header>
  );
}
