import { HeaderLogoIcon } from "./Icons";
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
    <header className="bg-surface z-header relative">
      <div className="group lg:w-content-lg mx-auto flex h-12 max-w-[1128px] items-center justify-between">
        <a
          href="https://www.zero-ko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 shrink-0 px-2 opacity-100 transition-[opacity,visibility] [anchor-name:--header] group-has-[:popover-open]:invisible group-has-[:popover-open]:opacity-0 lg:h-6 lg:p-0"
        >
          <HeaderLogoIcon
            className="h-full w-auto"
            aria-label="ゼロ高等学院 ZERO HIGH SCHOOL"
          />
        </a>
        <MenuToggle targetId="mobile-nav" />
        <nav
          id="mobile-nav"
          popover="auto"
          className="bg-surface fixed inset-[anchor(--header_bottom)_0_0_0] h-auto w-auto transition-[display,overlay,clip-path] transition-discrete [clip-path:inset(0_0_100%_0)] open:[clip-path:inset(0_0_0_0)] lg:hidden starting:open:[clip-path:inset(0_0_100%_0)]"
        >
          <ul className="flex flex-col gap-4 overflow-y-auto pt-8 pb-16">
            {mobileNavLinks.map((navLink) => (
              <li key={navLink.label}>
                <a
                  className="flex h-12 items-center pl-12 text-2xl hover:underline hover:underline-offset-4"
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
                  className="text-xs hover:underline hover:underline-offset-4"
                  href={navLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {navLink.label}
                </a>
              </li>
            ))}
            {pcNavButtons.map((navButton) => (
              <li key={navButton.label} className="-ml-2">
                <a
                  className="bg-foreground text-background grid h-8 place-items-center rounded-full border px-3 text-xs"
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
