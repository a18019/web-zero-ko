import Image from "next/image";

export default function CareerPath() {
  return (
    <section>
      <div className="w-inner mx-auto max-w-[1128px]">
        <h2 className="text-heading-lg text-center">進路</h2>

        <div>
          <Image
            src="/demo-image.png"
            alt=""
            width={328}
            height={184}
            className="mt-12 h-[184px] w-full object-cover"
          />
          <p className="text-body mt-6">
            説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります説明が入ります。
          </p>
        </div>
      </div>
    </section>
  );
}
