import React from "react";
import { useParams } from "react-router-dom";
import { HiStar } from "react-icons/hi";

const paketData = [
    {   id: 1,
        title: "Morning Dolphin Tour",
        slug: "morning-dolphin-tour",
        imageSrc: "/paket-morning-dolphin.png",
        price: "Rp. 150.000",
        rating: 4.3,
        reviews: 68,
        duration: "3 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Pengalaman melihat lumba-lumba saat matahari terbit",
        "Sarapan ringan di atas perahu",
        "Pelampung keselamatan",
        "Pemandu lokal berpengalaman",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    {   id: 2,
        title: "Sunrise Dolphin Cruise",
        slug: "sunrise-dolphin-cruise",
        imageSrc: "/paket-sunrise-cruise.png",
        price: "Rp. 300.000",
        rating: 4.7,
        reviews: 44,
        duration: "2 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Pengalaman melihat lumba-lumba saat matahari terbit",
        "Sarapan ringan di atas perahu",
        "Pelampung keselamatan",
        "Pemandu lokal berpengalaman",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    {   id: 3,
        title: "Snorkeling Lovina",
        slug: "snorkeling-lovina",
        imageSrc: "/paket-snorkeling.png",
        price: "Rp. 350.000",
        rating: 4.2,
        reviews: 39,
        duration: "2 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Satu botol air mineral untuk setiap penumpang",
        "Menikmati minuman selamat datang khas Bali (Teh atau Kopi) setibanya di Pantai Lovina",
        "Peralatan snorkeling",
        "Pemandu lokal berpengalaman",
        "Dokumentasi kegiatan (Foto dan Video)",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    {   id: 4,
        title: "Dolphin Watching Tour",
        slug: "dolphin-watching-tour",
        imageSrc: "/paket-dolphin-watching.png",
        price: "Rp. 200.000",
        rating: 4.4,
        reviews: 40,
        duration: "3 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Pengalaman melihat lumba-lumba saat matahari terbit",
        "Minuman hangat di atas perahu",
        "Pelampung keselamatan",
        "Pemandu lokal berpengalaman",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    {   id: 5,
        title: "Swim with Dolphin",
        slug: "swim-with-dolphin",
        imageSrc: "/paket-swim-with.png",
        price: "Rp. 200.000",
        rating: 4.6,
        reviews: 36,
        duration: "1,5 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Pengalaman berenang dengan lumba-lumba saat matahari terbit",
        "Air mineral",
        "Pelampung keselamatan",
        "Pemandu lokal berpengalaman",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    {   id: 6,
        title: "Private Tour Guide",
        slug: "private-tour-guide",
        imageSrc: "/paket-privat-tour.png",
        price: "Rp. 400.000",
        rating: 4.5,
        reviews: 40,
        duration: "2 Jam",
        capacity: "Maksimal 5 orang/perahu",
        desk: [
        "Satu perahu khusus pribadi hanya untuk Anda & rombongan",
        "Pengalaman eksklusif menyaksikan lumba-lumba",
        "Private guide lokal berpengalaman yang mendampingi penuh selama tur",
        "Air mineral & snack ringan di atas perahu",
        ],
        schedule: "Setiap hari, pukul 05.30 WITA",
        location: "Pantai Lovina, Bali",
    },
    
    ];

    const DetailPaket = () => {
    const { slug } = useParams();
    const paket = paketData.find((p) => p.slug === slug);

    if (!paket) {
        return <p className="text-center mt-40 text-gray-500">Paket tidak ditemukan.</p>;
    }

    return (
        <div className="max-w-[1180px] mx-auto bg-white rounded-3xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-8 my-16 flex flex-col gap-14">
        {/* Gambar latar */}
        <img
            src={paket.imageSrc}
            alt={paket.title}
            className="w-full h-[560px] md:h-[560px] object-cover rounded-2xl"
        />

        {/* Judul & Harga */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl font-bold text-zinc-700">{paket.title}</h1>
            <div className="flex items-center gap-3 mt-2 md:mt-0">
            <p className="text-zinc-700 text-3xl font-bold">{paket.price}</p>
            <div className="flex items-center text-zinc-500 text-xl font-semibold">
                <HiStar className="mr-1 h-7 w-7 text-yellow-400" /> {paket.rating}
                <span className="ml-2">({paket.reviews})</span>
            </div>
            </div>
        </div>

        {/*  Durasi & Kapasitas */}
        <div className="text-2xl text-black">
            <p>
            <span className="font-bold ">Durasi: </span>{paket.duration}
            </p>
            <p>
            <span className="font-bold">Kapasitas: </span>{paket.capacity}
            </p>
        </div>

        {/* Paket Termasuk */}
        <div>
            <h2 className="text-3xl font-bold text-black mb-2">Paket Termasuk</h2>
            <ul className="list-disc list-inside text-2xl font-normal text-black space-y-1">
            {paket.desk.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
            </ul>
        </div>

        {/* Jadwal & Lokasi */}
        <div>
            <h2 className="text-3xl font-bold text-black mb-2.5">Jadwal & Lokasi</h2>
            <p className="text-2xl text-black">
            <span className="font-bold">Waktu Keberangkatan: </span>{paket.schedule}
            </p>
            <p className="text-2xl text-black">
            <span className="font-bold">Lokasi: </span>{paket.location}
            </p>
        </div>

        {/* Tombol Pesan */}
        <button className="mt-4 w-full  h-16 px-6 py-3.5 bg-primary text-white text-3xl font-bold rounded-lg hover:bg-blue-700 transition">
            Pesan Sekarang
        </button>
        </div>
    );
};

export default DetailPaket;
