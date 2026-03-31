import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    image: "/no-image.png",
    href: "https://www.zero-ko.com/graduate_story_kawahara/",
    title:
      "挑戦を応援してくれる人がいる ─ ゼロ高は、ゼロをイチにするのに最適な場所ゼロ高2期生 河原晴馬さん ─",
    category: "ストーリー",
  },
  {
    image: "/no-image.png",
    href: "https://www.zero-ko.com/graduate-haori/",
    title:
      "経験、失敗は最大の学び！今、高校生だからこそやるべきこと ─ この時間を最大限楽しむ ゼロ高4期生 羽織みみさん ─",
    category: "ストーリー",
  },
  {
    image: "/no-image.png",
    href: "https://www.zero-ko.com/overseas-challenge/",
    title:
      "「高校生から世界へ！」カンボジア・ハワイ・韓国…3人のゼロ高生が海外で得た学びとは？",
    category: "インタビュー",
  },
  {
    image: "/no-image.png",
    href: "https://www.zero-ko.com/time-management/",
    title:
      "ストリートダンス全国優勝のゼロ高生が語る！手帳で自由時間を最大限活用する方法",
    category: "シンキング",
  },
];

export default async function FeaturedContent() {
  return (
    <section>
      <div className="w-inner mx-auto grid max-w-[1128px] grid-cols-[1fr] gap-6 lg:grid-cols-[1fr_1fr]">
        {articles[0] && (
          <Link
            href={articles[0].href || "#"}
            className="border-muted flex flex-col overflow-hidden rounded-3xl border"
          >
            <Image
              src={articles[0].image}
              alt=""
              width={552}
              height={311}
              className="aspect-video w-full object-cover"
            />
            <div className="flex flex-1 flex-col justify-around px-6 pt-6 pb-8 lg:px-8 lg:pt-12 lg:pb-16">
              <p className="text-[14px]">{articles[0].category}</p>
              <p className="mt-4 line-clamp-3 text-[20px]">
                {articles[0].title}
              </p>
            </div>
          </Link>
        )}
        <div className="flex flex-col gap-4">
          <p className="text-[14px]">注目のコンテンツ</p>
          <div className="flex flex-1 flex-col justify-end gap-6">
            {articles.slice(1, 4).map((article, i) => (
              <Link
                key={i}
                href={article.href || "#"}
                className={`border-muted overflow-hidden rounded-3xl border px-6 pt-6 pb-8 ${i === 1 ? "bg-surface" : ""}`}
              >
                <div>
                  <p className="text-[14px]">{article.category}</p>
                  <p className="mt-4 line-clamp-3 text-[20px]">
                    {article.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
