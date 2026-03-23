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

  return (
    <div className="flex items-center justify-center">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center"
        aria-label="Xでシェア"
      >
        <Image src="/x.svg" alt="" width={20} height={20} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center"
        aria-label="Facebookでシェア"
      >
        <Image src="/facebook.svg" alt="" width={20} height={20} />
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center"
        aria-label="LINEでシェア"
      >
        <Image src="/line.svg" alt="" width={20} height={20} />
      </a>
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
