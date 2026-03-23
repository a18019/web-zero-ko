import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
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
      <SubNav />
      <section className="pt-16 pb-20">
        <div className="w-inner mx-auto max-w-[1128px]">
          <h1 className="text-heading-lg text-center font-bold">ニュース</h1>
          <p className="text-body mt-4 text-center">
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
                  <Image
                    src={thumbnail || "/demo-image.png"}
                    alt=""
                    width={328}
                    height={184}
                    className="aspect-328/184 w-full object-cover"
                  />
                  <div className="flex flex-col gap-4">
                    <p className="text-body-sm">{getCategory(page)}</p>
                    <p className="text-heading-sm">{getTitle(page)}</p>
                    <p className="text-label-sm">{getPublicationDate(page)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Cta />
      <Footer />
    </>
  );
}
