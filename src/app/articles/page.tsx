import { CategoryNav } from "@/components/CategoryNav";
import {
  fetchActiveCategories,
  fetchPages,
  getCategory,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

export default async function ArticlesPage() {
  const [pages, categories] = await Promise.all([
    fetchPages(6),
    fetchActiveCategories(),
  ]);

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-40">
      <div className="w-inner mx-auto max-w-[1128px]">
        <h1 className="text-[2rem] font-bold lg:text-5xl">アーカイブ</h1>
        <p className="mt-4 text-base lg:mt-6">
          ゼロ高等学院の最新ニュースをお届けします
        </p>
        <CategoryNav categories={categories} />
        <ul className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-12 lg:mt-32">
          {pages.map((page) => {
            const thumbnail = getThumbnailUrl(page);
            return (
              <li key={page.id}>
                <Link
                  href={`/articles/${page.id}`}
                  className="border-muted block overflow-hidden rounded-[24px] border"
                >
                  <Image
                    src={thumbnail || "/no-image.png"}
                    alt=""
                    width={328}
                    height={184}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
                    <p className="text-sm">{getCategory(page)}</p>
                    <p className="line-clamp-3 text-xl">{getTitle(page)}</p>
                    <p className="text-xs">{getPublicationDate(page)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
