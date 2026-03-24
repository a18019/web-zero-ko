import Image from "next/image";

const worksTabItems = ["事業", "アート", "動画"];

const works = [
  { title: "テキストテキストテキスト" },
  { title: "テキストテキストテキスト" },
  { title: "テキストテキストテキスト" },
];

export default function StudentWorks() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-heading-lg lg:text-display text-center">
          生徒作品
        </h2>
        <fieldset className="mx-auto mt-12 flex max-w-[552px] gap-2 lg:mt-16">
          <legend className="sr-only">生徒作品カテゴリ</legend>
          {worksTabItems.map((tab, i) => (
            <label
              key={tab}
              className="text-heading-sm flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full border border-black text-black has-checked:bg-black has-checked:text-white"
            >
              <input
                type="radio"
                name="works-category"
                value={tab}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {tab}
            </label>
          ))}
        </fieldset>
        <div className="lg:mt:12 mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {works.map((work, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Image
                src="/demo-image.png"
                alt=""
                width={328}
                height={186}
                className="aspect-328/186 w-full object-cover"
              />
              <p className="text-body">{work.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
