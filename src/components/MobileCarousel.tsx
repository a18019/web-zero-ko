"use client";

import { Children, type ReactNode, useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

interface MobileCarouselProps {
  itemCount: number;
  arrowSize?: string;
  children: ReactNode;
}

export function MobileCarousel({
  itemCount,
  arrowSize = "size-12",
  children,
}: MobileCarouselProps) {
  const [current, setCurrent] = useState(0);
  const slides = Children.toArray(children);

  const prev = () => setCurrent((value) => (value > 0 ? value - 1 : value));
  const next = () =>
    setCurrent((value) => (value < itemCount - 1 ? value + 1 : value));

  return (
    <>
      <div className="mt-8 overflow-hidden px-8 lg:hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="shrink-0 basis-full">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between px-8 lg:hidden">
        <div className="flex gap-4 px-2">
          {Array.from({ length: itemCount }, (_, index) => (
            <div
              key={index}
              className={`size-2 rounded-full ${index === current ? "bg-black" : "bg-muted"}`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            aria-label="前へ"
            onClick={prev}
            className={`flex ${arrowSize} bg-muted items-center justify-center rounded-full`}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label="次へ"
            onClick={next}
            className={`flex ${arrowSize} bg-muted items-center justify-center rounded-full`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
