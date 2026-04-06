import { ArticleGrid } from "@/components/ArticleGrid";
import { fetchActiveCategories, fetchAllPublishedPages } from "@/lib/notion";

export const revalidate = 30;

export default async function ArticlesPage() {
  const [allPages, categories] = await Promise.all([
    fetchAllPublishedPages(),
    fetchActiveCategories(),
  ]);
  const pages = allPages.slice(0, 6);

  return <ArticleGrid pages={pages} categories={categories} />;
}
