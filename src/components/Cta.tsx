import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-[#e8f0fe] py-12">
      <div className="w-inner mx-auto flex max-w-[744px] flex-col gap-4 lg:flex-row-reverse lg:justify-between">
        <Image
          src="/pamphlet.png"
          alt="ゼロ高等学院 学校案内パンフレット"
          width={120}
          height={170}
          className="w-[120px] border border-black lg:w-[168px]"
        />
        <div className="max-w-[456px] flex-1 lg:flex lg:flex-col lg:justify-between">
          <div>
            <h2 className="text-heading-sm lg:text-display font-bold">
              学校案内をお届け
            </h2>
            <p className="text-body mt-4 lg:mt-6">
              ゼロ高等学院への入学を検討している中学生と保護者の方に向けて、学校の特長や学び方を確認できる資料をご案内します。
            </p>
          </div>
          <Link
            href="#"
            className="text-body mt-6 mr-auto inline-flex h-[48px] items-center justify-center rounded-full border border-black px-6"
          >
            無料で申し込む
          </Link>
        </div>
      </div>
    </section>
  );
}
