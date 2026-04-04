import type { OgpData } from "@/app/api/ogp/route";
import Image from "next/image";
import { cache } from "react";

const fetchOgp = cache(async (url: string): Promise<OgpData | null> => {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/ogp?url=${encodeURIComponent(url)}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

export async function BookmarkCard({
  url,
  caption,
}: {
  url: string;
  caption?: React.ReactNode;
}) {
  const ogp = await fetchOgp(url);

  let domain: string;
  try {
    domain = new URL(url).hostname;
  } catch {
    domain = url;
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
          {ogp?.title ? (
            <p className="truncate text-sm font-medium">{ogp.title}</p>
          ) : null}
          {ogp?.description ? (
            <p className="text-muted line-clamp-2 text-xs">{ogp.description}</p>
          ) : null}
          <div className="text-muted flex items-center gap-1.5 text-xs">
            {ogp?.favicon ? (
              <Image
                src={ogp.favicon}
                alt=""
                width={14}
                height={14}
                className="shrink-0"
                unoptimized
              />
            ) : null}
            <span className="truncate">
              {ogp?.siteName ? `${ogp.siteName} · ${domain}` : domain}
            </span>
          </div>
        </div>
        {ogp?.image ? (
          <div className="relative hidden aspect-[1.91/1] h-[120px] shrink-0 sm:block">
            <Image
              src={ogp.image}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : null}
      </a>
      {caption ? <p className="text-muted mt-1 text-sm">{caption}</p> : null}
    </div>
  );
}
