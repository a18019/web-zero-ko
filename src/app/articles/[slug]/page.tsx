import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { ShareButtons } from "@/components/notion/ShareButtons";
import {
  fetchPageWithBlocks,
  getAuthor,
  getPublicationDate,
  getTitle,
} from "@/lib/notion";

export const revalidate = 30;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
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
