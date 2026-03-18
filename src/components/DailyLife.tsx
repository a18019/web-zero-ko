import Image from "next/image";
import Link from "next/link";

const dailyLife = [
  { title: "「ゼロ高生の平日」ってどんな感じ？", date: "2026年2月" },
  {
    title: "タイトルタイトルタイトルタイトルタイトルタ...",
    date: "2026年2月",
  },
  { title: "タイトルタイトルタイトルタイトルタイトル", date: "2026年2月" },
  { title: "「ゼロ高生の進路」ってどんな感じ？", date: "2026年2月" },
];

export default function DailyLife() {
  return (
    <section className="px-4 pt-20 lg:pt-32">
      <h2 className="text-center text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px]">
        ゼロ高日常
      </h2>
      <div className="mt-12 flex flex-col gap-8 lg:mx-auto lg:max-w-[552px] lg:gap-12">
        {dailyLife.map((item, i) => (
          <Link key={i} href="#" className="flex items-center gap-4">
            <div className="flex w-[232px] flex-col gap-2 lg:w-[456px]">
              <p className="text-[16px] leading-[26px] lg:text-[20px] lg:leading-[28px]">
                {item.title}
              </p>
              <p className="text-[14px] leading-[20px]">{item.date}</p>
            </div>
            <Image
              src="/demo-image.png"
              alt=""
              width={80}
              height={80}
              className="size-[80px] shrink-0 object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
