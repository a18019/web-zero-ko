import { createHmac } from "node:crypto";

function signId(id: string): string {
  const secret = process.env.NOTION_API_KEY;
  if (!secret) throw new Error("NOTION_API_KEY is not set");
  return createHmac("sha256", secret).update(id).digest("base64url");
}

/** ブロック内ファイル（image, video, audio, file, pdf）用 */
export function notionFileProxyUrl(blockId: string): string {
  return `/api/notion-file/${blockId}?sig=${signId(blockId)}`;
}

/** ページプロパティ（thumbnail, studentsMemo）用 */
export function notionPropertyProxyUrl(
  pageId: string,
  property: string,
): string {
  const id = `${pageId}:${property}`;
  return `/api/notion-file/${id}?sig=${signId(id)}`;
}
