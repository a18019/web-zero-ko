import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";

import type { BlockWithChildren } from "@/lib/notion";
import { notionFileProxyUrl } from "@/lib/notion-file";
import { cn } from "@/lib/utils";

import { BookmarkCard } from "./BookmarkCard";
import { RichText } from "./RichText";

const listWrappers: Record<
  string,
  { tag: "ul" | "ol" | "div"; className: string }
> = {
  bulleted_list_item: {
    tag: "ul",
    className:
      "space-y-2 mb-6 [&>li]:before:content-['・'] pl-4 [&>li]:before:w-4 [&>li]:before:inline-block [&>li]:before:text-right [&>li]:before:mr-2",
  },
  numbered_list_item: {
    tag: "ol",
    className: "list-decimal space-y-2 mb-6 pl-10",
  },
};

function getFileUrl(
  blockId: string,
  fileObj:
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } },
): string {
  return fileObj.type === "external"
    ? fileObj.external.url
    : notionFileProxyUrl(blockId);
}

const YOUTUBE_RE =
  /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

function extractYouTubeId(url: string): string | null {
  const match = url.match(YOUTUBE_RE);
  return match?.[1] ?? null;
}

function collectConsecutive(
  blocks: BlockWithChildren[],
  startIndex: number,
  targetType: string,
): { items: BlockWithChildren[]; nextIndex: number } {
  const items: BlockWithChildren[] = [];
  let i = startIndex;
  while (i < blocks.length && blocks[i].type === targetType) {
    items.push(blocks[i]);
    i++;
  }
  return { items, nextIndex: i };
}

function ChildBlocks({
  block,
  className,
}: {
  block: BlockWithChildren;
  className?: string;
}) {
  if (!block.children?.length) return null;
  const content = <NotionBlockList blocks={block.children} />;
  return className ? <div className={className}>{content}</div> : content;
}

