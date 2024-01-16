export default function Hero(){
    return (
        <>
            <div className="hero min-h-screen bg-white">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="/gerbangsuara.png"
                         className="max-w-sm rounded-lg" alt="Logo Gerbang Suara"/>
                    <div>
                        <h1 className="text-6xl font-bold text-[#012169] border-b-[8px] inline border-[#F0B323]">Gerbang
                            Suara</h1>
                        <h2 className="text-orange-600 mt-5 text-2xl font-bold">Welcome to Decentralized Voting
                            Application👋</h2>
                        <h3 className="text-gray-800 text-lg font-semibold mt-1">Klik,Pilih,Aman. Demokrasi Tanpa
                            Keraguan</h3>
                        <p className="text-gray-800 mt-4 text-base">Gerbang Suara adalah aplikasi e-voting berbasis
                            Blockchain dengan mengutamakan kerahasiaan
                            dan keamanan.</p>
                        <a href="/guide">
                            <button
                                className="btn bg-[#0f1035] text-white mt-2 px-[40px] hover:bg-white hover:text-black">
                                Get Started</button>
                        </a>
                </div>
                </div>
            </div>
        </>
    )
}