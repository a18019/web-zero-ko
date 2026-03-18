import { NotionBlockList } from "@/components/notion/NotionBlocks";
import { fetchPageWithBlocks, getTitle } from "@/lib/notion";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { page, blocks } = await fetchPageWithBlocks(slug);
  const title = getTitle(page);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">{title}</h1>
      <div className="space-y-4">
        <NotionBlockList blocks={blocks} />
      </div>
    </div>
  );
}
