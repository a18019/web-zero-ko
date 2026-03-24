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
    <section>
      <div className="w-inner mx-auto max-w-[552px]">
        <h2 className="text-heading-lg lg:text-display text-center">
          ゼロ高日常
        </h2>
        <div className="mt-12 flex flex-col gap-8 lg:gap-12">
          {articles.map((page) => (
            <Link
              key={page.id}
              href={`/articles/${page.id}`}
              className="grid grid-cols-[1fr_80px] items-center gap-4"
            >
              <div className="flex flex-col gap-2">
                <p className="text-body lg:text-heading-sm line-clamp-2 lg:line-clamp-1">
                  {getTitle(page)}
                </p>
                <p className="text-body-sm">{getPublicationDate(page)}</p>
              </div>
              <Image
                src={getThumbnailUrl(page)}
                alt=""
                width={80}
                height={80}
                className="aspect-square object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
