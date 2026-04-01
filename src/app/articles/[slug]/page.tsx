import { CategoryNav } from "@/components/CategoryNav";
import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { ShareButtons } from "@/components/notion/ShareButtons";
import {
  fetchActiveCategories,
  fetchPagesByCategory,
  fetchPageWithBlocks,
  getAuthor,
  getCategory,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
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
    <div className="">
      <article className="pt-12 pb-16 lg:pt-24">
        <div className="w-inner mx-auto max-w-[552px]">
          <h1 className="text-[32px]">{title}</h1>
          {publicationDate && (
            <p className="mt-6 text-[14px]">{publicationDate}</p>
          )}
          {author && <p className="mt-6 text-[14px]">{author}</p>}
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
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-40">
      <div className="w-inner mx-auto max-w-[1128px]">
        <h1 className="text-[32px] font-bold lg:text-[48px]">アーカイブ</h1>
        <p className="mt-4 text-[16px] lg:mt-6">
          ゼロ高等学院の最新ニュースをお届けします
        </p>
        <CategoryNav categories={categories} activeSlug={slug} />
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
                    <p className="text-[14px]">{getCategory(page)}</p>
                    <p className="line-clamp-3 text-[20px]">{getTitle(page)}</p>
                    <p className="text-[12px]">{getPublicationDate(page)}</p>
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
