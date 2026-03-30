import Image from "next/image";
import Link from "next/link";

const teachers = [
  {
    href: "#",
    image: "/no-image.png",
    role: "カリキュラム ／ 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。会社経営は17期目となる。経営者の目線から独自のカリキュラムを構築し、プロゼミの講師として講義を行う。",
  },
  {
    href: "#",
    image: "/no-image.png",
    role: "アクセラレータープログラム ／ 経営",
    name: "中野 達哉",
    bio: "高校在学中に渋谷で大規模イベントを主催、大学時代は飲食店を経営。22歳で株式会社linixを創業し、株式会社EXxの取締役COOとして全体統括を担当。その後、株式会社SoVaの共同創業や株式会社GAROを設立。",
  },
  {
    href: "#",
    image: "/no-image.png",
    role: "プレゼンテーション ／ 起業",
    name: "古賀 大喜",
    bio: "adidas Japanのマーケティング、商品開発事業部を経て、2019年に「宮古島冬まつり」を立ち上げ6,000人規模のイベントの企画・運営を行う。2020年デザイン会社を創業、2022年に株式会社プレゼンの達人を設立。",
  },
  {
    href: "#",
    image: "/no-image.png",
    role: "プレゼンテーション ／ 特別講師",
    name: "熊本 亜記",
    bio: "元劇団四季の舞台女優。2003年に劇団四季の初舞台では『ライオンキング』ヒロインのナラ役を務め『キャッツ』『コーラスライン』など数々の大作に出演する。2015年退団、その後は舞台、講演活動など多方面で活躍している。",
  },
];

export default function TeacherFeatures() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-[32px] lg:text-[48px]">講師のノート</h2>
        <div className="-mx-4 mt-12 overflow-hidden">
          <ul className="flex snap-x snap-mandatory scroll-pl-8 gap-4 overflow-x-scroll px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {teachers.map((teacher) => (
              <li key={teacher.name} className="flex-none snap-start">
                <Link
                  href={teacher.href}
                  className="border-muted block aspect-4/5 w-[296px] overflow-hidden rounded-3xl border"
                >
                  <Image
                    src={teacher.image}
                    width={248}
                    height={140}
                    alt=""
                    className="aspect-video w-full object-cover"
                  />
                  <div className="mt-4 px-6">
                    <p className="text-[12px]">{teacher.role}</p>
                    <p className="mt-2 text-[20px]">{teacher.name}</p>
                    <p className="mt-2 line-clamp-4 text-[14px]">
                      {teacher.bio}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
