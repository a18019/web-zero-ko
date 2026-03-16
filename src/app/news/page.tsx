import Header from "@/components/header";

/* ── プレースホルダーデータ ── */

const newsItems = [
  {
    category: "イベント",
    title: "ZERO-1 EXPO 2026｜26年2月8日開催！",
    date: "2026/02/01",
  },
  {
    category: "特別授業",
    title:
      "「迷ったらワイルドな方へ行け！」武蔵野大学EMC学部長・伊藤羊一氏が語る、未来...",
    date: "2026/01/15",
  },
  {
    category: "特別授業",
    title:
      "『世界一楽しい決算書の読み方』著者・福代和也氏が登壇！「財務思考で読み解くビジネ...",
    date: "2025/12/20",
  },
  {
    category: "お知らせ",
    title: "2025年度 卒業証書授与式のお知らせ",
    date: "2025/12/01",
  },
  {
    category: "イベント",
    title: "ホリエモン × ゼロ高｜ゼロ高公開授業の東京リアル開催",
    date: "2025/11/15",
  },
];

/* ── ページ ── */

export default function NewsPage() {
  return (
    <>
      <Header />

      {/* タイトル */}
      <section className="px-4 pt-16 pb-12 text-center">
        <h1 className="text-[32px] leading-[40px] font-bold">ニュース</h1>
        <p className="mt-4 text-[16px] leading-[26px]">
          ゼロ高等学院の最新情報をお届けします
        </p>
      </section>

      {/* ニュースカード一覧 */}
      <section className="px-4 pb-20">
        <div className="flex flex-col gap-12">
          {newsItems.map((item, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-[24px] border border-black p-6"
            >
              {/* サムネイル */}
              <div className="aspect-[328/184] w-full rounded-[12px] bg-[#d9d9d9]" />

              {/* テキスト群 */}
              <div className="mt-6 flex flex-col gap-4">
                <p className="text-[14px] leading-[20px]">{item.category}</p>
                <p className="text-[20px] leading-[28px]">{item.title}</p>
                <p className="text-[12px] leading-[18px]">{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
