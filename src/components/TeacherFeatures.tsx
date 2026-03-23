import Image from "next/image";
import Link from "next/link";

const teachers = [
  {
    href: "#",
    image: "/demo-image.png",
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
  {
    href: "#",
    image: "/demo-image.png",
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
  {
    href: "#",
    image: "/demo-image.png",
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
  {
    href: "#",
    image: "/demo-image.png",
    role: "カリキュラム 責任者",
    name: "柄沢 雅之",
    bio: "ジュエリーブランドCapanaを創業し、ライブ配信事業や農業、ITブランディング、アパレルなど多分野で事業を展開。",
  },
];

export default function TeacherFeatures() {
  return (
    <section>
      <div className="mx-4">
        <h2 className="text-center text-[32px] leading-[40px]">講師特集</h2>
        <div className="-mx-4 mt-12 overflow-hidden">
          <ul className="flex snap-x snap-mandatory scroll-pl-8 gap-4 overflow-x-scroll px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {teachers.map((teacher, i) => (
              <li key={i} className="flex-none snap-start">
                <Link
                  href={teacher.href}
                  className="block aspect-4/5 w-[296px] overflow-hidden rounded-3xl border border-black p-6"
                >
                  <Image
                    src={teacher.image}
                    width={248}
                    height={140}
                    alt=""
                    className="aspect-video w-full object-cover"
                  />
                  <p className="mt-2 text-[12px] leading-[18px]">
                    {teacher.role}
                  </p>
                  <p className="mt-2 text-[20px] leading-[28px]">
                    {teacher.name}
                  </p>
                  <p className="mt-2 text-[14px] leading-[20px]">
                    {teacher.bio}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
