import { NavBottom } from "@/app/ui/home/nav-bottom";

export default function page() {
  return (
    <div className="container mx-auto px-40 py-20">
      {/* Section with three images */}
      <div className="flex justify-center gap-6  items-center mb-8">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="max-w-sm">
            <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
              <img
                className="w-full h-64 object-cover rounded-md"
                src={`/${index + 1}.png`}
                alt={`Step ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Section with voting process explanation */}
      <div className="max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Panduan Voting Blockchain</h2>
        <p className="mb-4">
          Silakan ikuti langkah-langkah di bawah untuk melakukan voting
          menggunakan blockchain:
        </p>
        <ol className="list-decimal ml-6">
          <li>1. Masukkan data diri anda.</li>
          <li>2. Tunggu verifikasi data.</li>
          <li>3. Pilih kandidat sesuai keinginan.</li>
        </ol>
        <p className="mt-4">
          Pastikan Anda menggunakan Metamask untuk melakukan proses voting.
        </p>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
        {[
          {
            question: "Bagaimana cara menggunakan Metamask?",
            answer:
              "Silakan ikuti langkah-langkah berikut untuk menginstal dan menggunakan Metamask.",
          },
          {
            question: "Bagaimana jika saya lupa password Metamask?",
            answer:
              "Anda dapat mereset password Metamask dengan mengikuti panduan pada situs resmi Metamask.",
          },
          // Add more FAQs as needed
        ].map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <NavBottom />
    </div>
  );
}
