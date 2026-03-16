import Link from "next/link";

const dailyLife = [
  { title: "「ゼロ高生の平日」ってどんな感じ？", date: "2026年2月" },
  { title: "「ゼロ高生の平日」ってどんな感じ？", date: "2026年2月" },
  { title: "「ゼロ高生の平日」ってどんな感じ？", date: "2026年2月" },
];

export default function DailyLife() {
  return (
    <section className="px-4 pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">ゼロ高日常</h2>
      <div className="mt-12 flex flex-col gap-8">
        {dailyLife.map((item, i) => (
          <Link key={i} href="#" className="flex items-center gap-4">
            <div className="flex w-[232px] flex-col gap-2">
              <p className="text-[16px] leading-[26px]">{item.title}</p>
              <p className="text-[14px] leading-[20px]">{item.date}</p>
            </div>
            <div className="size-[80px] shrink-0 bg-[#d9d9d9]" />
          </Link>
        ))}
      </div>
    </section>
  );
}
