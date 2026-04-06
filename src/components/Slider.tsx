export default function Slider({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-content-0-sm sm:w-content-sm-lg lg:w-content-lg mx-auto max-w-[1128px]">
        <h2 className="text-[2rem] lg:text-5xl">{title}</h2>
      </div>
      <div className="relative">
        <ul className="sm:scroll-pl-outer scrollbar-none flex snap-x snap-mandatory gap-[min(4vw,1.5rem)] overflow-x-auto px-[50%] py-12">
          {children}
        </ul>
      </div>
    </section>
  );
}
