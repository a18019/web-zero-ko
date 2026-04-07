import type { CategoryInfo } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ArticleCard } from "./ArticleCard";
import { CategoryNav } from "./CategoryNav";

export function ArticleGrid({
  pages,
  categories,
  activeSlug,
}: {
  pages: PageObjectResponse[];
  categories: CategoryInfo[];
  activeSlug?: string;
}) {
  return (
    <section className="w-content mx-auto max-w-[1128px] pt-16 pb-20 lg:pt-24 lg:pb-40">
      <h1 className="text-[2rem] font-bold lg:text-5xl">アーカイブ</h1>
      <p className="mt-4 text-base lg:mt-6">
        ゼロ高等学院の最新ニュースをお届けします
      </p>
      <CategoryNav categories={categories} activeSlug={activeSlug} />
      <ul className="mt-16 grid auto-rows-[1fr] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-12 lg:mt-32">
        {pages.map((page) => (
          <ArticleCard key={page.id} page={page} />
        ))}
      </ul>
    </section>
  );
}
