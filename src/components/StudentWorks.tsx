"use client";

import Image from "next/image";
import { useState } from "react";

const worksTabItems = ["事業", "アート", "動画"] as const;

const works = [
  { title: "テキストテキストテキスト" },
  { title: "テキストテキストテキスト" },
  { title: "テキストテキストテキスト" },
];

export default function StudentWorks() {
  const [activeTab, setActiveTab] =
    useState<(typeof worksTabItems)[number]>("事業");

  return (
    <section className="px-4 pt-24">
      <h2 className="text-center text-[32px] leading-[40px]">生徒作品</h2>
      {/* タブ */}
      <div className="mt-20 flex items-center gap-2 rounded-full border border-black p-1">
        {worksTabItems.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex h-[48px] flex-1 items-center justify-center rounded-full px-6 py-[10px] text-[16px] leading-[26px] ${activeTab === tab ? "bg-black text-white" : "text-black"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* 作品カード: mobile=1列, desktop=3列 */}
      <div className="mt-6 flex flex-col gap-2">
        {works.map((work, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Image
              src="/demo-image.png"
              alt=""
              width={328}
              height={186}
              className="aspect-328/186 w-full object-cover"
            />
            <p className="text-[16px] leading-[26px]">{work.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
