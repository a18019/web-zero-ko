export default function Slider({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-[32px] lg:text-[48px]">{title}</h2>
      </div>
      <div className="relative mt-12">
        <ul className="flex snap-x snap-mandatory scroll-pl-[calc(7/54*(100vw-360px)+16px)] gap-4 overflow-x-auto px-[calc(7/54*(100vw-360px)+16px)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </ul>
      </div>
    </section>
  );
}
