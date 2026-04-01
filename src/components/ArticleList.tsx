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
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-[32px] lg:text-[48px]">記事を見る</h2>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 lg:gap-12">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/articles/${page.id}`}
              className="grid grid-cols-[1fr_25%] items-center gap-8"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[14px]">{getCategory(page)}</p>
                <p className="line-clamp-2 text-[16px] lg:line-clamp-1 lg:text-[20px]">
                  {getTitle(page)}
                </p>
              </div>
              <Image
                src={getThumbnailUrl(page) || "/no-image.png"}
                alt=""
                width={168}
                height={94}
                className="aspect-video object-cover"
              />
            </Link>
          ))}
        </div>
        <Link
          href="/articles"
          className="border-foreground mx-auto mt-12 grid h-12 w-fit place-items-center rounded-full border px-6 text-[16px]"
        >
          もっと見る
        </Link>
      </div>
    </section>
  );
}
