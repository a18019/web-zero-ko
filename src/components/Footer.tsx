import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/Icons";

const socialLinks = [
  { label: "X", href: "https://x.com/zero_highschool/", icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zero_highschool_official",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCi89abQwUMkMqi41aFbsHdA",
    icon: YoutubeIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/zerokofacebook/?locale=ja_JP",
    icon: FacebookIcon,
  },
];

const footerLinks = [
  {
    label: "プライバシーポリシー",
    href: "https://www.zero-ko.com/privacy-policy/",
  },
  { label: "お問い合わせ", href: "https://www.zero-ko.com/contact/" },
];

export default function Footer() {
  return (
    <footer className="bg-surface py-4 sm:py-2">
      <div className="w-content-0-sm lg:w-content-lg mx-auto grid max-w-[1128px] grid-cols-1 grid-rows-3 items-center gap-6 sm:mx-4 sm:w-auto sm:grid-cols-[1fr_auto_auto] sm:grid-rows-1 sm:gap-8 lg:mx-auto">
        <nav>
          <ul className="flex">
            {socialLinks.map((socialLink) => (
              <li key={socialLink.label}>
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.label}
                  className="hover:bg-background grid size-12 place-items-center rounded-full"
                >
                  <socialLink.icon aria-hidden="true" className="w-6" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <ul className="flex gap-8">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.label} className="grid place-items-center">
                <Link
                  href={footerLink.href}
                  className="text-xs hover:underline hover:underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {footerLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <small className="text-xs">© Zero Education & Arts.</small>
      </div>
    </footer>
  );
}
