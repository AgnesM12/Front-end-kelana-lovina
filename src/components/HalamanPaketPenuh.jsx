import Judul from "./Judul";
import PaketCard from "./PaketCard";
import paketData from "../components/DataDetailPaket.jsx";

function HalamanPaketPenuh() {

    return(
        <section className="my-16">
        {/* Judul */}
        <Judul header = {{
            title: "Paket Liburan Terbaik",
            description: "Nikmati berbagai pilihan paket wisata di Lovina mulai dari tur lumba-lumba, snorkeling, hingga private tour. Setiap paket dirancang agar perjalanan Anda lebih praktis, seru, dan berkesan"
            }} />

            {/* Grid semua paket */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 justify-items-start">
                {paketData.map((paket) => (
                <PaketCard key={paket.id} paket={paket} />
                ))}
            </div>
        </section>
    )
}
export default HalamanPaketPenuh;
