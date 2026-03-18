import { fetchPages, getTitle } from "@/lib/notion";
import Link from "next/link";

export default async function NotionPage() {
  const pages = await fetchPages();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">ニュース一覧</h1>
      <ul className="space-y-4">
        {pages.map((page) => {
          const title = getTitle(page);

          return (
            <li key={page.id} className="rounded-lg border p-4">
              <Link href={`/notion/${page.id}`}>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{page.created_time}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
