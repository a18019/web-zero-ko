import Image from "next/image";
import { MobileCarousel } from "./MobileCarousel";

const students = [
  {
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
    hasOverlay: true,
  },
  {
    tag: "ヒストリー",
    title: "不登校から起業家へ。ゼロ高で見つけた自分だけの道",
    date: "2025年1月",
    hasOverlay: false,
  },
  {
    tag: "ヒストリー",
    title: "音楽と出会い、世界が広がった3年間",
    date: "2024年12月",
    hasOverlay: false,
  },
  {
    tag: "ヒストリー",
    title: "プログラミング未経験からアプリ開発コンテスト優勝へ",
    date: "2024年11月",
    hasOverlay: false,
  },
] as const;

export default function StudentFeatures() {
  return (
    <section className="pt-20 lg:pt-32">
      <h2 className="text-center text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px]">
        生徒特集
      </h2>

      {/* Mobile: carousel */}
      <MobileCarousel itemCount={students.length}>
        {students.map((student) => (
          <div
            key={student.title}
            className="relative flex h-[360px] w-[288px] min-w-[288px] flex-col items-start justify-end overflow-hidden rounded-[24px]"
          >
            <Image src="/demo-image.png" alt="" fill className="object-cover" />
            <div className="relative z-10 flex w-full flex-col gap-2 p-6">
              <span className="inline-flex w-fit items-center rounded-full bg-black px-[6px] py-[3px] text-[10px] leading-[14px] text-white">
                {student.tag}
              </span>
              <p className="text-[24px] leading-normal">{student.title}</p>
              <p className="text-[14px] leading-[20px]">{student.date}</p>
            </div>
          </div>
        ))}
      </MobileCarousel>

      {/* Desktop: grid */}
      <div className="mx-auto mt-12 hidden max-w-[1128px] flex-wrap gap-6 lg:flex">
        {students.map((student) => (
          <div
            key={student.title}
            className="relative flex h-[450px] w-[360px] flex-col items-start justify-end overflow-hidden rounded-[32px]"
          >
            <Image src="/demo-image.png" alt="" fill className="object-cover" />
            {student.hasOverlay && (
              <div className="relative z-10 flex w-full flex-col gap-2 p-8">
                <span className="inline-flex w-fit items-center rounded-full bg-black px-[6px] py-[3px] text-[10px] leading-[14px] text-white">
                  {student.tag}
                </span>
                <p className="text-[24px] leading-normal">{student.title}</p>
                <p className="text-[14px] leading-[20px]">{student.date}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
