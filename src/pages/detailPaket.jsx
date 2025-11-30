    import React from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { HiStar } from "react-icons/hi";


    const paketData = [
        {   id: 1,
            title: "Rafatour dolphin & snorkeling",
            slug: "rafatour-dolphin-snorkeling",
            imageSrc: "/paket-rafatour-dolphine-snorkling.png",
            price: "Rp. 300.000",
            rating: 4.7,
            reviews: 45,
            duration: "3-4 Jam",
            capacity: "Maksimal 10 orang/perahu",
            desk: [
            "Pengalaman melihat lumba-lumba",
            "Pengalaman berenang dengan lumba-lumba",
            "Snorkeling",
            "Pelampung keselamatan",
            "Pemandu lokal berpengalaman",
            ],
            schedule: "Setiap hari",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 1 jam – Termasuk minuman ringan",
            departurTime: "05.30 WITA",
        },

        {   id: 2,
            title: "Seadolphine Lovina",
            slug: "seadolphine-lovina",
            imageSrc: "/paket-seadolphine-lovina.png",
            price: "Rp. 350.000",
            rating: 4.5,
            reviews: 45,
            duration: "2-3 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "Pengalaman melihat lumba-lumba",
            "Berenang bersama lumba-lumba",
            "Snorkeling di Lovina",
            "Perlengkapan snorkeling",
            "Pelampung",
            "Captain dan pemandu",
            ],
            schedule: "Setiap hari, pukul 08.00 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 2 jam - Termasuk snack & minum",
            departurTime:"05.30 WITA",
        },

        {   id: 3,
            title: "Watching Dolphin Only",
            slug: "watching-dolphin-only",
            imageSrc: "/paket-watching-dolphine-only.png",
            price: "Rp. 100.000",
            rating: 4.4,
            reviews: 54,
            duration: "2 Jam",
            capacity: "Maksimal 8-10 orang/perahu",
            desk: [
            "Perahu sharing",
            "Pelampung keselamatan", 
            "Pemandu",
            ],
            schedule: "Setiap hari, pukul 05.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 2 jam - Termasuk pelampung & guide",
            departurTime: "05.30 WITA",
        },

        {   id: 4,
            title: "Snorkeling & Dolphin Tur",
            slug: "snorkeling-dolphin-tur",
            imageSrc: "/paket-snorkling-tur.png",
            price: "Rp. 350.000",
            rating: 4.4,
            reviews: 54,
            duration: "2 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "Satu botol mineral untuk setiap peserta",
            "Menikmati minuman selamat datang khas Bali (Teh atau kopi) setibanya di Pantai Lovina",
            "Peralatan snorkeling",
            "Pemandu lokal berpengalaman",
            "Dokumentasi kegiatan (Foto dan Video)",
            ],
            schedule: "Setiap hari, pukul 05.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 3 jam - Termasuk minuman hangat",
            departurTime: "05.30 WITA",
        },

        {   id: 5,
            title: "Dolphin Watching Tur",
            slug: "dolphin-watching-tur",
            imageSrc: "/dolphinWatchingTour.jpg",
            price: "Rp. 200.000",
            rating: 4.4,
            reviews: 40,
            duration: "3 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "Pengalaman berenang dengan lumba-lumba saat matahari terbit",
            "Minuman hangat diatas perahu",
            "Pelampung keselamatan",
            "Pemandu lokal berpengalaman",
            ],
            schedule: "Setiap hari, pukul 05.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 1,5 jam - Termasuk  pelampung ",
            departurTime: "05.30 WITA"
        },

        {   id: 6,
            title: "Swim with Dolphin",
            slug: "swim-with-dolphin",
            imageSrc: "/swimWithDolphin.jpg",
            price: "Rp. 200.000",
            rating: 4.6,
            reviews: 38,
            duration: "1,5 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "Pengalaman berenang dengan lumba-lumba saat matahari terbit",
            "Air mineral",
            "Pelampung keselamatan",
            "Pamandu lokal berpengalaman",
            ],
            schedule: "Setiap hari, pukul 05.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 2 jam - Termasuk satu perahu khusus",
            departurTime: "05.30 WITA"
        },

        {   id: 7,
            title: "Private Tour Guide",
            slug: "private-tour-guide",
            imageSrc: "/privateTourGuide.png",
            price: "Rp. 400.000",
            rating: 4.5,
            reviews: 40,
            duration: "2 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "1 Perahu khusus pribadi hanya untuk Anda dan rombongan",
            "Pengalaman ekslusif menyaksikan lumba-lumba",
            "Pelampung keselamatan",
            "Private guide lokal berpengalaman yang mendampongi penuh selama tur",
            "Air mineral & snack ringan diatas perahu",
            ],
            schedule: "Setiap hari, pukul 07.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 2 jam - Termasuk satu perahu khusus",
            departurTime: "05.30 WITA"
        },

        {   id: 8,
            title: "Snorkeling Lovina",
            slug: "snorkeling-lovina",
            imageSrc: "/paket-snorkeling-lovina.png",
            price: "Rp. 150.000",
            rating: 4.2,
            reviews: 39,
            duration: "2 Jam",
            capacity: "Maksimal 5 orang/perahu",
            desk: [
            "Peralatan snorkeling lengkap (masker, snorkel, fin)",
            "Pelampung keselamatan",
            "Pemandu lokal berpengalaman",
            "Pengalaman snorkeling di spot terbaik lovina",
            ],
            schedule: "Setiap hari, pukul 08.30 WITA",
            location: "Pantai Lovina, Bali",
            tagLine: "Durasi 2 jam - Termasuk satu perahu khusus",
            departurTime: "05.30 WITA"
        },
        ];

        const DetailPaket = ({ isLoggedIn }) => { 
        const { slug } = useParams();
        const navigate = useNavigate();
        const paket = paketData.find((p) => p.slug === slug);

        if (!paket) {
            return <p className="text-center mt-40 text-gray-500">Paket tidak ditemukan.</p>;
        }

        const handlePesanClick = () => {
            if (isLoggedIn) {
                navigate(`/paket/${slug}/menuPembayaran`, { state: paket });
            } else {
                navigate('/login');
            }
        };


        return (
            <div className="max-w-full mx-auto bg-white flex flex-col gap-8 p-4 sm:p-6 md:p-8 lg:max-w-[1200px] lg:my-16 lg:px-9 lg:py-14 lg:rounded-[30px] lg:shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
            {/* Gambar latar */}
            <img
                src={paket.imageSrc}
                alt={paket.title}
                className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[560px] object-cover rounded-xl lg:rounded-2xl"
            />

            {/* Judul & price */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-700">{paket.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
                <p className="text-lg sm:text-2xl md:text-3xl font-bold text-zinc-700">{paket.price}/Person</p>
                <div className="flex items-center text-sm sm:text-lg md:text-xl font-semibold text-zinc-500">
                    <HiStar className="mr-1 h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" /> {paket.rating}
                    <span className="ml-2">({paket.reviews})</span>
                </div>
                </div>
            </div>

            {/*  Durasi & Kapasitas */}
            <div className="text-base sm:text-lg md:text-2xl text-zinc-800 leading-relaxed">
                <p>
                <span className="font-bold ">Durasi: </span>{paket.duration}
                </p>
                <p>
                <span className="font-bold">Kapasitas: </span>{paket.capacity}
                </p>
            </div>

            {/* Paket Termasuk */}
            <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 mb-2 md:mb-3">Paket Termasuk</h2>
                <ul className="list-disc list-inside text-base sm:text-lg md:text-2xl text-zinc-800 leading-relaxed space-y-1">
                {paket.desk.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </div>

            {/* Jadwal & Lokasi */}
            <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 mb-2 md:mb-3">Jadwal & Lokasi</h2>
                <p className="text-base sm:text-lg md:text-2xl text-zinc-800">
                <span className="font-bold">Waktu Keberangkatan: </span>{paket.schedule}
                </p>
                <p className="text-base sm:text-lg md:text-2xl text-zinc-800">
                <span className="font-bold">Lokasi: </span>{paket.location}
                </p>
            </div>


            {/* Tombol Pesan */}
                <button onClick={handlePesanClick} className="mt-4 w-full h-14 sm:h-16 px-6 py-3 bg-primary text-white text-lg sm:text-2xl md:text-3xl font-bold rounded-lg hover:bg-blue-700 transition">
                    Pesan Sekarang
                </button>
            </div>
        );
    };

    export default DetailPaket;
