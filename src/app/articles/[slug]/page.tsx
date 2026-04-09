import { ArticleGrid } from "@/components/ArticleGrid";
import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { ShareButtons } from "@/components/notion/ShareButtons";
import {
  fetchActiveCategories,
  fetchInstructorWithBlocks,
  fetchPagesByCategory,
  fetchPageWithBlocks,
  getAuthor,
  getInstructorName,
  getInstructorRole,
  getInstructorThumbnailUrl,
  getPublicationDate,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
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
  const result = await fetchPageWithBlocks(slug).catch(() => null);

  if (!result) {
    return <InstructorDetail slug={slug} />;
  }

  const { page, blocks } = result;
  const title = getTitle(page);
  const publicationDate = getPublicationDate(page);
  const author = getAuthor(page);
  const articleUrl = `https://students.zero-ko.com/articles/${slug}`;

  return (
    <div>
      <article className="pt-12 pb-16 lg:pt-24 lg:text-lg">
        <div className="w-content mx-auto max-w-[744px]">
          <h1 className="text-[2rem] lg:text-5xl">{title}</h1>
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

async function InstructorDetail({ slug }: { slug: string }) {
  const { page, blocks } = await fetchInstructorWithBlocks(slug).catch(() => {
    notFound();
  });
  const name = getInstructorName(page);
  const role = getInstructorRole(page);
  const thumbnail = getInstructorThumbnailUrl(page, "/no-image.png");

  return (
    <article className="pt-12 pb-16 lg:pt-24 lg:text-lg">
      <div className="w-content mx-auto max-w-[744px]">
        <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded-2xl">
          <Image src={thumbnail} alt="" fill className="object-cover" />
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">{role}</p>
          <h1 className="mt-2 text-[2rem]">{name}</h1>
        </div>
        <div className="article-body mt-12">
          <NotionBlockList blocks={blocks} />
        </div>
      </div>
    </article>
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
