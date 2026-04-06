import {
  getCategory,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";

export function ArticleCard({ page }: { page: PageObjectResponse }) {
  const thumbnail = getThumbnailUrl(page);
  return (
    <li>
      <Link
        href={`/articles/${page.id}`}
        className="bg-background drop-shadow-card flex h-full flex-col overflow-hidden rounded-[24px]"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={thumbnail || "/no-image.png"}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="flex grow flex-col gap-4 px-6 pt-6 pb-8">
          <p className="text-sm">{getCategory(page)}</p>
          <p className="line-clamp-3 text-xl">{getTitle(page)}</p>
          <p className="mt-auto text-xs">{getPublicationDate(page)}</p>
        </div>
      </Link>
    </li>
  );
}
