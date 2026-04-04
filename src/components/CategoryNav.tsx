import type { CategoryInfo } from "@/lib/notion";
import Link from "next/link";

type Props = {
  categories: CategoryInfo[];
  activeSlug?: string;
};

function pillClass(isActive: boolean): string {
  return `rounded-full border px-4 py-2 text-sm transition-colors ${
    isActive
      ? "bg-foreground text-background border-foreground"
      : "border-muted hover:border-foreground"
  }`;
}

export function CategoryNav({ categories, activeSlug }: Props) {
  return (
    <nav className="mt-8 flex flex-wrap gap-3">
      <Link href="/articles" className={pillClass(activeSlug === undefined)}>
        すべて
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/articles/${cat.slug}`}
          className={pillClass(activeSlug === cat.slug)}
        >
          {cat.displayName}
        </Link>
      ))}
    </nav>
  );
}
