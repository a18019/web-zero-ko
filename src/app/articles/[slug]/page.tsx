import { ArticleGrid } from "@/components/ArticleGrid";
import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { ShareButtons } from "@/components/notion/ShareButtons";
import {
  fetchActiveCategories,
  fetchPagesByCategory,
  fetchPageWithBlocks,
  getAuthor,
  getPublicationDate,
  getTitle,
} from "@/lib/notion";
import { notFound } from "next/navigation";

export const revalidate = 30;

const UUID_RE =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleOrCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (UUID_RE.test(slug)) {
    return <ArticleDetail slug={slug} />;
  }
  return <CategoryArchive slug={slug} />;
}

async function ArticleDetail({ slug }: { slug: string }) {
  const { page, blocks } = await fetchPageWithBlocks(slug);
  const title = getTitle(page);
  const publicationDate = getPublicationDate(page);
  const author = getAuthor(page);
  const articleUrl = `https://students.zero-ko.com/articles/${slug}`;

  return (
    <div>
      <article className="pt-12 pb-16 lg:pt-24">
        <div className="w-inner mx-auto max-w-[744px]">
          <h1 className="text-[2rem]">{title}</h1>
          {publicationDate && <p className="mt-6 text-sm">{publicationDate}</p>}
          {author && <p className="mt-6 text-sm">{author}</p>}
          <div className="mt-6 mb-12">
            <ShareButtons url={articleUrl} title={title} />
          </div>
          {/* 本文 */}
          <div className="article-body">
            <NotionBlockList blocks={blocks} />
          </div>
        </div>
      </article>
    </div>
  );
}

async function CategoryArchive({ slug }: { slug: string }) {
  const categories = await fetchActiveCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const pages = await fetchPagesByCategory(category.raw);

  return (
    <ArticleGrid pages={pages} categories={categories} activeSlug={slug} />
  );
}
