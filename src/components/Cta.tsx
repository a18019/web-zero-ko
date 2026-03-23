import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-[#e8f0fe] py-12">
      <div className="mx-4">
        <div className="h-[170px] w-[120px] overflow-hidden border border-black">
          <Image
            src="/pamphlet.png"
            alt="ゼロ高等学院 学校案内パンフレット"
            width={120}
            height={170}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-[20px] leading-[28px] font-bold">
          学校案内をお届け
        </h2>
        <p className="mt-4 max-w-[328px] text-[16px] leading-[26px]">
          ゼロ高等学院への入学を検討している中学生と保護者の方に向けて、学校の特長や学び方を確認できる資料をご案内しています。
        </p>
        <Link
          href="#"
          className="mt-6 inline-flex h-[48px] items-center justify-center rounded-full border border-black px-6 text-[16px] leading-[26px]"
        >
          無料で申し込む
        </Link>
      </div>
    </section>
  );
}
