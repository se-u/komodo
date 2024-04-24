export default function About() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/logologin.png" className="max-w-sm" />
          <div>
            <h1 className="text-5xl font-bold text-white border-b-[5px] inline border-[#F0B323]">
              About Us
            </h1>
            <h2 className="text-3xl pt-10 font-bold text-[#F0B323]">
              Gerbang Suara
            </h2>
            <h3 className="text-white font-bold">
              Klik, Pilih Aman. Demokrasi Tanpa Keraguan
            </h3>
            <p className="py-2">
              kami berkomitmen untuk mengubah lanskap demokrasi melalui
              teknologi blockchain. Kami fokus menciptakan sistem pemilihan yang
              aman, transparan, dan tidak dapat dimanipulasi.
            </p>
            <p>
              Bayangkan masa depan di mana setiap suara tercatat pada blockchain
              yang tidak dapat diubah, memastikan integritas proses pemilihan.
              Keahlian kami berada dalam mengembangkan solusi mutakhir yang
              menjamin privasi pemilih sambil menjaga standar keamanan
              tertinggi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
