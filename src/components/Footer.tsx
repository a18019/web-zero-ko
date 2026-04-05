import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
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
  { label: "LINE", href: "#", icon: LineIcon },
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
    <footer className="bg-surface py-4 lg:py-2">
      <div className="w-inner mx-auto grid max-w-[1128px] grid-cols-1 grid-rows-3 items-center gap-6 lg:grid-cols-[1fr_auto_auto] lg:grid-rows-1">
        <nav>
          <ul className="-ml-4 flex">
            {socialLinks.map((socialLink) => (
              <li key={socialLink.label}>
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-12 place-items-center"
                >
                  <socialLink.icon aria-hidden="true" className="size-4" />
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
                  className="text-xs"
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
