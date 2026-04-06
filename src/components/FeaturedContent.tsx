import {
  fetchFeaturedPages,
  getCategory,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedContent() {
  const pages = await fetchFeaturedPages(4);

  if (pages.length === 0) return null;

  const [first, ...rest] = pages;

  return (
    <section>
      <div className="w-content-0-sm sm:w-content-sm-lg lg:w-content-lg mx-auto grid max-w-282 grid-cols-[1fr] gap-6 lg:grid-cols-[1fr_1fr]">
        {first && (
          <Link
            href={`/articles/${first.id}`}
            className="bg-background drop-shadow-card flex flex-col overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-3/2 w-full">
              <Image
                src={getThumbnailUrl(first) || "/no-image.png"}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex grow flex-col justify-around px-6 pt-6 pb-8 lg:px-8 lg:pt-12 lg:pb-16">
              <p className="text-sm">{getCategory(first)}</p>
              <p className="mt-4 line-clamp-3 text-xl">{getTitle(first)}</p>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-4">
          <p className="text-sm">注目のコンテンツ</p>
          <div className="flex grow flex-col justify-end gap-6">
            {rest.map((page, i) => (
              <Link
                key={page.id}
                href={`/articles/${page.id}`}
                className={cn(
                  "drop-shadow-card flex items-center gap-6 overflow-hidden rounded-3xl px-6 pt-6 pb-8",
                  i === 1 ? "bg-surface" : "bg-background",
                )}
              >
                <div className="relative hidden aspect-video h-20 md:block">
                  <Image
                    src={getThumbnailUrl(page) || "/no-image.png"}
                    fill
                    alt=""
                    className="rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">{getCategory(page)}</p>
                  <p className="mt-4 line-clamp-3 text-lg">{getTitle(page)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
