import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "X", href: "#", icon: "/x.svg" },
  { label: "Instagram", href: "#", icon: "/instagram.svg" },
  { label: "YouTube", href: "#", icon: "/youtube.svg" },
  { label: "Facebook", href: "#", icon: "/facebook.svg" },
  { label: "LINE", href: "#", icon: "/line.svg" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black py-4">
      {/* SNSアイコン */}
      <div className="flex">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex size-12 items-center justify-center"
          >
            <Image
              src={social.icon}
              alt={social.label}
              width={18}
              height={18}
            />
          </Link>
        ))}
      </div>
      {/* リンク */}
      <div className="mt-6 flex">
        <Link
          href="#"
          className="flex h-12 items-center justify-center px-4 text-[12px] leading-[18px] text-[#222]"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="#"
          className="flex h-12 items-center justify-center px-4 text-[12px] leading-[18px] text-[#222]"
        >
          お問い合わせ
        </Link>
      </div>
      {/* コピーライト */}
      <div className="mt-6 pt-4 pl-4">
        <p className="text-[10px] leading-[14px] text-[#222]">
          © Zero Education & Arts.
        </p>
      </div>
    </footer>
  );
}
