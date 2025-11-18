import Judul from "./Judul";
import PaketCard from "./PaketCard";

function HalamanPaketPenuh() {

    const paketData = [
        {
            id: 1,
            imageSrc: "/paket-morning-dolphin.png",
            title: "Morning Dolphin Tour",
            description: "Durasi 3 jam - Termasuk sarapan",
            price: "Rp. 150.000",
            rating: 4.3,
            reviews: 68,
        },
        {
            id: 2,
            imageSrc: "/paket-sunrise-cruise.png",
            title: "Sunrise Dolphin Cruise",
            description: "Durasi 2 jam - Termasuk snack & minum",
            price: "Rp. 350.000",
            rating: 4.7,
            reviews: 44,
        },
        {
            id: 3,
            imageSrc: "/paket-snorkeling.png",
            title: "Snorkeling Lovina",
            description: "Durasi 2 jam - Termasuk pemandu & guide",
            price: "Rp. 300.000",
            rating: 4.2,
            reviews: 39,
        },
        {
            id: 4,
            imageSrc: "/paket-dolphin-watching.png",
            title: "Dolphin Watching Tour",
            description: "Durasi 3 jam - Termasuk minuman hangat",
            price: "Rp. 200.000",
            rating: 4.4,
            reviews: 40,
        },
        {
            id: 5,
            imageSrc: "/paket-swim-with.png",
            title: "Swim with Dolphin",
            description: "Durasi 1,5 jam - Termasuk pelampung",
            price: "Rp. 200.000",
            rating: 4.6,
            reviews: 36,
        },
        {
            id: 6,
            imageSrc: "/paket-privat-tour.png",
            title: "Private Tour Guide",
            description: "Durasi 2 jam - Termasuk satu perahu khusus",
            price: "Rp. 400.000",
            rating: 4.5,
            reviews: 40,
        },
    ];
    return(
        <section className="my-16">
        {/* Judul */}
        <Judul header = {{
            title: "Paket Liburan Terbaik",
            description: "Nikmati berbagai pilihan paket wisata di Lovina mulai dari tur lumba-lumba, snorkeling, hingga private tour. Setiap paket dirancang agar perjalanan Anda lebih praktis, seru, dan berkesan"
            }} />
        {/* Grid semua paket */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 justify-items-center">
            {paketData.map((paket) => (
            <PaketCard key={paket.id} paket={paket} />
            ))}
        </div>
    </section>
    )
}
export default HalamanPaketPenuh;