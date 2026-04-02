/** ブロック内ファイル（image, video, audio, file, pdf）用 */
export function notionFileProxyUrl(blockId: string): string {
  return `/api/notion-file/${blockId}`;
}

/** ページプロパティ（thumbnail, studentsMemo）用 */
export function notionPropertyProxyUrl(
  pageId: string,
  property: string,
): string {
  return `/api/notion-file/${pageId}:${property}`;
}
