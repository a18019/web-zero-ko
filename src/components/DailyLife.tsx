import {
  fetchDailyLifeArticles,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function DailyLife() {
  const articles = await fetchDailyLifeArticles();

  if (articles.length === 0) return null;

  return (
    <section className="px-4 pt-40">
      <h2 className="text-center text-[32px] leading-[40px]">ゼロ高日常</h2>
      <div className="mt-12 flex flex-col gap-8">
        {articles.map((page) => (
          <Link
            key={page.id}
            href={`/articles/${page.id}`}
            className="flex items-center gap-4"
          >
            <div className="flex w-[232px] flex-col gap-2">
              <p className="line-clamp-2 text-[16px] leading-[26px]">
                {getTitle(page)}
              </p>
              <p className="text-[14px] leading-[20px]">
                {getPublicationDate(page)}
              </p>
            </div>
            <Image
              src={getThumbnailUrl(page)}
              alt=""
              width={80}
              height={80}
              className="size-[80px] shrink-0 object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
