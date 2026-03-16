import Link from "next/link";

const events = [
  { title: "2025年度 卒業証書授与式", date: "26/03/07", href: "#" },
  { title: "イベントタイトルイベントタイト...", date: "26/03/0X", href: "#" },
];

export default function Events() {
  return (
    <section className="px-4 pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">イベント</h2>
      <div className="mt-[32px] flex flex-col gap-6">
        {events.map((ev, i) => (
          <Link key={i} href={ev.href} className="flex flex-col gap-2">
            <p className="text-[20px] leading-[28px]">{ev.title}</p>
            <p className="text-[14px] leading-[20px]">{ev.date}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
