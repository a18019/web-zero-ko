import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { ShareButtons } from "@/components/notion/ShareButtons";
import {
  fetchPageWithBlocks,
  getAuthor,
  getPublicationDate,
  getTitle,
} from "@/lib/notion";

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
    <div className="bg-white">
      <Header />
      <SubNav />
      <article className="pt-16 pb-16 lg:pt-24">
        <div className="w-inner mx-auto max-w-[552px]">
          <h1 className="text-heading-lg text-center">{title}</h1>
          {publicationDate && (
            <p className="text-body-sm mt-6 text-center">{publicationDate}</p>
          )}
          {author && <p className="text-body-sm mt-6 text-center">{author}</p>}
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
