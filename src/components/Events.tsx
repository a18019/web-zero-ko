import { fetchEvents, getEventDate, getEventTitle } from "@/lib/notion";
import Link from "next/link";

export default async function Events() {
  const events = await fetchEvents();

  if (events.length === 0) return null;

  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-heading-lg text-center">イベント</h2>
        <div className="mt-12 flex flex-col gap-6">
          {events.map((page) => (
            <Link
              key={page.id}
              href={`/articles/${page.id}`}
              className="flex flex-col gap-2"
            >
              <p className="text-heading-sm line-clamp-1">
                {getEventTitle(page)}
              </p>
              <p className="text-body-sm">{getEventDate(page).display}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
