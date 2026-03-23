import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderNav from "@/components/SubNav";
import {
  fetchPages,
  getCategory,
  getPublicationDate,
  getThumbnailUrl,
  getTitle,
} from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlesPage() {
  const allPages = await fetchPages();
  const pages = allPages.slice(0, 10);

  return (
    <>
      <Header />
      <HeaderNav />
      <section className="px-4 pt-16 pb-20">
        <h1 className="text-center text-[32px] leading-[40px] font-bold">
          ニュース
        </h1>
        <p className="mt-4 text-center text-[16px] leading-[26px]">
          ゼロ高等学院の最新ニュースをお届けします
        </p>
        <div className="mt-16 flex flex-col gap-12">
          {pages.map((page) => {
            const thumbnail = getThumbnailUrl(page);
            return (
              <Link
                key={page.id}
                href={`/articles/${page.id}`}
                className="flex flex-col gap-6 rounded-[24px] border border-black p-6"
              >
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt=""
                    width={328}
                    height={184}
                    className="aspect-328/184 w-full object-cover"
                  />
                ) : (
                  <div className="bg-muted aspect-328/184 w-full" />
                )}
                <div className="flex flex-col gap-4">
                  <p className="text-[14px] leading-[20px]">
                    {getCategory(page)}
                  </p>
                  <p className="text-[20px] leading-[28px]">{getTitle(page)}</p>
                  <p className="text-[12px] leading-[18px]">
                    {getPublicationDate(page)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Cta />
      <Footer />
    </>
  );
}
