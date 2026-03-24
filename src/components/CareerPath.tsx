import Image from "next/image";

export default function CareerPath() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[744px]">
        <h2 className="text-heading-lg lg:text-display text-center">進路</h2>
        <div className="mt-12 flex flex-col items-center gap-6 lg:flex-row-reverse">
          <Image
            src="/demo-image.png"
            alt=""
            width={328}
            height={185}
            className="aspect-video w-full min-w-0 flex-1 object-cover"
          />
          <p className="text-body flex-1">
            説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります。
          </p>
        </div>
      </div>
    </section>
  );
}
