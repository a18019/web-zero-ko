import Image from "next/image";
import Link from "next/link";

const studentFeatures = [
  {
    href: "#",
    image: "/no-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/no-image.png",
    tag: "ヒストリー",
    title: "経験、失敗は最大の学び！今、高校生だからこそやるべきこと",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/no-image.png",
    tag: "ヒストリー",
    title:
      "ストリートダンス全国優勝のゼロ高生が語る！手帳で自由時間を最大限活用する方法",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/no-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
];

export default function StudentFeatures() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-[32px] lg:text-[48px]">生徒のメモ</h2>
      </div>
      <div className="relative mt-12">
        <button className="absolute"></button>
        <ul className="flex snap-x snap-mandatory scroll-pl-[calc(7/54*(100vw-360px)+16px)] gap-4 overflow-x-scroll px-[calc(7/54*(100vw-360px)+16px)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {studentFeatures.map((feature, i) => (
            <li key={i} className="flex-none snap-start">
              <Link
                href={feature.href}
                className="relative block aspect-4/5 w-[80vw] max-w-90 overflow-hidden rounded-3xl"
              >
                <Image
                  src={feature.image}
                  width={370}
                  height={370}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="to-foreground/60 absolute right-0 bottom-0 left-0 bg-linear-to-b from-transparent p-6 text-white">
                  <span className="text-foreground flex-none rounded-full bg-white px-[6px] py-[3px] text-[10px]">
                    {feature.tag}
                  </span>
                  <p className="mt-2 line-clamp-3 text-[24px]">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-[14px]">{feature.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button className="absolute"></button>
      </div>
    </section>
  );
}
