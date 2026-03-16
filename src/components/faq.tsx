"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "./icons";

const faqItems = [
  {
    q: "質問が入りますか質問が入りますか？",
    a: "回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります。",
  },
  {
    q: "質問が入りますか質問が入りますか？",
    a: "回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります。",
  },
  {
    q: "質問が入りますか質問が入りますか？",
    a: "回答が入ります、回答が入ります、回答が入ります、回答が入ります。",
  },
  {
    q: "質問が入りますか質問が入りますか？",
    a: "回答が入ります、回答が入ります、回答が入ります、回答が入ります、回答が入ります。",
  },
  {
    q: "質問が入りますか質問が入りますか？",
    a: "回答が入ります、回答が入ります、回答が入ります。",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="px-4 pt-20">
      <h2 className="text-center text-[32px] leading-[40px]">FAQ</h2>
      <div className="mt-[72px]">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col py-4 ${i < faqItems.length - 1 ? "border-b border-black" : ""}`}
          >
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex w-full items-center gap-4 text-left"
            >
              <p className="flex-1 text-[16px] leading-[26px]">{item.q}</p>
              {openFaq === i ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openFaq === i && (
              <div className="pt-4 pr-8">
                <p className="text-[16px] leading-[26px]">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
