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
        <h2 className="text-[2rem] lg:text-5xl">{title}</h2>
      </div>
      <div className="relative">
        <ul className="flex snap-x snap-mandatory scroll-pl-[calc(7/54*(100vw-360px)+16px)] gap-4 overflow-x-auto px-[calc(7/54*(100vw-360px)+16px)] py-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </ul>
      </div>
    </section>
  );
}
