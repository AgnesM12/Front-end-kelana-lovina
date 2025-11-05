import React, {useState} from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";


function ReviewRating() {
    const beriUlasan = [
        {
            imageSrc:"/paket-sunrise-cruise.png",
            title:"Sunrise Dolphin Cruise",
            desk: "Durasi 2 jam - Termasuk snack & minum"
        },
        {
            imageSrc:"/paket-snorkeling.png",
            title:"Snorkeling Lovina",
            desk: "Durasi 2 jam - Termasuk pelampung & guide"
        },

    ]

    const [filter, setFilter] = useState({});
    
    const reviews = [
        {
        id : 1,
        avatar: "/Alenty.svg",
        username: 'Alenty M',
        rating: 5,
        kategori: "snorkeling",
        date: "1 September 2025",
        tripTitle: "Snorkeling dan Dolphine Tur",
        text: "Snorkeling menjangan sangat cocok di tempat ini layanan very good. Guide sangat ramah makan siang enak harga terjangkau sangat cocok di rekomendasi kan.",
        likes: 8,
        images: ["/reviewA-1.png", "/reviewA-2.png", "/reviewA-3.png"],
        },
        {
        id : 2,
        avatar: "/Allena.svg",
        username: 'Allena',
        rating: 5,
        kategori: "sunrise",
        date: "13 Agustus 2025",
        tripTitle: "Sunrise Dolphine Tur",
        text: "Penyedia wisata lumba-lumba terbaik di area ini. Harga terjangkau untuk penduduk lokal dan terjangkau untuk wisatawan asing. Sebagian besar kapal mengakhiri wisata pukul 08.00, sementara tur yang disediakan oleh Dolphin Sunrise Lovina berlangsung lebih lama hingga sedikit lebih dari pukul 09.00, memberikan kesempatan untuk melihat lumba-lumba dengan perahu yang lebih sedikit. Juru mudi kapal sangat ramah dan cakap, ia tahu cara mendekati lumba-lumba dan memastikan pemandangan terbaik.",
        likes: 10,
        images: ["/reviewAl-1.png", "/reviewAl-2.png", "/reviewAl-3.png"],
        },
        {
            id: 3,
            avatar: "/sanjaya.svg",
            username: 'Sanjaya William',
            rating: 4,
            kategori: "sunrise",
            date: "13 September 2025",
            tripTitle: "Sunrise Dolphin Cruise",
            text: "Seruuu bangettt!!! Berenang sama dolphin yang rame seruu, terus dikasih tips yang detail sama guidenya, bener2 save bangett. Selalu ditanyain udh puas blm liat dolphinnya klo belum bakalan diajak liat terus sampe udh puas bgttt!!! Bapak guide nya juga baik sekali kasih kita gorengan krn blm sarapan🥺 sehat2 selalu ya pak👍🏻 nama guide nya pak Dolet👍🏻👍🏻👍🏻👍🏻Nanti klo mau balik lagi pastiii bakalan book disini lagi dan req pak Doket guidenya klo bisaa hihi👍🏻",
            likes: 10,
            images: ["/reviewS-1.png", "/reviewS-2.png", "/reviewS-3.png"],
            },
    ];

    const handleFilterChange = (value) => setFilter(value);

    const filtered = reviews.filter((r) => {
        return (
            (!filter.rating || r.rating === Number(filter.rating)) &&
            (!filter.kategori || r.kategori === filter.kategori) &&
            (!filter.search || 
                r.username.toLowerCase().includes(filter.search.toLowerCase()) || 
                r.tripTitle.toLowerCase().includes(filter.search.toLowerCase()))
        );
    })
    .sort((a, b) => {
        if (filter.waktu === "terbaru") {
            const bulanMap = {
                Januari: 0,
                Februari: 1,
                Maret: 2,
                April: 3,
                Mei: 4,
                Juni: 5,
                Juli: 6,
                Agustus: 7,
                September: 8,
                Oktober: 9,
                November: 10,
                Desember: 11,
            };
            // ubah format dari string ke object
            const parseDate = (str) => {
                const [tanggal, bulan, tahun] = str.split(" ");
                return new Date(tahun, bulanMap[bulan], tanggal);
            };
    
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
    
            return dateB - dateA;
        }
})    

    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-16 overflow-x-hidden">
            <HeroSection hero={{
                imageSrc: "/hero.png",
                altText: "hero",
                title: "Tambahkan Ulasanmu"
            }} />
            <div className="mt-16">
                <Judul header={{
                    title: "Cerita Perjalananmu di Lovina",
                    description: "Lihat kembali aktivitas seru yang sudah kamu coba selama berada di Lovina. Berikan ulasan dan bagikan pengalamanmu, agar pengunjung lain bisa mendapatkan inspirasi dan informasi dari ceritamu."
                }} />
            </div>
            <div className="my-16 ">
                <p className="text-zinc-800 text-2xl font-bold">Jejak Perjalanan yang Belum Tertulis</p>
                <div className="mt-10 flex flex-wrap gap-8">
                    {beriUlasan.map((item,index) => (
                        <UlasanCard
                        key={index}
                        aktivitas={item}
                        />
                    ))}
                </div>
            </div>
            <FilterUlasan onFilterChange={handleFilterChange} />
        <div className="mt-8 ">
            {filtered.length > 0 ? (
                filtered.map((r,i) => <ReviewCard key={i} review={r} />)
            ):(
                <p className="text-center text-gray-500 mt-60">
                    Tidak ada ulasan yang cocok
                </p>
            )}
        </div>
        </main>
    )
}
export default ReviewRating;


const UlasanCard = ({ aktivitas }) => {
    return (
        <div className="w-96 p-6 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden  items-center gap-6 flex flex-col">
            <img 
            className="w-80 h-72 rounded-2xl object-cover" 
            src={aktivitas.imageSrc} 
            alt={aktivitas.title} 
            />
            <div className="flex flex-col gap-2">
            <h3 className="w-80 text-zinc-700 text-2xl font-semibold">
                {aktivitas.title}
            </h3>
            <p className="w-80 text-gray-600 text-xl font-normal pb-6">
                {aktivitas.desk}
            </p>
            <button className="w-80 bg-primary text-white text-xl font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Tambahkan Cerita Anda
            </button>
            </div>
        </div>
        );
    };