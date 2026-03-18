import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-16 text-center">
      <div className="mx-4">
        <h1 className="grid h-10 place-items-center">
          <Image src="/text-logo.svg" width={237} height={32} alt="" />
        </h1>
        <p className="mt-8 text-[20px] leading-[28px] font-bold">
          キャッチコピーキャッチコピーキャッチコピーキャッチコピーキャッチコピー
        </p>
      </div>
    </section>
  );
}
