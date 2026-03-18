import Image from "next/image";
import { MobileCarousel } from "./MobileCarousel";

const teachers = [
  {
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
  {
    role: "プログラミング講師",
    name: "田中 太郎",
    bio: "元大手IT企業のエンジニア。プログラミング教育に情熱を注ぎ、多くの生徒をエンジニアとして輩出。",
  },
  {
    role: "アート講師",
    name: "山田 花子",
    bio: "現代美術家として国内外で活躍。アートを通じた自己表現の大切さを伝える。",
  },
  {
    role: "映像制作講師",
    name: "佐藤 次郎",
    bio: "映像ディレクターとして数々のCMやMVを制作。映像制作の基礎から応用までを指導。",
  },
] as const;

export default function TeacherFeatures() {
  return (
    <section className="pt-20 lg:pt-32">
      <h2 className="text-center text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px]">
        講師特集
      </h2>

      {/* Mobile: carousel */}
      <MobileCarousel itemCount={teachers.length} arrowSize="size-11">
        {teachers.map((teacher) => (
          <div
            key={teacher.name}
            className="flex h-[360px] w-[288px] min-w-[288px] flex-col gap-2 rounded-[24px] border border-black p-6"
          >
            <Image
              src="/demo-image.png"
              alt=""
              width={288}
              height={135}
              className="h-[135px] w-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[12px] leading-[18px]">{teacher.role}</p>
              <p className="text-[20px] leading-[28px]">{teacher.name}</p>
              <p className="text-[14px] leading-[20px]">{teacher.bio}</p>
            </div>
          </div>
        ))}
      </MobileCarousel>

      {/* Desktop: grid */}
      <div className="mx-auto mt-12 hidden max-w-[1128px] flex-wrap gap-6 lg:flex">
        {teachers.map((teacher, index) =>
          index === 0 ? (
            <div
              key={teacher.name}
              className="flex h-[450px] w-[360px] flex-col gap-8 rounded-[32px] border border-black p-8"
            >
              <Image
                src="/demo-image.png"
                alt=""
                width={312}
                height={176}
                className="aspect-312/175.5 w-full object-cover"
              />
              <div className="flex flex-col gap-4">
                <p className="text-[14px] leading-[20px]">{teacher.role}</p>
                <p className="text-[28px] leading-[32px]">{teacher.name}</p>
                <p className="text-[16px] leading-[26px]">{teacher.bio}</p>
              </div>
            </div>
          ) : (
            <div
              key={teacher.name}
              className="relative h-[450px] w-[360px] overflow-hidden rounded-[32px]"
            >
              <Image
                src="/demo-image.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ),
        )}
      </div>
    </section>
  );
}
