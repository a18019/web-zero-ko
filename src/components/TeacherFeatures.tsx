import { cn } from "@/lib/utils";
import {
  fetchInstructors,
  getInstructorName,
  getInstructorRole,
  getInstructorThumbnailUrl,
} from "@/lib/notion";
import { notion } from "@/lib/notion";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";

function extractBio(blocks: BlockObjectResponse[]): string {
  for (const block of blocks) {
    if (block.type === "paragraph") {
      const texts = block.paragraph.rich_text;
      if (texts.length > 0) {
        return texts.map((t) => t.plain_text).join("");
      }
    }
  }
  return "";
}

export default async function TeacherFeatures() {
  const pages = await fetchInstructors();

  const teachers = await Promise.all(
    pages.map(async (page) => {
      const blocksRes = await notion.blocks.children.list({
        block_id: page.id,
        page_size: 5,
      });
      const blocks = blocksRes.results.filter(
        (b): b is BlockObjectResponse => "type" in b,
      );

      return {
        id: page.id,
        name: getInstructorName(page),
        role: getInstructorRole(page),
        thumbnail: getInstructorThumbnailUrl(page, "/no-image.png"),
        bio: extractBio(blocks),
      };
    }),
  );

  return (
    <Slider title="講師のノート">
      {teachers.map((teacher, i) => (
        <li key={teacher.id} className="flex-none snap-center sm:snap-start">
          <Link
            href={`/articles/${teacher.id}`}
            className={cn(
              "drop-shadow-card hover:drop-shadow-card-hover group block aspect-4/5 w-[84vw] max-w-90 overflow-hidden rounded-3xl",
              i % 2 === 1 ? "bg-surface" : "bg-background",
            )}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={teacher.thumbnail}
                alt=""
                fill
                className="object-cover transition-[scale] group-hover:scale-105"
              />
            </div>
            <div className="mt-4 px-6">
              <p className="text-xs">{teacher.role}</p>
              <p className="mt-2 text-xl">{teacher.name}</p>
              <p className="mt-2 line-clamp-4 text-sm">{teacher.bio}</p>
            </div>
          </Link>
        </li>
      ))}
    </Slider>
  );
}
