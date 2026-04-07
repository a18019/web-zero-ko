import {
  fetchPages,
  getCategory,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function ArticleList() {
  const pages = await fetchPages(4);

  return (
    <section className="w-content mx-auto max-w-[1128px]">
      <h2 className="text-[2rem] lg:text-5xl">記事を見る</h2>
      <div className="mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_1fr] lg:gap-y-16">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/articles/${page.id}`}
            className="grid grid-cols-[60%_1fr] gap-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs">{getCategory(page)}</p>
              <p className="line-clamp-2 text-base">{getTitle(page)}</p>
            </div>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={getThumbnailUrl(page) || "/no-image.png"}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/articles"
        className="border-foreground mx-auto mt-12 grid h-12 w-fit place-items-center rounded-full border px-6 text-base"
      >
        もっと見る
      </Link>
    </section>
  );
}
