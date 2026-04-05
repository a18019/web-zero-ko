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
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-40">
      <div className="w-inner mx-auto max-w-[1128px]">
        <h1 className="text-[2rem] font-bold lg:text-5xl">アーカイブ</h1>
        <p className="mt-4 text-base lg:mt-6">
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
                  className="bg-background drop-shadow-card block overflow-hidden rounded-[24px]"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={thumbnail || "/no-image.png"}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
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
