import {
  fetchPages,
  getCategory,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedContent() {
  const pages = await fetchPages();

  return (
    <section className="pt-24">
      <div className="mx-4 flex flex-col gap-12">
        {pages[0] && (
          <Link
            href={`/articles/${pages[0].id}`}
            className="block overflow-hidden rounded-3xl border border-black"
          >
            <Image
              src={getThumbnailUrl(pages[0])}
              alt=""
              width={328}
              height={219}
              className="aspect-328/219 w-full rounded-b-[23px] object-cover"
            />
            <div className="px-6 py-8">
              <p className="text-[14px] leading-[20px]">
                {getCategory(pages[0])}
              </p>
              <p className="mt-4 text-[20px] leading-[28px]">
                {getTitle(pages[0])}
              </p>
            </div>
          </Link>
        )}
        <div>
          <p className="border-b border-black text-[14px] leading-[20px]">
            注目のコンテンツ
          </p>
          <div className="mt-4 flex flex-col gap-6">
            {pages.slice(1, 4).map((page) => (
              <Link
                key={page.id}
                href={`/articles/${page.id}`}
                className="overflow-hidden rounded-3xl border border-black px-6 pt-6 pb-8"
              >
                <div>
                  <p className="text-[14px] leading-[20px]">
                    {getCategory(page)}
                  </p>
                  <p className="mt-4 line-clamp-3 text-[20px] leading-[28px]">
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