function NotionBlock({
  block,
  allBlocks,
}: {
  block: BlockWithChildren;
  allBlocks?: BlockWithChildren[];
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-6 text-base">
          <RichText items={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
    case "heading_2":
    case "heading_3": {
      const headingMap = {
        heading_1: { tag: "h2" as const, textClass: "text-2xl" },
        heading_2: { tag: "h2" as const, textClass: "text-2xl" },
        heading_3: { tag: "h3" as const, textClass: "text-xl" },
      };
      const { tag: Tag, textClass } = headingMap[block.type];
      const headingData =
        block.type === "heading_1"
          ? block.heading_1
          : block.type === "heading_2"
            ? block.heading_2
            : block.heading_3;
      const richText = headingData.rich_text;

      if (headingData.is_toggleable) {
        return (
          <details className="mt-12 mb-6 lg:mt-16">
            <summary
              className={cn(
                "cursor-pointer list-none",
                textClass,
                "before:inline-block before:w-6 before:pr-2 before:text-right before:content-['▶︎'] [&::-webkit-details-marker]:hidden [[open]>&]:before:rotate-90",
              )}
            >
              <RichText items={richText} />
            </summary>
            <ChildBlocks block={block} className="mt-4" />
          </details>
        );
      }
      return (
        <Tag id={block.id} className={cn("mt-12 mb-6 lg:mt-16", textClass)}>
          <RichText items={richText} />
        </Tag>
      );
    }

    case "bulleted_list_item":
      return (
        <li>
          <RichText items={block.bulleted_list_item.rich_text} />
          <ChildBlocks block={block} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li>
          <RichText items={block.numbered_list_item.rich_text} />
          <ChildBlocks block={block} />
        </li>
      );

    case "image": {
      const imageUrl = getFileUrl(block.id, block.image);
      const caption = "caption" in block.image ? block.image.caption : [];

      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={caption.map((c) => c.plain_text).join("") || ""}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {caption.length > 0 && (
            <figcaption className="mt-2 text-xs">
              <RichText items={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "quote":
      return (
        <blockquote className="border-muted mt-12 mb-6 border-l-2 py-2 pl-4 italic">
          <RichText items={block.quote.rich_text} />
          <ChildBlocks block={block} />
        </blockquote>
      );

    case "callout": {
      const icon = block.callout.icon;
      let iconElement: React.ReactNode = null;
      if (icon) {
        switch (icon.type) {
          case "emoji":
            iconElement = <span className="text-xl">{icon.emoji}</span>;
            break;
          case "external":
            iconElement = (
              <Image src={icon.external.url} alt="" width={20} height={20} />
            );
            break;
          case "file":
            iconElement = (
              <Image
                src={notionFileProxyUrl(block.id)}
                alt=""
                width={20}
                height={20}
              />
            );
            break;
        }
      }

      return (
        <div className="bg-surface mt-12 mb-6 flex gap-3 p-4">
          {iconElement}
          <div className="flex-1">
            <RichText items={block.callout.rich_text} />
            <ChildBlocks block={block} className="mt-2" />
          </div>
        </div>
      );
    }

    case "code": {
      const codeText = block.code.rich_text.map((t) => t.plain_text).join("");

      return (
        <div className="bg-surface overflow-hidden">
          <div className="text-muted px-4 py-1.5 text-xs">
            {block.code.language}
          </div>
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-sm">{codeText}</code>
          </pre>
          {block.code.caption.length > 0 && (
            <div className="text-muted px-4 py-1.5 text-sm">
              <RichText items={block.code.caption} />
            </div>
          )}
        </div>
      );
    }

    case "divider":
      return <hr className="border-muted my-8" />;

    case "toggle":
      return (
        <details className="mb-6">
          <summary className="cursor-pointer list-none pl-4 before:inline-block before:w-6 before:pr-2 before:text-right before:content-['▶︎'] [[open]>&]:before:rotate-90">
            <RichText items={block.toggle.rich_text} />
          </summary>
          <ChildBlocks block={block} className="mt-2 pl-10" />
        </details>
      );

    case "table": {
      type TableRowBlock = BlockWithChildren &
        Extract<BlockObjectResponse, { type: "table_row" }>;
      const rows = (block.children ?? []).filter(
        (r): r is TableRowBlock => r.type === "table_row",
      );
      const hasColumnHeader = block.table.has_column_header;
      const headerRows = hasColumnHeader ? rows.slice(0, 1) : [];
      const bodyRows = hasColumnHeader ? rows.slice(1) : rows;

      const renderRow = (row: TableRowBlock, isHeader: boolean) => (
        <tr key={row.id} className={cn(isHeader && "bg-surface")}>
          {row.table_row.cells.map((cell, cellIndex) => {
            const isRowHeader = cellIndex === 0 && block.table.has_row_header;
            const Tag = isRowHeader || isHeader ? "th" : "td";

            return (
              <Tag
                key={cellIndex}
                className={cn(
                  "px-3 py-2",
                  (isRowHeader || isHeader) && "text-left font-semibold",
                )}
              >
                <RichText items={cell} />
              </Tag>
            );
          })}
        </tr>
      );

      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {headerRows.length > 0 && (
              <thead>{headerRows.map((row) => renderRow(row, true))}</thead>
            )}
            <tbody>{bodyRows.map((row) => renderRow(row, false))}</tbody>
          </table>
        </div>
      );
    }

    case "table_of_contents": {
      if (!allBlocks) return null;

      const headings = allBlocks.filter(
        (b) =>
          b.type === "heading_1" ||
          b.type === "heading_2" ||
          b.type === "heading_3",
      );

      if (headings.length === 0) return null;

      return (
        <nav className="bg-surface my-8 p-6">
          <p className="mb-3 font-semibold">目次</p>
          <ul className="space-y-1">
            {headings.map((h) => {
              const level =
                h.type === "heading_1" ? 0 : h.type === "heading_2" ? 1 : 2;
              const text: RichTextItemResponse[] =
                h.type === "heading_1"
                  ? h.heading_1.rich_text
                  : h.type === "heading_2"
                    ? h.heading_2.rich_text
                    : (h as Extract<BlockObjectResponse, { type: "heading_3" }>)
                        .heading_3.rich_text;

              return (
                <li key={h.id} style={{ paddingLeft: `${level * 1.25}rem` }}>
                  <a
                    href={`#${h.id}`}
                    className="text-articles-link text-sm hover:underline"
                  >
                    {text.map((t) => t.plain_text).join("")}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      );
    }

    case "bookmark": {
      return (
        <BookmarkCard
          url={block.bookmark.url}
          caption={
            block.bookmark.caption.length > 0 ? (
              <RichText items={block.bookmark.caption} />
            ) : undefined
          }
        />
      );
    }

    case "video": {
      const videoUrl = getFileUrl(block.id, block.video);
      const videoCaption = "caption" in block.video ? block.video.caption : [];
      const youtubeId = extractYouTubeId(videoUrl);

      return (
        <figure className="my-16">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="aspect-video w-full"
              sandbox="allow-scripts allow-same-origin allow-popups"
              allowFullScreen
              title="YouTube video"
            />
          ) : (
            <video src={videoUrl} controls className="max-w-full" />
          )}
          {videoCaption.length > 0 && (
            <figcaption className="mt-2 text-xs">
              <RichText items={videoCaption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "embed":
      return (
        <iframe
          src={block.embed.url}
          className="aspect-video w-full"
          sandbox="allow-scripts allow-same-origin allow-popups"
          allowFullScreen
          title="Embedded content"
        />
      );

    case "column_list": {
      const columns = block.children ?? [];
      return (
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-1">
              {column.type === "column" && column.children && (
                <NotionBlockList blocks={column.children} />
              )}
            </div>
          ))}
        </div>
      );
    }

    case "column":
      return null;

    case "link_to_page": {
      const linkType = block.link_to_page.type;
      const linkedId =
        linkType === "page_id"
          ? block.link_to_page.page_id
          : linkType === "database_id"
            ? block.link_to_page.database_id
            : null;

      if (!linkedId) return null;

      return (
        <Link
          href={`/articles/${linkedId}`}
          className="text-articles-link my-2 flex items-center gap-2 py-3"
        >
          リンクされたページ
        </Link>
      );
    }

    case "file": {
      const fileUrl = getFileUrl(block.id, block.file);
      const fileName =
        "name" in block.file ? block.file.name : "ファイルをダウンロード";
      const fileCaption = "caption" in block.file ? block.file.caption : [];

      return (
        <div>
          <a
            href={fileUrl}
            className="text-articles-link inline-flex items-center gap-2 py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {fileName}
          </a>
          {fileCaption.length > 0 && (
            <p className="text-muted mt-1 text-sm">
              <RichText items={fileCaption} />
            </p>
          )}
        </div>
      );
    }

    case "audio": {
      const audioUrl = getFileUrl(block.id, block.audio);
      const audioCaption = "caption" in block.audio ? block.audio.caption : [];

      return (
        <figure className="my-8">
          <audio src={audioUrl} controls className="w-full" />
          {audioCaption.length > 0 && (
            <figcaption className="mt-2 text-xs">
              <RichText items={audioCaption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "pdf": {
      const pdfUrl = getFileUrl(block.id, block.pdf);
      const pdfCaption = "caption" in block.pdf ? block.pdf.caption : [];

      return (
        <figure>
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="h-[600px] w-full"
          />
          {pdfCaption.length > 0 && (
            <figcaption className="mt-2 text-xs">
              <RichText items={pdfCaption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "table_row":
      return null;

    case "unsupported":
      return (
        <div className="bg-surface text-muted p-3 text-sm">
          未対応ブロック ({block.unsupported.block_type})
        </div>
      );

    default:
      return null;
  }
}

export function NotionBlockList({ blocks }: { blocks: BlockWithChildren[] }) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const wrapper = listWrappers[block.type];

    if (wrapper) {
      const { items, nextIndex } = collectConsecutive(blocks, i, block.type);
      const Tag = wrapper.tag;
      elements.push(
        <Tag key={items[0].id} className={wrapper.className}>
          {items.map((item) => (
            <NotionBlock key={item.id} block={item} allBlocks={blocks} />
          ))}
        </Tag>,
      );
      i = nextIndex;
      continue;
    }

    elements.push(
      <NotionBlock key={block.id} block={block} allBlocks={blocks} />,
    );
    i++;
  }

  return <>{elements}</>;
}
