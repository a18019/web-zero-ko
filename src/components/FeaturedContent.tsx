import {
  fetchFeaturedPages,
  getCategory,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedContent() {
  const pages = await fetchFeaturedPages(4);

  if (pages.length === 0) return null;

  const [first, ...rest] = pages;

  return (
    <section>
      <div className="w-inner mx-auto grid max-w-[1128px] grid-cols-[1fr] gap-6 lg:grid-cols-[1fr_1fr]">
        {first && (
          <Link
            href={`/articles/${first.id}`}
            className="border-muted flex flex-col overflow-hidden rounded-3xl border"
          >
            <Image
              src={getThumbnailUrl(first) || "/no-image.png"}
              alt=""
              width={552}
              height={311}
              className="aspect-video w-full object-cover"
            />
            <div className="flex flex-1 flex-col justify-around px-6 pt-6 pb-8 lg:px-8 lg:pt-12 lg:pb-16">
              <p className="text-sm">{getCategory(first)}</p>
              <p className="mt-4 line-clamp-3 text-xl">{getTitle(first)}</p>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-4">
          <p className="text-sm">注目のコンテンツ</p>
          <div className="flex flex-1 flex-col justify-end gap-6">
            {rest.map((page, i) => (
              <Link
                key={page.id}
                href={`/articles/${page.id}`}
                className={`border-muted overflow-hidden rounded-3xl border px-6 pt-6 pb-8 ${i === 1 ? "bg-surface" : ""}`}
              >
                <div>
                  <p className="text-sm">{getCategory(page)}</p>
                  <p className="mt-4 line-clamp-3 text-xl">{getTitle(page)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
