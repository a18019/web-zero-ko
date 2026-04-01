import type { CategoryInfo } from "@/lib/notion";
import Link from "next/link";

type Props = {
  categories: CategoryInfo[];
  activeSlug?: string;
};

export function CategoryNav({ categories, activeSlug }: Props) {
  return (
    <nav className="mt-8 flex flex-wrap gap-3">
      <Link
        href="/articles"
        className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
          activeSlug === undefined
            ? "bg-foreground text-background border-foreground"
            : "border-muted hover:border-foreground"
        }`}
      >
        すべて
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/articles/${cat.slug}`}
          className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
            activeSlug === cat.slug
              ? "bg-foreground text-background border-foreground"
              : "border-muted hover:border-foreground"
          }`}
        >
          {cat.displayName}
        </Link>
      ))}
    </nav>
  );
}
