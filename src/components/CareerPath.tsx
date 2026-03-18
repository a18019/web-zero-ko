import Image from "next/image";

export default function CareerPath() {
  return (
    <section className="px-4 pt-20 lg:pt-32">
      <h2 className="text-center text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px]">
        進路
      </h2>

      {/* Mobile */}
      <div className="lg:hidden">
        <Image
          src="/demo-image.png"
          alt=""
          width={328}
          height={184}
          className="mt-[72px] h-[184px] w-full object-cover"
        />
        <p className="mt-8 text-[16px] leading-[26px]">
          説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります。
        </p>
      </div>

      {/* Desktop */}
      <div className="mx-auto mt-20 hidden max-w-[744px] items-start gap-6 lg:flex">
        <p className="w-[360px] shrink-0 text-[16px] leading-[26px]">
          説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります。
        </p>
        <Image
          src="/demo-image.png"
          alt=""
          width={360}
          height={215}
          className="h-[215px] w-[360px] shrink-0 object-cover"
        />
      </div>
    </section>
  );
}
