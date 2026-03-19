import { fetchEvents, getEventDate, getEventTitle } from "@/lib/notion";
import Link from "next/link";

export default async function Events() {
  const events = await fetchEvents();

  if (events.length === 0) return null;

  return (
    <section className="pt-24">
      <h2 className="text-center text-[32px] leading-[40px]">イベント</h2>
      <div className="mx-4">
        <div className="mt-[32px] flex flex-col gap-6">
          {events.map((page) => (
            <Link
              key={page.id}
              href={`/articles/${page.id}`}
              className="flex flex-col gap-2"
            >
              <p className="line-clamp-1 text-[20px] leading-[28px]">
                {getEventTitle(page)}
              </p>
              <p className="text-[14px] leading-[20px]">
                {getEventDate(page).display}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
