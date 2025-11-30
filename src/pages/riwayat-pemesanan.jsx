    import React, {useState, useEffect} from "react";
    import HeroSection from "../components/HeroSection";
    import Judul from "../components/Judul";
    import PaketCard from "../components/PaketCard";
    import { useLocation } from "react-router-dom";

    import { Swiper, SwiperSlide } from "swiper/react";
    import { Navigation, Pagination, A11y } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";


    function RiwayatPemesanan() {

        const {state} = useLocation();
        console.log(state?.status);
        const status = state?.status;
        const [dataPemesanan, setDataPemesanan] = useState([]);

        useEffect(() => {
            const tiket = JSON.parse(localStorage.getItem("riwayat")) || [];

            const normalisasi = tiket.map((item, idx) => ({
                id: idx + 1,
                imageSrc: item.imageSrc ?? "/paket-default.png",
                title: item.paket ?? "paket",
                deskripsi: item.deskripsi ?? "" ,
                tanggal: item.tanggal ?? "",
                status:
                    item.status?.toLowerCase() === "selesai" ||
                    item.status?.toLowerCase() === "berhasil"
                        ? "Selesai"
                        : "Dibatalkan"
            }));
            setDataPemesanan(normalisasi);
        }, []);

        return (
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-16 overflow-x-hidden">
                <HeroSection hero={{
                    imageSrc: "/hero.png",
                    altText: "hero",
                    title: "Riwayat Pemesanan"}}
                />
                <div className="mt-10 sm:mt-16 px-2 sm:px-8">
                    <Judul header={{
                        title: "Daftar Pemesanan",
                        description: "Pantau pemesanan Anda, mulai dari tiket yang sudah selesai hingga yang dibatalkan." }}
                    />

                {status && (
                <div className="text-center my-6">
                    {status === "berhasil" ? (
                    <p className="text-green-600 text-lg sm:text-xl font-semibold">
                        Pembayaran Berhasil
                    </p>
                    ) : (
                    <p className="text-red-600 text-lg sm:text-xl font-semibold">
                        Pembayaran Gagal 
                    </p>
                    )}
                </div>
                )}

                    <DaftarPesanan  dataPemesanan={dataPemesanan} />
                </div>
                {/* <Judul header={{
                        title: "Daftar Pemesanan",
                        description: "Pantau pemesanan Anda, mulai dari tiket yang sudah selesai hingga yang dibatalkan."}}
                /> */}
            </main>
        )
    };

    export default RiwayatPemesanan;



    const DaftarPesanan = ({dataPemesanan}) => {
        const [filter, setFilter] = useState("Semua");
        
            const getStatusColor = (status) => {
                switch (status.toLowerCase()) {
                case "selesai":
                    return "bg-green-600";
                case "dibatalkan":
                    return "bg-red-600";
                default:
                    return "bg-gray-400";
            }
            };
        
            const filteredData =
            filter === "Semua"
                ? dataPemesanan
                : dataPemesanan.filter((item) => item.status === filter);
        
            //jika tidak ada data
            if (!dataPemesanan || dataPemesanan.length === 0) {
                return(
                    <section className="flex item-center justify-center w-full m-8">
                        <p className="text-gray-500 text-center text-base sm:text-lg">Anda belum melakukan pemesanan paket</p>
                    </section>
                );
            }

            return (
            <section className="w-full mt-8">
                {/* Tombol Filter */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                {["Semua", "Selesai", "Dibatalkan"].map((item) => (
                    <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-5 sm:px-6 py-2.5 font-semibold rounded-full border text-sm sm:text-base transition-all duration-300
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
                    <div className="w-full sm:w-[90%] md:w-[500px] mx-auto p-4 sm:p-6 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col items-center gap-6 my-10 sm:my-16">
                        {/* Gambar + Info */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full text-center sm:text-left">
                        <img
                            className="w-40 h-32 rounded-2xl object-cover"
                            src={item.imageSrc}
                            alt={item.title}
                        />
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                            <div className="text-zinc-800 text-lg sm:text-xl font-semibold">
                                {item.title}
                            </div>
                            <div className="text-gray-500 text-sm sm:text-base font-normal">
                                {item.deskripsi}
                            </div>
                            </div>
                            <div className="text-zinc-800 text-sm sm:text-base font-medium mt-2">
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
                        <div className="text-center text-white text-sm sm:text-base font-bold">
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