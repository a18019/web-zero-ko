import {
  fetchPages,
  getCategory,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedContent() {
  const pages = await fetchPages(4);

  return (
    <section>
      <div className="w-inner mx-auto grid max-w-[1128px] grid-cols-[1fr] gap-6 lg:grid-cols-[1fr_1fr]">
        {pages[0] && (
          <Link
            href={`/articles/${pages[0].id}`}
            className="flex flex-col overflow-hidden rounded-3xl border border-black"
          >
            <Image
              src={getThumbnailUrl(pages[0])}
              alt=""
              width={328}
              height={219}
              className="aspect-328/219 w-full rounded-b-[23px] object-cover"
            />
            <div className="flex flex-1 flex-col justify-around px-6 pt-6 pb-8 lg:px-8 lg:pt-12 lg:pb-16">
              <p className="text-body-sm">{getCategory(pages[0])}</p>
              <p className="text-heading-sm mt-4">{getTitle(pages[0])}</p>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-4">
          <p className="text-body-sm border-b border-black pb-1">
            注目のコンテンツ
          </p>
          <div className="flex flex-1 flex-col justify-end gap-6">
            {pages.slice(1, 4).map((page) => (
              <Link
                key={page.id}
                href={`/articles/${page.id}`}
                className="overflow-hidden rounded-3xl border border-black px-6 pt-6 pb-8"
              >
                <div>
                  <p className="text-body-sm">{getCategory(page)}</p>
                  <p className="text-heading-sm mt-4 line-clamp-3">
                    {getTitle(page)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
