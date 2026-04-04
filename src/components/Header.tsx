import Image from "next/image";
import MenuToggle from "./MenuToggle";

const mobileNavLinks = [
  {
    label: "説明会／個別相談",
    href: "https://www.zero-ko.com/information-session/",
  },
  { label: "資料請求", href: "https://www.zero-ko.com/request/" },
  { label: "転入を検討の方", href: "https://www.zero-ko.com/transfer-school/" },
  { label: "入学案内", href: "https://www.zero-ko.com/enrollment01/" },
  { label: "メディア", href: "https://www.zero-ko.com/press-release/" },
  { label: "講師紹介", href: "https://www.zero-ko.com/instructor/" },
  { label: "お問い合わせ", href: "https://www.zero-ko.com/contact/" },
];

const pcNavLinks = [
  { label: "転入を検討の方", href: "https://www.zero-ko.com/transfer-school/" },
  { label: "入学案内", href: "https://www.zero-ko.com/enrollment01/" },
  { label: "メディア", href: "https://www.zero-ko.com/press-release/" },
  { label: "講師紹介", href: "https://www.zero-ko.com/instructor/" },
  { label: "お問い合わせ", href: "https://www.zero-ko.com/contact/" },
];

const pcNavButtons = [
  {
    label: "説明会／個別相談",
    href: "https://www.zero-ko.com/information-session/",
  },
  { label: "資料請求", href: "https://www.zero-ko.com/request/" },
];

export default function Header() {
  return (
    <header className="bg-surface">
      <div className="group lg:w-inner mx-auto flex h-12 max-w-[1128px] items-center justify-between">
        <a
          href="https://www.zero-ko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 shrink-0 px-2 opacity-100 transition-[opacity,visibility] group-has-[:popover-open]:invisible group-has-[:popover-open]:opacity-0 lg:h-6 lg:p-0"
        >
          <Image
            src="/header-logo.svg"
            alt="ゼロ高等学院 ZERO HIGH SCHOOL"
            width={168}
            height={32}
            className="h-full w-auto"
          />
        </a>
        <MenuToggle targetId="mobile-nav" />
        <nav
          id="mobile-nav"
          popover="auto"
          className="bg-surface fixed inset-x-0 top-12 m-0 h-[calc(100dvh-48px)] max-h-none w-dvw max-w-none overflow-y-auto transition-[display,overlay,clip-path] transition-discrete [clip-path:inset(0_0_100%_0)] open:[clip-path:inset(0_0_0_0)] lg:hidden starting:open:[clip-path:inset(0_0_100%_0)]"
        >
          <ul className="flex flex-col gap-2 pt-8 pb-16">
            {mobileNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <a
                  className="flex h-12 items-center pl-12 text-2xl"
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
        <nav className="ml-12 hidden max-w-194 flex-1 lg:block">
          <ul className="flex items-center justify-between">
            {pcNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <a
                  className="text-xs"
                  href={navLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navLink.label}
                </a>
              </li>
            ))}
            {pcNavButtons.map((navButton, i) => (
              <li
                key={navButton.label}
                className={i < pcNavButtons.length - 1 ? "-mr-4" : ""}
              >
                <a
                  className="bg-foreground grid h-6 place-items-center rounded-full px-4 text-xs text-white"
                  href={navButton.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navButton.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
