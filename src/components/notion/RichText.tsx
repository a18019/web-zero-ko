import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

const colorMap: Record<string, string> = {
  default: "",
  gray: "text-gray-500",
  brown: "text-amber-700",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
  green: "text-green-600",
  blue: "text-blue-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  red: "text-red-500",
  default_background: "",
  gray_background: "bg-gray-100",
  brown_background: "bg-amber-50",
  orange_background: "bg-orange-50",
  yellow_background: "bg-yellow-50",
  green_background: "bg-green-50",
  blue_background: "bg-blue-50",
  purple_background: "bg-purple-50",
  pink_background: "bg-pink-50",
  red_background: "bg-red-50",
};

function RichTextItem({ item }: { item: RichTextItemResponse }) {
  const { annotations, plain_text, href } = item;

  const classes: string[] = [];
  if (annotations.bold) classes.push("font-bold");
  if (annotations.italic) classes.push("italic");
  if (annotations.strikethrough) classes.push("line-through");
  if (annotations.underline) classes.push("underline");
  if (annotations.code)
    classes.push(
      "rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-red-600",
    );
  if (annotations.color && colorMap[annotations.color]) {
    classes.push(colorMap[annotations.color]);
  }

  if (item.type === "equation") {
    return (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
        {item.equation.expression}
      </code>
    );
  }

  const className = classes.length > 0 ? classes.join(" ") : undefined;

  let element = <span className={className}>{plain_text}</span>;

  if (href) {
    element = (
      <a
        href={href}
        className={`text-blue-600 underline hover:text-blue-800 ${className ?? ""}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {plain_text}
      </a>
    );
  }

  return element;
}

export function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((item, i) => (
        <RichTextItem key={i} item={item} />
      ))}
    </>
  );
}
