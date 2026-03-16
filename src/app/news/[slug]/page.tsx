import Image from "next/image";
import Header from "@/components/header";

/* ── プレースホルダーデータ ── */

const article = {
  title: "タイトルタイトルタイトルタイトルタイトル",
  date: "2026年3月",
  author: "ゼロ高太郎",
};

/* ── SNSシェアアイコン ── */

const shareIcons = [
  { src: "/x.svg", alt: "X" },
  { src: "/youtube.svg", alt: "YouTube" },
  { src: "/instagram.svg", alt: "Instagram" },
  { src: "/link.svg", alt: "リンクをコピー" },
];

/* ── ページ ── */

export default function ArticlePage() {
  return (
    <>
      <Header />

      <div className="mx-auto max-w-[360px] px-4">
        {/* タイトル */}
        <h1 className="pt-16 text-center text-[32px] leading-[40px]">
          {article.title}
        </h1>

        {/* 日付 */}
        <p className="mt-4 text-center text-[14px] leading-[20px]">
          {article.date}
        </p>

        {/* 著者 */}
        <p className="mt-2 text-center text-[14px] leading-[20px]">
          {article.author}
        </p>

        {/* SNSシェアアイコン */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {shareIcons.map((icon) => (
            <button
              key={icon.alt}
              className="grid h-12 w-12 place-items-center"
              aria-label={icon.alt}
            >
              <Image src={icon.src} alt={icon.alt} width={24} height={24} />
            </button>
          ))}
        </div>

        {/* メイン画像プレースホルダー */}
        <div className="mt-8 aspect-[328/183] w-full bg-[#d9d9d9]" />

        {/* 本文 */}
        <p className="mt-8 text-[16px] leading-[26px]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        <p className="mt-6 text-[16px] leading-[26px]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        {/* 小見出し */}
        <h2 className="pt-12 text-[20px] leading-[28px]">
          小見出し小見出し小見出し
        </h2>

        {/* 本文（続き） */}
        <p className="mt-6 text-[16px] leading-[26px]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        {/* 動画埋め込みプレースホルダー */}
        <div className="relative mt-8 aspect-[328/183] w-full bg-[#d9d9d9]">
          <div className="absolute inset-0 grid place-items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-label="再生"
            >
              <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.5)" />
              <path d="M19 15l14 9-14 9V15z" fill="white" />
            </svg>
          </div>
        </div>

        {/* 追加テキスト */}
        <p className="mt-8 text-[16px] leading-[26px]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        {/* 追加画像プレースホルダー */}
        <div className="mt-8 aspect-[328/183] w-full bg-[#d9d9d9]" />

        {/* 追加テキスト */}
        <p className="mt-8 pb-20 text-[16px] leading-[26px]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
      </div>
    </>
  );
}
