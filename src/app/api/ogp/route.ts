import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export type OgpData = {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
  siteName: string | null;
  url: string;
};

function extractMeta(html: string, property: string): string | null {
  // og:xxx or twitter:xxx
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i",
  );
  const m = html.match(re);
  return m?.[1] ?? m?.[2] ?? null;
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() ?? null;
}

function faviconUrl(url: string, html: string): string | null {
  const iconRe =
    /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]+href=["']([^"']+)["']/i;
  const m = html.match(iconRe);
  if (m?.[1]) {
    try {
      return new URL(m[1], url).href;
    } catch {
      return null;
    }
  }
  try {
    const origin = new URL(url).origin;
    return `${origin}/favicon.ico`;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "bot",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json<OgpData>(
        {
          title: null,
          description: null,
          image: null,
          favicon: faviconUrl(url, ""),
          siteName: null,
          url,
        },
        {
          headers: {
            "Cache-Control":
              "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        },
      );
    }

    const html = await res.text();

    const ogImage = extractMeta(html, "og:image");
    let imageAbsolute: string | null = null;
    if (ogImage) {
      try {
        imageAbsolute = new URL(ogImage, url).href;
      } catch {
        imageAbsolute = null;
      }
    }

    const data: OgpData = {
      title:
        extractMeta(html, "og:title") ??
        extractMeta(html, "twitter:title") ??
        extractTitle(html),
      description:
        extractMeta(html, "og:description") ??
        extractMeta(html, "twitter:description") ??
        extractMeta(html, "description"),
      image: imageAbsolute,
      favicon: faviconUrl(url, html),
      siteName: extractMeta(html, "og:site_name"),
      url,
    };

    return NextResponse.json<OgpData>(data, {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json<OgpData>(
      {
        title: null,
        description: null,
        image: null,
        favicon: faviconUrl(url, ""),
        siteName: null,
        url,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        },
      },
    );
  }
}
