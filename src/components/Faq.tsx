import { cn } from "@/lib/utils";

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
  return (
    <section>
      <div className="w-inner mx-auto max-w-[744px]">
        <h2 className="text-[32px] lg:text-[48px]">FAQ</h2>
        <div className="lg:mt12 mt-8">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className={cn(
                "group flex flex-col py-4 details-content:grid details-content:grid-rows-[0fr] details-content:[transition:grid-template-rows_150ms,content-visibility_150ms_allow-discrete] open:details-content:grid-rows-[1fr]",
                i < faqItems.length - 1 && "border-muted border-b",
              )}
            >
              <summary className="grid w-full grid-cols-[1fr_19px] place-items-stretch gap-4 text-left">
                <p className="text-[16px]">{item.q}</p>
                <span className="relative ml-[9px] grid place-items-center">
                  <span className="bg-foreground absolute h-px w-2.5 origin-[0.5px_50%] translate-y-1 rotate-225 rounded-full transition-transform group-open:-translate-y-1 group-open:rotate-135" />
                  <span className="bg-foreground absolute h-px w-2.5 origin-[0.5px_50%] translate-y-1 -rotate-45 rounded-full transition-transform group-open:-translate-y-1 group-open:rotate-45" />
                </span>
              </summary>
              <div className="overflow-hidden">
                <p className="min-h-0 py-4 pr-8 text-[16px]">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
