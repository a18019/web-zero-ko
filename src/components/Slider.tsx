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
        <ul className="scroll-pl-outer px-outer scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto py-12">
          {children}
        </ul>
      </div>
    </section>
  );
}
