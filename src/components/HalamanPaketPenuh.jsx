import Judul from "./Judul";
import PaketCard from "./PaketCard";

function HalamanPaketPenuh() {

    const paketData = [
        {
            id: 1,
            imageSrc: "/paket-rafatour-dolphine-snorkling.png",
            title: "Rafatour dolphin snorkeling",
            description: "Durasi 3-4 jam",
            price: "Rp. 300.000",
            rating: 4.7,
            reviews: 44,
        },
        {
            id: 2,
            imageSrc: "/paket-seadolphine-lovina.png",
            title: "Seadolphine Lovina",
            description: "Durasi 2-3 Jam",
            price: "Rp. 350.000",
            rating: 4.5,
            reviews: 45,
        },
        {
            id: 3,
            imageSrc: "/paket-watching-dolphine-only.png",
            title: "Watching Dolphin Only",
            description: "Durasi 2 Jam",
            price: "Rp. 100.000",
            rating: 4.4,
            reviews: 54,
        },
        {
            id: 4,
            imageSrc: "/paket-snorkling-tur.png",
            title: "Snorkeling & Dolphin Tur",
            description: "Durasi 2 jam",
            price: "Rp. 350.000",
            rating: 4.4,
            reviews: 54,
        },
        {
            id: 5,
            imageSrc: "/dolphinWatchingTour.jpg",
            title: "Dolphin Watching Tur",
            description: "Durasi 3 jam",
            price: "Rp. 200.000",
            rating: 4.5,
            reviews: 40,
        },
        {
            id: 6,
            imageSrc: "/swimWithDolphin.jpg",
            title: "Swim with Dolphin",
            description: "Durasi 1,5 jam",
            price: "Rp. 200.000",
            rating: 4.6,
            reviews: 38,
        },
        {
            id: 7,
            imageSrc: "/privateTourGuide.png",
            title: "Private Tour Guide",
            description: "Durasi 2 jam",
            price: "Rp. 200.000",
            rating: 4.5,
            reviews: 40,
        },
        {
            id: 8,
            imageSrc: "/paket-snorkeling-lovina.png",
            title: "Snorkeling Lovina",
            description: "Durasi 2 jam",
            price: "Rp. 150.000",
            rating: 4.2,
            reviews: 38,
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
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 justify-items-start">
                {paketData.map((paket) => (
                <PaketCard key={paket.id} paket={paket} />
                ))}
            </div>
        </section>
    )
}
export default HalamanPaketPenuh;
