"use client";

import { useState } from "react";

const worksTabItems = ["事業", "アート", "動画"] as const;

export default function StudentWorks() {
  const [activeTab, setActiveTab] =
    useState<(typeof worksTabItems)[number]>("事業");

  return (
    <section className="px-4 pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">生徒作品</h2>
      {/* タブ */}
      <div className="mt-20 flex items-center gap-2 rounded-full border border-black p-1">
        {worksTabItems.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex flex-1 items-center justify-center rounded-full px-6 py-[10px] text-[20px] leading-[28px] ${activeTab === tab ? "bg-black text-white" : "text-black"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* 作品カード */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="h-[186px] w-full bg-[#d9d9d9]" />
        <p className="text-[16px] leading-[26px]">テキストテキストテキスト</p>
      </div>
    </section>
  );
}
