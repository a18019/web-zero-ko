"use client";

import { FacebookIcon, LineIcon, LinkIcon, XIcon } from "@/components/Icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback: do nothing
    }
  };

  const shareLinks = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Xでシェア",
      icon: XIcon,
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Facebookでシェア",
      icon: FacebookIcon,
    },
    {
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      label: "LINEでシェア",
      icon: LineIcon,
    },
  ];

  return (
    <div className="flex gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-surface flex size-12 items-center justify-center rounded-full"
          aria-label={link.label}
        >
          <link.icon aria-hidden="true" className="size-6" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className="hover:bg-surface flex size-12 items-center justify-center rounded-full"
        aria-label="リンクをコピー"
      >
        <LinkIcon aria-hidden="true" className="size-6" />
      </button>
    </div>
  );
}
