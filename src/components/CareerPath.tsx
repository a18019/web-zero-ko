import Image from "next/image";

export default function CareerPath() {
  return (
    <section className="px-4 pt-40">
      <h2 className="text-center text-[32px] leading-[40px]">進路</h2>

      <div>
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
    </section>
  );
}
