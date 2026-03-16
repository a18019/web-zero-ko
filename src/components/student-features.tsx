"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

const students = [
  {
    tag: "ヒストリー",
    title: "昼夜逆転ゲーム漬けの毎日から、映像制作チームのリーダーへ",
    date: "2025年2月",
  },
  {
    tag: "ヒストリー",
    title: "不登校から起業家へ。ゼロ高で見つけた自分だけの道",
    date: "2025年1月",
  },
  {
    tag: "ヒストリー",
    title: "音楽と出会い、世界が広がった3年間",
    date: "2024年12月",
  },
  {
    tag: "ヒストリー",
    title: "プログラミング未経験からアプリ開発コンテスト優勝へ",
    date: "2024年11月",
  },
];

export default function StudentFeatures() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : c));
  const next = () => setCurrent((c) => (c < students.length - 1 ? c + 1 : c));

  return (
    <section className="pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">生徒特集</h2>
      <div className="mt-8 overflow-hidden px-8">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {students.map((s, i) => (
            <div
              key={i}
              className="flex h-[360px] w-[288px] min-w-[288px] flex-col items-start justify-end rounded-[24px] bg-[#d9d9d9]"
            >
              <div className="flex w-full flex-col gap-2 p-6">
                <span className="inline-flex w-fit items-center rounded-full bg-black px-[6px] py-[3px] text-[10px] leading-[14px] text-white">
                  {s.tag}
                </span>
                <p className="text-[24px] leading-normal">{s.title}</p>
                <p className="text-[14px] leading-[20px]">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ページネーション */}
      <div className="mt-6 flex items-center justify-between px-8">
        <div className="flex gap-4 px-2">
          {students.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full ${i === current ? "bg-black" : "bg-[#d9d9d9]"}`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={prev}
            className="flex size-12 items-center justify-center rounded-full bg-[#d9d9d9]"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={next}
            className="flex size-12 items-center justify-center rounded-full bg-[#d9d9d9]"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
