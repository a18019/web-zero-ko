import { fetchPages, getCategory, getTitle } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedContent() {
  const pages = await fetchPages();

  return (
    <section className="pt-24">
      <div className="mx-4 flex flex-col gap-12">
        <Link
          href="#"
          className="block overflow-hidden rounded-3xl border border-black"
        >
          <Image
            src="/demo-image.png"
            alt=""
            width={328}
            height={219}
            className="aspect-328/219 w-full rounded-b-[23px] object-cover"
          />
          <div className="px-6 py-8">
            <p className="text-[14px] leading-[20px]">イベント</p>
            <p className="mt-4 text-[20px] leading-[28px]">
              ホリエモン × ゼロ高｜ゼロ高公開授業の東京リアル開催
            </p>
          </div>
        </Link>
        <div>
          <p className="border-b border-black text-[14px] leading-[20px]">
            注目のコンテンツ
          </p>
          <div className="mt-4 flex flex-col gap-6">
            {pages.slice(0, 3).map((page) => (
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
