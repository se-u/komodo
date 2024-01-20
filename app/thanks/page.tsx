import { NavBottom } from "@/app/ui/home/nav-bottom";

export default function Thanks() {
  return (
    <>
      <div className="hero min-h-screen p-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/logologin.png" className="max-w-sm" />
          <div>
            <h1 className="text-5xl font-bold text-white border-b-[5px] inline border-[#F0B323]">
              Gerbang Suara
            </h1>
            <h2 className="text-3xl pt-10 font-bold text-[#F0B323]">
              Terimakasih Atas Pertisipasinya !
            </h2>
            <h3 className="text-white font-bold">
              Klik, Pilih Aman. Demokrasi Tanpa Keraguan
            </h3>
            <p className="py-2 text-white">
              Setiap suara yang Anda berikan memiliki dampak besar dalam
              menentukan arah bangsa ini.
            </p>
            <p className="text-white">
              Terima kasih atas kontribusi Anda dalam membangun masa depan yang
              lebih baik bersama dengan para pemimpin yang dipilih melalui
              demokrasi. Seribu perbedaan harus tetap menjadi satu suara!
            </p>
          </div>
        </div>
      </div>
      <NavBottom />
    </>
  );
}
