import { fetchEvents, getEventDate, getEventTitle } from "@/lib/notion";
import Link from "next/link";

function displayDate(page: Parameters<typeof getEventDate>[0]): string {
  const { start, end } = getEventDate(page);
  if (!start) return "";
  const today = new Date().toISOString().split("T")[0];
  if (end && today >= start) {
    return end.split("-").join("/");
  }
  return start.split("-").join("/");
}

export default async function Events() {
  const events = await fetchEvents();

  if (events.length === 0) return null;

  return (
    <section>
      <div className="w-inner mx-auto max-w-[552px]">
        <h2 className="text-heading-lg lg:text-display text-center">
          イベント
        </h2>
        <div className="mt-12 flex flex-col gap-6">
          {events.map((page) => (
            <Link
              key={page.id}
              href={`/articles/${page.id}`}
              className="flex flex-col items-center gap-2 lg:flex-row-reverse lg:gap-6"
            >
              <p className="text-heading-sm line-clamp-1 flex-1">
                {getEventTitle(page)}
              </p>
              <p className="text-body-sm lg:text-heading-sm">
                {displayDate(page)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
