import {React, useState} from "react";

import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul"
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";

function Ulasan() {
    const [filter, setFilter] = useState({});
    
    const reviews = [
        {
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
        {
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
    });

    return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
        <HeroSection hero={{
            imageSrc: "/hero.png",
            altText: "hero",
            title: "Pengalaman Mereka"
        }} />
        <div className="my-16 "> 
        <Judul header={{
            title: "Kisah Perjalanan Pengunjung Lovina",
            description: "Setiap orang punya cerita seru setelah berkunjung ke Pantai Lovina. Ada yang berbagi tentang indahnya sunrise, ada yang senang melihat lumba-lumba dari dekat. Di sini, kamu bisa temukan kisah nyata mereka yang sudah merasakan liburan di Lovina"
        }}/>
        </div>

        <FilterUlasan onFilterChange={handleFilterChange} />

        <div className="mt-8">
            {filtered.length > 0 ? (
                filtered.map((r,i) => <ReviewCard key={i} review={r} />)
            ):(
                <p className="text-center text-gray-500 mt-60">
                    Tidak ada ulasan yang cocok
                </p>
            )}
        </div>
    </main>
    );
}
export default Ulasan;