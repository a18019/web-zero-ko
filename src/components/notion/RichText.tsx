import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  blue: "text-blue-500",
  blue_background: "bg-blue-50",
  brown: "text-amber-700",
  brown_background: "bg-amber-50",
  default: "",
  gray: "text-gray-500",
  gray_background: "bg-gray-100",
  green: "text-green-600",
  green_background: "bg-green-50",
  orange: "text-orange-500",
  orange_background: "bg-orange-50",
  pink: "text-pink-500",
  pink_background: "bg-pink-50",
  purple: "text-purple-500",
  purple_background: "bg-purple-50",
  red: "text-red-500",
  red_background: "bg-red-50",
  yellow: "text-yellow-500",
  yellow_background: "bg-yellow-50",
};

function isSafeHref(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    const { protocol } = new URL(url);
    return (
      protocol === "https:" || protocol === "http:" || protocol === "mailto:"
    );
  } catch {
    return false;
  }
}

function SafeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn("text-articles-link underline hover:opacity-80", className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function RichTextItem({ item }: { item: RichTextItemResponse }) {
  const { annotations, plain_text, href } = item;

  const className =
    cn(
      annotations.bold && "font-bold",
      annotations.italic && "italic",
      annotations.strikethrough && "line-through",
      annotations.underline && "underline",
      annotations.code &&
        "rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-red-600",
      annotations.color && colorMap[annotations.color],
    ) || undefined;

  if (item.type === "equation") {
    return (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
        {item.equation.expression}
      </code>
    );
  }

  if (item.type === "mention") {
    const mention = item.mention;
    switch (mention.type) {
      case "date":
        return (
          <time dateTime={mention.date.start} className={className}>
            {plain_text}
          </time>
        );
      case "page":
        return (
          <a href={`/articles/${mention.page.id}`} className={className}>
            {plain_text}
          </a>
        );
      case "link_preview":
        return href && isSafeHref(href) ? (
          <SafeLink href={href} className={className}>
            {plain_text}
          </SafeLink>
        ) : (
          <span className={className}>{plain_text}</span>
        );
      default:
        return <span className={className}>{plain_text}</span>;
    }
  }

  if (href && isSafeHref(href)) {
    return (
      <SafeLink href={href} className={className}>
        {plain_text}
      </SafeLink>
    );
  }

  return <span className={className}>{plain_text}</span>;
}

export function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((item, i) => (
        <RichTextItem
          key={`${i}-${item.plain_text.slice(0, 16)}`}
          item={item}
        />
      ))}
    </>
  );
}
