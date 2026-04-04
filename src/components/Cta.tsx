import Image from "next/image";

export default function Cta() {
  return (
    <section className="bg-accent-navy py-12">
      <div className="w-inner mx-auto flex max-w-[744px] flex-col gap-4 lg:flex-row-reverse lg:justify-between">
        <Image
          src="/pamphlet.png"
          alt="ゼロ高等学院 学校案内パンフレット"
          width={120}
          height={170}
          className="w-[120px] lg:w-[168px]"
        />
        <div className="max-w-[456px] flex-1 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <h2 className="text-xl font-bold lg:text-5xl">学校案内をお届け</h2>
            <p className="mt-4 text-base lg:mt-6">
              ゼロ高等学院への入学を検討している中学生と保護者の方に向けて、学校の特長や学び方を確認できる資料をご案内します。
            </p>
          </div>
          <a
            href="https://www.zero-ko.com/request/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-lime text-accent-navy mt-6 mr-auto inline-flex h-[48px] items-center justify-center rounded-full px-6 text-base"
          >
            無料で申し込む
          </a>
        </div>
      </div>
    </section>
  );
}
