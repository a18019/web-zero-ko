"use client";

import type { OgpData } from "@/app/api/ogp/route";
import Image from "next/image";
import { useEffect, useState } from "react";

export function BookmarkCard({
  url,
  caption,
}: {
  url: string;
  caption?: React.ReactNode;
}) {
  const [ogp, setOgp] = useState<OgpData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data: OgpData) => setOgp(data))
      .catch(() => setOgp(null))
      .finally(() => setLoading(false));
  }, [url]);

  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  if (loading) {
    return (
      <div className="my-6 animate-pulse">
        <div className="border-muted flex h-[120px] overflow-hidden border" />
      </div>
    );
  }

  return (
    <div className="my-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-muted hover:bg-surface flex overflow-hidden border transition-colors"
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4">
          {ogp?.title && (
            <p className="truncate text-sm font-medium">{ogp.title}</p>
          )}
          {ogp?.description && (
            <p className="text-muted line-clamp-2 text-xs">{ogp.description}</p>
          )}
          <div className="text-muted flex items-center gap-1.5 text-xs">
            {ogp?.favicon && (
              <Image
                src={ogp.favicon}
                alt=""
                width={14}
                height={14}
                className="shrink-0"
                unoptimized
              />
            )}
            <span className="truncate">
              {ogp?.siteName ? `${ogp.siteName} · ${domain}` : domain}
            </span>
          </div>
        </div>
        {ogp?.image && (
          <div className="relative hidden aspect-[1.91/1] h-[120px] shrink-0 sm:block">
            <Image
              src={ogp.image}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </a>
      {caption && <p className="text-muted mt-1 text-sm">{caption}</p>}
    </div>
  );
}
