import Image from "next/image";
import Link from "next/link";

const studentFeatures = [
  {
    href: "#",
    image: "/demo-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/demo-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/demo-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
  {
    href: "#",
    image: "/demo-image.png",
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
];

export default function StudentFeatures() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-heading-lg lg:text-display text-center">
          生徒特集
        </h2>
        <div className="-mx-4 mt-12 overflow-hidden">
          <ul className="relative flex snap-x snap-mandatory scroll-pl-8 gap-4 overflow-x-scroll px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {studentFeatures.map((feature, i) => (
              <li key={i} className="flex-none snap-start">
                <Link
                  href={feature.href}
                  className="relative block aspect-4/5 w-[296px] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={feature.image}
                    width={370}
                    height={370}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <span className="text-micro flex-none rounded-full bg-black px-[6px] py-[3px] text-white">
                      {feature.tag}
                    </span>
                    <p className="text-heading mt-2">{feature.title}</p>
                    <p className="text-body-sm mt-2">{feature.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
