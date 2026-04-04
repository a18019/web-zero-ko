"use client";

import Image from "next/image";

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
      icon: "/x.svg",
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Facebookでシェア",
      icon: "/facebook.svg",
    },
    {
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      label: "LINEでシェア",
      icon: "/line.svg",
    },
  ];

  return (
    <div className="flex gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.icon}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-12 items-center justify-center"
          aria-label={link.label}
        >
          <Image src={link.icon} alt="" width={20} height={20} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className="flex size-12 items-center justify-center"
        aria-label="リンクをコピー"
      >
        <Image src="/link.svg" alt="" width={20} height={20} />
      </button>
    </div>
  );
}
