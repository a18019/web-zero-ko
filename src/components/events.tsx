import Link from "next/link";

const events = [
  { title: "2025年度 卒業証書授与式", date: "26/03/07", href: "#" },
  { title: "イベントイベント", date: "26/03/07", href: "#" },
  {
    title: "イベントイベントイベントイベントイベントイ...",
    date: "26/03/07",
    href: "#",
  },
];

export default function Events() {
  return (
    <section className="px-4 pt-20 lg:pt-32">
      <h2 className="text-center text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px]">
        イベント
      </h2>
      <div className="mt-[32px] flex flex-col gap-6 lg:mx-auto lg:mt-12 lg:max-w-[552px] lg:gap-12">
        {events.map((ev, i) => (
          <Link
            key={i}
            href={ev.href}
            className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6"
          >
            <p className="text-[20px] leading-[28px] lg:order-2 lg:flex-1">
              {ev.title}
            </p>
            <p className="text-[14px] leading-[20px] lg:order-1 lg:shrink-0 lg:text-[20px] lg:leading-[28px]">
              {ev.date}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
