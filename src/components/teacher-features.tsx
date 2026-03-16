"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

const teachers = [
  {
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
  {
    role: "プログラミング講師",
    name: "田中 太郎",
    bio: "元大手IT企業のエンジニア。プログラミング教育に情熱を注ぎ、多くの生徒をエンジニアとして輩出。",
  },
  {
    role: "アート講師",
    name: "山田 花子",
    bio: "現代美術家として国内外で活躍。アートを通じた自己表現の大切さを伝える。",
  },
  {
    role: "映像制作講師",
    name: "佐藤 次郎",
    bio: "映像ディレクターとして数々のCMやMVを制作。映像制作の基礎から応用までを指導。",
  },
];

export default function TeacherFeatures() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : c));
  const next = () => setCurrent((c) => (c < teachers.length - 1 ? c + 1 : c));

  return (
    <section className="pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">講師特集</h2>
      <div className="mt-8 overflow-hidden px-8">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {teachers.map((t, i) => (
            <div
              key={i}
              className="flex h-[360px] w-[288px] min-w-[288px] flex-col gap-2 rounded-[24px] border border-black p-6"
            >
              <div className="h-[135px] w-full bg-[#d9d9d9]" />
              <div className="flex flex-col gap-2">
                <p className="text-[12px] leading-[18px]">{t.role}</p>
                <p className="text-[20px] leading-[28px]">{t.name}</p>
                <p className="text-[14px] leading-[20px]">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ページネーション */}
      <div className="mt-6 flex items-center justify-between px-8">
        <div className="flex gap-4 px-2">
          {teachers.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full ${i === current ? "bg-black" : "bg-[#d9d9d9]"}`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={prev}
            className="flex size-11 items-center justify-center rounded-full bg-[#d9d9d9]"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={next}
            className="flex size-11 items-center justify-center rounded-full bg-[#d9d9d9]"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
