import { notion } from "@/lib/notion";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IMAGE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
  "image/bmp",
  "image/tiff",
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const url = await resolveNotionFileUrl(id);
    if (!url) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const upstream = await fetch(url);
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream fetch failed" },
        { status: 502 },
      );
    }

    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    const isImage = IMAGE_CONTENT_TYPES.has(contentType.split(";")[0]);

    if (isImage) {
      const headers: Record<string, string> = {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      };
      const contentLength = upstream.headers.get("content-length");
      if (contentLength) headers["Content-Length"] = contentLength;

      return new NextResponse(upstream.body, { headers });
    }

    // 大容量ファイル（動画・音声・PDF等）は302リダイレクト
    return NextResponse.redirect(url, 302);
  } catch (error) {
    console.error("notion-file proxy error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function resolveNotionFileUrl(id: string): Promise<string | null> {
  const colonIndex = id.indexOf(":");
  if (colonIndex !== -1) {
    const pageId = id.slice(0, colonIndex);
    const property = id.slice(colonIndex + 1);
    return resolvePagePropertyUrl(pageId, property);
  }
  return resolveBlockFileUrl(id);
}

async function resolveBlockFileUrl(blockId: string): Promise<string | null> {
  const block = await notion.blocks.retrieve({ block_id: blockId });
  if (!("type" in block)) return null;

  const typed = block as Record<string, unknown>;
  const blockType = typed.type as string;
  const data = typed[blockType] as Record<string, unknown> | undefined;
  if (!data) return null;

  // calloutブロックのアイコン
  if (blockType === "callout") {
    const icon = data.icon as { type: string; file?: { url: string } } | null;
    if (icon?.type === "file" && icon.file) return icon.file.url;
    return null;
  }

  // 標準ファイルオブジェクト（image, video, audio, file, pdf）
  const fileType = data.type as string | undefined;
  if (fileType === "file") {
    const file = data.file as { url: string } | undefined;
    return file?.url ?? null;
  }
  if (fileType === "external") {
    const external = data.external as { url: string } | undefined;
    return external?.url ?? null;
  }

  return null;
}

async function resolvePagePropertyUrl(
  pageId: string,
  property: string,
): Promise<string | null> {
  const page = await notion.pages.retrieve({ page_id: pageId });
  if (!("properties" in page)) return null;

  const prop = (page.properties as Record<string, unknown>)[property] as
    | {
        type: string;
        files: Array<{
          type: string;
          file?: { url: string };
          external?: { url: string };
        }>;
      }
    | undefined;
  if (prop?.type !== "files") return null;

  const file = prop.files[0];
  if (!file) return null;
  if (file.type === "file" && file.file) return file.file.url;
  if (file.type === "external" && file.external) return file.external.url;
  return null;
}
