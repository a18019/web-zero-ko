import Link from "next/link";

const featuredCards = [
  {
    tag: "イベント",
    title: "ZERO-1 EXPO 2026｜26年2月8日開催！",
    href: "#",
  },
  {
    tag: "特別授業",
    title:
      "「迷ったらワイルドな方へ行け！」武蔵野大学EMC学部長・伊藤羊一氏が語る、未来...",
    href: "#",
  },
  {
    tag: "特別授業",
    title:
      "『世界一楽しい決算書の読み方』著者・福代和也氏が登壇！「財務思考で読み解くビジネ...",
    href: "#",
  },
];

export default function FeaturedContent() {
  return (
    <section className="px-4">
      {/* メインカード（画像付き） */}
      <Link
        href="#"
        className="block overflow-hidden rounded-[24px] border border-black"
      >
        <div className="h-[184px] rounded-[24px] bg-[#d9d9d9]" />
        <div className="flex flex-col gap-4 overflow-hidden p-6">
          <p className="text-[14px] leading-[20px]">イベント</p>
          <p className="text-[20px] leading-[28px]">
            ホリエモン × ゼロ高｜ゼロ高公開授業の東京リアル開催
          </p>
        </div>
      </Link>

      {/* ラベル */}
      <div className="mt-10 border-b border-black pb-[6px]">
        <p className="text-[14px] leading-[20px]">注目のコンテンツ</p>
      </div>

      {/* テキストカード */}
      <div className="mt-6 flex flex-col gap-6">
        {featuredCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="flex flex-col gap-4 overflow-hidden rounded-[24px] border border-black p-6"
          >
            <p className="text-[14px] leading-[20px]">{card.tag}</p>
            <p className="text-[20px] leading-[28px]">{card.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
