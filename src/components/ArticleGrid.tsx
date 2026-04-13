import {
  getCategory,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import type { CategoryInfo } from "@/lib/notion";
import { cn } from "@/lib/utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";

export function ArticleGrid({
  pages,
  categories,
  activeSlug,
}: {
  pages: PageObjectResponse[];
  categories: CategoryInfo[];
  activeSlug?: string;
}) {
  return (
    <section className="w-content mx-auto max-w-[1128px] pt-16 pb-20 lg:pt-24 lg:pb-40">
      <h1 className="text-[2rem] font-bold lg:text-5xl">アーカイブ</h1>
      <p className="mt-4 text-base lg:mt-6">
        ゼロ高等学院の最新ニュースをお届けします
      </p>
      <nav className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/articles"
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            activeSlug === undefined
              ? "bg-foreground text-background border-foreground"
              : "border-muted",
          )}
        >
          すべて
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/articles/${cat.slug}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              activeSlug === cat.slug
                ? "bg-foreground text-background border-foreground"
                : "border-muted",
            )}
          >
            {cat.displayName}
          </Link>
        ))}
      </nav>
      <ul className="mt-16 grid auto-rows-[1fr] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-12 lg:mt-32">
        {pages.map((page) => {
          const thumbnail = getThumbnailUrl(page);
          return (
            <li key={page.id}>
              <Link
                href={`/articles/${page.id}`}
                className="group bg-background drop-shadow-card hover:drop-shadow-card-hover flex h-full flex-col overflow-hidden rounded-[24px] transition-[filter]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={thumbnail || "/no-image.png"}
                    alt=""
                    fill
                    className="object-cover transition-[scale] group-hover:scale-105"
                  />
                </div>
                <div className="flex grow flex-col gap-4 px-6 pt-6 pb-8">
                  <p className="text-sm">{getCategory(page)}</p>
                  <p className="line-clamp-3 text-xl">{getTitle(page)}</p>
                  <p className="mt-auto text-xs">{getPublicationDate(page)}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
