import {
  fetchStudentsMemoPages,
  getCategory,
  getPublicationDate,
  getStudentsMemoUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";

export default async function StudentsMemo() {
  const pages = await fetchStudentsMemoPages();

  if (pages.length === 0) return null;

  return (
    <Slider title="生徒のメモ">
      {pages.map((page) => (
        <li key={page.id} className="flex-none snap-start">
          <Link
            href={`/articles/${page.id}`}
            className="relative block aspect-4/5 w-[80vw] max-w-90 overflow-hidden rounded-3xl"
          >
            <Image
              src={getStudentsMemoUrl(page, "/no-image.png")}
              width={370}
              height={370}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="to-foreground/60 absolute right-0 bottom-0 left-0 bg-linear-to-b from-transparent p-6 text-white">
              <span className="text-foreground flex-none rounded-full bg-white px-[6px] py-[3px] text-[0.625rem]">
                {getCategory(page)}
              </span>
              <p className="mt-2 line-clamp-3 text-2xl">{getTitle(page)}</p>
              <p className="mt-2 text-sm">{getPublicationDate(page)}</p>
            </div>
          </Link>
        </li>
      ))}
    </Slider>
  );
}
