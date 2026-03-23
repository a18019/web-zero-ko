import Header from "@/components/Header";
import HeaderNav from "@/components/SubNav";
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
      <HeaderNav />
      <article className="px-4 pt-16 pb-16">
        <h1 className="text-center text-[32px] leading-[40px]">{title}</h1>
        {publicationDate && (
          <p className="mt-6 text-center text-sm leading-5">
            {publicationDate}
          </p>
        )}
        {author && (
          <p className="mt-6 text-center text-sm leading-5">{author}</p>
        )}
        <div className="mt-6 mb-12">
          <ShareButtons url={articleUrl} title={title} />
        </div>
        {/* 本文 */}
        <div className="article-body">
          <NotionBlockList blocks={blocks} />
        </div>
      </article>
    </div>
  );
}
