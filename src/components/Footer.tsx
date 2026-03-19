import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "X", href: "#", icon: "/x.svg" },
  { label: "Instagram", href: "#", icon: "/instagram.svg" },
  { label: "YouTube", href: "#", icon: "/youtube.svg" },
  { label: "Facebook", href: "#", icon: "/facebook.svg" },
  { label: "LINE", href: "#", icon: "/line.svg" },
] as const;

const footerLinks = [
  { label: "プライバシーポリシー", href: "#" },
  { label: "お問い合わせ", href: "#" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black py-4">
      <div className="mx-4 grid grid-cols-1 grid-rows-3 items-center gap-6">
        <nav>
          <ul className="-ml-4 flex">
            {socialLinks.map((socialLink) => {
              return (
                <li key={socialLink.label}>
                  <Link
                    href={socialLink.href}
                    className="grid h-12 w-12 place-items-center"
                  >
                    <Image
                      src={socialLink.icon}
                      alt={socialLink.label}
                      width={16}
                      height={16}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav>
          <ul className="flex gap-8">
            {footerLinks.map((footerLink) => {
              return (
                <li key={footerLink.label} className="grid place-items-center">
                  <Link href={footerLink.href} className="text-xs">
                    {footerLink.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <small className="text-xs">© Zero Education & Arts.</small>
      </div>
    </footer>
  );
}
