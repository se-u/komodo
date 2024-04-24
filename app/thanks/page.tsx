"use client";
import Image from "next/image";
export default function Thanks() {
  return (
    <>
      <div className="mx-auto flex max-w-3xl  justify-center ">
        <div className="max-w-3xl flex-col text-center ">
          <div>
            <Image
              alt=""
              height={400}
              width={400}
              src="/hero-light.jpg"
              className="mx-auto w-[400px] bg-cover "
            />

            <h1 className="inline border-b-[5px] border-[#F0B323] text-5xl font-bold">
              Gerbang Suara
            </h1>
            <h2 className="pt-10 text-3xl font-bold">
              Terimakasih Atas Pertisipasinya !
            </h2>

            <p className="py-2">
              Setiap suara yang Anda berikan memiliki dampak besar dalam
              menentukan arah bangsa ini.
            </p>
            <p className="">
              Terima kasih atas kontribusi Anda dalam membangun masa depan yang
              lebih baik bersama dengan para pemimpin yang dipilih melalui
              demokrasi. Seribu perbedaan harus tetap menjadi satu suara!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
