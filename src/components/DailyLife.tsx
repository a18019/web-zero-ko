import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    category: "ジャーナル",
    href: "#",
    title: "ゼロ高生の平日ってどんな感じ？一日の過ごし方を紹介",
    image: "/no-image.png",
  },
  {
    category: "ジャーナル",
    href: "#",
    title: "宿題は多い？少ない？ゼロ高生の勉強時間のリアルに迫る",
    image: "/no-image.png",
  },
  {
    category: "ジャーナル",
    href: "#",
    title: "ゼロ高生はいま何に夢中？最近のマイブームを聞いてみた",
    image: "/no-image.png",
  },
  {
    category: "ジャーナル",
    href: "#",
    title: "ゼロ高ってどんな感じ？ゼロ高生の生活をQ&Aで紹介",
    image: "/no-image.png",
  },
];

export default function DailyLife() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-[32px] lg:text-[48px]">記事を見る</h2>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 lg:gap-12">
          {articles.map((article, i) => (
            <Link
              key={i}
              href={article.href}
              className="grid grid-cols-[1fr_25%] items-center gap-8"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[14px]">{article.category}</p>
                <p className="line-clamp-2 text-[16px] lg:line-clamp-1 lg:text-[20px]">
                  {article.title}
                </p>
              </div>
              <Image
                src={article.image}
                alt=""
                width={168}
                height={94}
                className="aspect-video object-cover"
              />
            </Link>
          ))}
        </div>
        <Link
          href="/articles"
          className="border-foreground mx-auto mt-12 grid h-12 w-fit place-items-center rounded-full border px-6 text-[16px]"
        >
          もっと見る
        </Link>
      </div>
    </section>
  );
}
