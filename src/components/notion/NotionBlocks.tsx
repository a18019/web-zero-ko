import type { BlockWithChildren } from "@/lib/notion";
import { cn } from "@/lib/utils";

import { RichText } from "./RichText";

function getFileUrl(
  fileObj:
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } },
): string {
  return fileObj.type === "external" ? fileObj.external.url : fileObj.file.url;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  return match?.[1] ?? null;
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

function NotionBlock({ block }: { block: BlockWithChildren }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-6 text-base leading-[26px]">
          <RichText items={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h2 className="mt-12 mb-6 text-xl leading-[28px] font-bold">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="mt-8 mb-4 text-lg leading-[28px] font-bold">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="mt-6 mb-3 text-base leading-[26px] font-bold">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      );

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

    case "to_do":
      return (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mt-1"
          />
          <span
            className={block.to_do.checked ? "line-through opacity-60" : ""}
          >
            <RichText items={block.to_do.rich_text} />
          </span>
        </div>
      );

    case "toggle":
      return (
        <details className="rounded border p-3">
          <summary className="cursor-pointer font-medium">
            <RichText items={block.toggle.rich_text} />
          </summary>
          <ChildBlocks block={block} className="mt-2 pl-4" />
        </details>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic">
          <RichText items={block.quote.rich_text} />
          <ChildBlocks block={block} />
        </blockquote>
      );

    case "callout": {
      const iconDisplay =
        block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : null;

      return (
        <div className="flex gap-3 rounded-lg bg-gray-50 p-4">
          {iconDisplay && <span className="text-xl">{iconDisplay}</span>}
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
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-gray-100 px-4 py-1.5 text-xs text-gray-500">
            {block.code.language}
          </div>
          <pre className="overflow-x-auto bg-gray-50 p-4">
            <code className="font-mono text-sm">{codeText}</code>
          </pre>
          {block.code.caption.length > 0 && (
            <div className="px-4 py-1.5 text-sm text-gray-500">
              <RichText items={block.code.caption} />
            </div>
          )}
        </div>
      );
    }

    case "divider":
      return <hr className="my-8 border-gray-200" />;

    case "image": {
      const imageUrl = getFileUrl(block.image);
      const caption = "caption" in block.image ? block.image.caption : [];

      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={caption.map((c) => c.plain_text).join("") || "image"}
            className="w-full"
          />
          {caption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              <RichText items={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl = getFileUrl(block.video);
      const videoCaption = "caption" in block.video ? block.video.caption : [];
      const youtubeId = extractYouTubeId(videoUrl);

      return (
        <figure className="my-16">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="aspect-video w-full rounded"
              allowFullScreen
              title="YouTube video"
            />
          ) : (
            <video src={videoUrl} controls className="max-w-full rounded" />
          )}
          {videoCaption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              <RichText items={videoCaption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "audio": {
      const audioUrl = getFileUrl(block.audio);

      return <audio src={audioUrl} controls className="w-full" />;
    }

    case "file": {
      const fileUrl = getFileUrl(block.file);
      const fileName =
        "name" in block.file ? block.file.name : "ファイルをダウンロード";
      const fileCaption = "caption" in block.file ? block.file.caption : [];

      return (
        <div>
          <a
            href={fileUrl}
            className="inline-flex items-center gap-2 rounded border px-4 py-2 text-blue-600 hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            📎 {fileName}
          </a>
          {fileCaption.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              <RichText items={fileCaption} />
            </p>
          )}
        </div>
      );
    }

    case "pdf": {
      const pdfUrl = getFileUrl(block.pdf);
      const pdfCaption = "caption" in block.pdf ? block.pdf.caption : [];

      return (
        <figure>
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="h-[600px] w-full rounded border"
          />
          {pdfCaption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              <RichText items={pdfCaption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "bookmark": {
      return (
        <div className="rounded-lg border p-4">
          <a
            href={block.bookmark.url}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.bookmark.url}
          </a>
          {block.bookmark.caption.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              <RichText items={block.bookmark.caption} />
            </p>
          )}
        </div>
      );
    }

    case "embed":
      return (
        <iframe
          src={block.embed.url}
          className="aspect-video w-full rounded border"
          allowFullScreen
          title="Embedded content"
        />
      );

    case "equation":
      return (
        <div className="my-4 overflow-x-auto rounded bg-gray-50 p-4 text-center font-mono">
          {block.equation.expression}
        </div>
      );

    case "table": {
      const rows = block.children ?? [];
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <tbody>
              {rows.map((row, rowIndex) => {
                if (row.type !== "table_row") return null;
                const isHeader =
                  rowIndex === 0 && block.table.has_column_header;

                return (
                  <tr key={row.id} className={cn(isHeader && "bg-gray-50")}>
                    {row.table_row.cells.map((cell, cellIndex) => {
                      const isRowHeader =
                        cellIndex === 0 && block.table.has_row_header;
                      const Tag = isRowHeader || isHeader ? "th" : "td";

                      return (
                        <Tag
                          key={cellIndex}
                          className={cn(
                            "border px-3 py-2",
                            (isRowHeader || isHeader) &&
                              "text-left font-semibold",
                          )}
                        >
                          <RichText items={cell} />
                        </Tag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    case "table_row":
      return null;

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

    case "child_page":
      return (
        <div className="rounded border p-3">📄 {block.child_page.title}</div>
      );

    case "child_database":
      return (
        <div className="rounded border p-3">
          🗄️ {block.child_database.title}
        </div>
      );

    case "synced_block":
      return <ChildBlocks block={block} />;

    case "link_to_page": {
      const linkTo = block.link_to_page;
      const id =
        linkTo.type === "page_id"
          ? linkTo.page_id
          : linkTo.type === "database_id"
            ? linkTo.database_id
            : null;

      return id ? (
        <div className="rounded border p-3">
          🔗 <span className="text-gray-600">リンク先: {id}</span>
        </div>
      ) : null;
    }

    case "link_preview":
      return (
        <a
          href={block.link_preview.url}
          className="block rounded border p-3 text-blue-600 underline hover:bg-gray-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.link_preview.url}
        </a>
      );

    case "breadcrumb":
    case "table_of_contents":
      return null;

    case "template":
      return (
        <div className="rounded border border-dashed p-3 text-gray-400">
          <RichText items={block.template.rich_text} />
        </div>
      );

    case "meeting_notes":
      return (
        <div className="rounded border p-3">
          🎙️{" "}
          {block.meeting_notes.title?.map((t) => t.plain_text).join("") ??
            "Meeting Notes"}
        </div>
      );

    case "transcription":
      return (
        <div className="rounded border p-3">
          🎙️{" "}
          {block.transcription.title?.map((t) => t.plain_text).join("") ??
            "Transcription"}
        </div>
      );

    case "unsupported":
      return (
        <div className="rounded bg-gray-50 p-3 text-sm text-gray-400">
          未対応ブロック ({block.unsupported.block_type})
        </div>
      );

    default:
      return null;
  }
}

const listWrappers: Record<
  string,
  { tag: "ul" | "ol" | "div"; className: string }
> = {
  bulleted_list_item: { tag: "ul", className: "list-disc space-y-1 pl-6" },
  numbered_list_item: { tag: "ol", className: "list-decimal space-y-1 pl-6" },
  to_do: { tag: "div", className: "space-y-1" },
};

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
            <NotionBlock key={item.id} block={item} />
          ))}
        </Tag>,
      );
      i = nextIndex;
      continue;
    }

    elements.push(<NotionBlock key={block.id} block={block} />);
    i++;
  }

  return <>{elements}</>;
}
