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
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-heading-lg text-center">FAQ</h2>
        <div className="mt-8">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className={cn(
                "group flex flex-col py-4 details-content:grid details-content:grid-rows-[0fr] details-content:[transition:grid-template-rows_150ms,content-visibility_150ms_allow-discrete] open:details-content:grid-rows-[1fr]",
                i < faqItems.length - 1 && "border-b border-black",
              )}
            >
              <summary className="grid w-full grid-cols-[1fr_19px] place-items-stretch gap-4 text-left">
                <p className="text-body">{item.q}</p>
                <span className="relative ml-[9px] grid place-items-center">
                  {[
                    {
                      open: "group-open:-translate-y-1 group-open:rotate-135",
                      closed: "translate-y-1 rotate-225",
                    },
                    {
                      open: "group-open:-translate-y-1 group-open:rotate-45",
                      closed: "translate-y-1 -rotate-45",
                    },
                  ].map((rot, j) => (
                    <span
                      key={j}
                      className={cn(
                        "absolute h-px w-2.5 origin-[0.5px_50%] rounded-full bg-black transition-transform",
                        rot.closed,
                        rot.open,
                      )}
                    />
                  ))}
                </span>
              </summary>
              <div className="overflow-hidden">
                <p className="text-body min-h-0 py-4 pr-8">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
