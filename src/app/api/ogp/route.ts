import dns from "node:dns";
import { isIP, isIPv4 } from "node:net";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// SSRF protection
// ---------------------------------------------------------------------------

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
const MAX_REDIRECTS = 5;

function isPrivateIP(ip: string): boolean {
  // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1) — extract the IPv4 part
  const v4Mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (v4Mapped) return isPrivateIP(v4Mapped[1]);

  if (isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 127) return true; // 127.0.0.0/8
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local + cloud metadata)
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    return false;
  }

  // IPv6
  const normalized = ip.toLowerCase();
  if (normalized === "::1") return true; // loopback
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true; // fc00::/7 unique local
  if (normalized.startsWith("fe80")) return true; // fe80::/10 link-local
  return false;
}

async function resolveAndValidate(
  parsed: URL,
): Promise<{ ip: string; family: number }> {
  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    throw new Error("Blocked protocol");
  }

  const hostname = parsed.hostname.replace(/^\[|\]$/g, ""); // strip IPv6 brackets

  // If hostname is already an IP literal, validate directly
  if (isIP(hostname)) {
    if (isPrivateIP(hostname)) throw new Error("Blocked IP");
    return { ip: hostname, family: isIPv4(hostname) ? 4 : 6 };
  }

  // DNS lookup — check ALL resolved addresses
  const addresses = await dns.promises.lookup(hostname, { all: true });
  for (const addr of addresses) {
    if (isPrivateIP(addr.address)) {
      throw new Error("Blocked IP");
    }
  }

  // Return the first address to fetch against
  return { ip: addresses[0].address, family: addresses[0].family };
}

async function safeFetch(url: string, options: RequestInit): Promise<Response> {
  let currentUrl = url;

  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const parsed = new URL(currentUrl);
    const { ip, family } = await resolveAndValidate(parsed);

    // Build a URL with the resolved IP to prevent TOCTOU / DNS rebinding
    const fetchUrl = new URL(currentUrl);
    fetchUrl.hostname = family === 6 ? `[${ip}]` : ip;

    const res = await fetch(fetchUrl.toString(), {
      ...options,
      headers: {
        ...Object.fromEntries(
          new Headers(options.headers as HeadersInit).entries(),
        ),
        Host: parsed.host,
      },
      redirect: "manual",
    });

    // Not a redirect — return the response
    if (res.status < 300 || res.status >= 400) {
      return res;
    }

    // Handle redirect
    const location = res.headers.get("location");
    if (!location) return res;

    // Resolve relative redirect URLs against the current URL
    currentUrl = new URL(location, currentUrl).toString();
  }

  throw new Error("Too many redirects");
}

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

const CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
};

function emptyOgpData(url: string, favicon: string | null): OgpData {
  return {
    title: null,
    description: null,
    image: null,
    favicon,
    siteName: null,
    url,
  };
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await safeFetch(url, {
      headers: {
        "User-Agent": "bot",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json<OgpData>(
        emptyOgpData(url, faviconUrl(url, "")),
        { headers: CACHE_HEADERS },
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

    return NextResponse.json<OgpData>(data, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json<OgpData>(emptyOgpData(url, faviconUrl(url, "")), {
      headers: CACHE_HEADERS,
    });
  }
}
