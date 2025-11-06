import React, {useState} from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import PaketCard from "../components/PaketCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function RiwayatPemesanan() {

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
    ];
    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-16 overflow-x-hidden">
            <HeroSection hero={{
                imageSrc: "/hero.png",
                altText: "hero",
                title: "Riwayat Pemesanan"}}
            />
            <div className="mt-16">
                <Judul header={{
                    title: "Daftar Pemesanan",
                    description: "Pantau pemesanan Anda, mulai dari tiket yang sudah selesai hingga yang dibatalkan." }}
                />
                <DaftarPesanan />
            </div>
            <Judul header={{
                    title: "Daftar Pemesanan",
                    description: "Pantau pemesanan Anda, mulai dari tiket yang sudah selesai hingga yang dibatalkan."}}
                />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-16">
            {paketData.map((paket) => (
            <PaketCard key={paket.id} paket={paket} />
            ))}
        </div>
        </main>
    )
};
export default RiwayatPemesanan;



const DaftarPesanan = () => {
    const [filter, setFilter] = useState("Semua");

    const dataPemesanan = [
        {
            id: 1,
            image: "/paket-sunrise-cruise.png",
            title: "Sunrise Dolphin Cruise",
            deskripsi: "Durasi 3 jam - Termasuk snack & minum",
            tanggal: "01 Agustus 2025",
            status: "Selesai",
        },
        {
            id: 2,
            image: "/paket-snorkeling.png",
            title: "Snorkeling Lovina",
            deskripsi: "Durasi 2 jam - Termasuk snorkel dan pemandu wisata",
            tanggal: "13 September 2025",
            status: "Dibatalkan",
        },
        {
            id: 3,
            image: "/paket-morning-dolphin.png",
            title: "Morning Dolphin Tour",
            deskripsi: "Durasi 1 jam - Termasuk minuman ringan",
            tanggal: "09 November 2025",
            status: "Selesai",
        },
        {
            id: 4,
            image: "/paket-dolphin-watching.png",
            title: "Dolphin Watching Tour",
            deskripsi: "Durasi 3 jam - Termasuk minuman hangat",
            tanggal: "17 November 2025",
            status: "Dibatalkan",
        },
        {
            id: 5,
            image: "/paket-privat-tour.png",
            title: "Private Tour Guide",
            deskripsi: "Durasi 2 jam - Termasuk satu perahu khusus",
            tanggal: "21 Desember 2025",
            status: "Selesai",
        },
        {
            id: 6,
            image: "/paket-swim-with.png",
            title: "Swim with Dolphin",
            deskripsi: "Durasi 1.5 jam - Termasuk pelampung",
            tanggal: "25 Desember 2025",
            status: "Dibatalkan",
        },
        ];
    
        const getStatusColor = (status) => {
        switch (status) {
            case "Selesai":
            return "bg-green-600";
            case "Dibatalkan":
            return "bg-red-600";
            default:
            return "bg-gray-400";
        }
        };
    
        const filteredData =
        filter === "Semua"
            ? dataPemesanan
            : dataPemesanan.filter((item) => item.status === filter);
    
        return (
        <section className="w-full mt-8">
            {/* Tombol Filter */}
            <div className="flex gap-4">
            {["Semua", "Selesai", "Dibatalkan"].map((item) => (
                <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-6 py-2.5 font-semibold rounded-full border transition-all duration-300
                    ${
                    filter === item
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                    }`}
                >
                {item}
                </button>
            ))}
            </div>
    
            {/* Swiper List */}
            <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={2}
            navigation={true}
            slidesPerView={2}
            breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 30 },
            }}
            className="mySwiper"
            >
            {filteredData.map((item) => (
                <SwiperSlide key={item.id}>
                {/* CARD */}
                <div className="w-[500px] max-w-full p-6 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col items-center gap-4 m-auto my-16">
                    {/* Gambar + Info */}
                    <div className="flex gap-4 items-center w-full">
                    <img
                        className="w-40 h-32 rounded-2xl object-cover"
                        src={item.image}
                        alt={item.title}
                    />
                    <div className="flex flex-col justify-between flex-1">
                        <div>
                        <div className="text-zinc-800 text-xl font-semibold">
                            {item.title}
                        </div>
                        <div className="text-Warna2 text-base font-normal">
                            {item.deskripsi}
                        </div>
                        </div>
                        <div className="text-zinc-800 text-base font-medium mt-2">
                        {item.tanggal}
                        </div>
                    </div>
                    </div>
    
                    {/* Tombol Status */}
                    <div
                    className={`w-full h-10 px-4 py-2 rounded-lg flex justify-center items-center ${getStatusColor(
                        item.status
                    )}`}
                    >
                    <div className="text-center text-white text-base font-bold">
                        {item.status}
                    </div>
                    </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </section>
        );
    };