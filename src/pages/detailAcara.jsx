import React from "react";
import { useParams } from "react-router-dom";


const eventData = [
    {
        id: 1,
        slug: "buleleng-festival",
        title: "Buleleng Festival",
        imageSrc: "/festival-buleleng.jpg",
        date: "12-15 Agustus 2025",
        location: "Kota Singaraja, Buleleng - Bali",
        desk:
        `Buleleng Festival adalah ajang tahunan yang menampilkan kekayaan seni, budaya, dan potensi lokal masyarakat Buleleng. Festival ini menjadi ruang untuk mempromosikan pariwisata daerah sekaligus melestarikan tradisi Bali Utara. Dalam acara ini, pengunjung dapat menikmati beragam kegiatan seperti parade budaya, pameran UMKM, seni pertunjukan, serta kuliner khas Buleleng. 
        
        Tidak hanya hiburan, festival ini juga bertujuan mempererat kebanggaan masyarakat terhadap identitas budaya lokal, sekaligus menjadi daya tarik bagi wisatawan domestik maupun mancanegara.`,
        agenda: [
        "Hari 1: Pembukaan & parade budaya",
        "Hari 2: Workshop seni & pameran UMKM",
        "Hari 3: Pertunjukan tari, musik, & lomba tradisional",
        "Hari 4: Penutupan & konser musik lokal",
        ],
    },
    {
        id: 2,
        slug: "pemuteran-bay-festival",
        title: "Pemuteran Bay Festival",
        imageSrc: "/festival-pemutaran-bay.jpg",
        date: "19-22 September 2025",
        location: "Desa Pemuteran, Buleleng - Bali",
        desk:
        `Pamuteran Bay Festival adalah perayaan budaya dan lingkungan yang menampilkan keindahan alam bawah laut, tradisi masyarakat lokal, serta komitmen terhadap konservasi terumbu karang. Event ini menjadi jembatan antara wisata, seni, dan pelestarian alam.
        Festival ini menggabungkan seni budaya, pameran UMKM, kuliner lokal, atraksi tradisional, serta kegiatan ramah lingkungan seperti pelepasan tukik dan kampanye laut bersih.`,
        agenda: [
        "Hari 1: Pembukaan & parade budaya",
        "Hari 2: Workshop konservasi laut & pameran UMKM",
        "Hari 3: Lomba fotografi bawah laut, pertunjukan seni",
        "Hari 4: Penutupan & konser musik lokal",
        ],
    },
    {
        id: 3,
        slug: "twin-lake-festival",
        title: "Twin Lake Festival",
        imageSrc: "/festival-twin-lake.jpg",
        date: "10-13 Juli 2025",
        location: "Danau Buyan & Danau Tamblingan, Buleleng - Bali",
        desk:
        `Twin Lake Festival adalah perayaan budaya, alam, dan kearifan lokal yang digelar di kawasan Danau Buyan dan Danau Tamblingan, dua danau kembar yang menjadi ikon Bali Utara. Festival ini menggabungkan keindahan alam pegunungan dengan pertunjukan seni tradisi, ritual keagamaan, hingga kegiatan ekowisata yang ramah lingkungan.

        Pengunjung dapat menikmati parade budaya, lomba perahu tradisional, ritual adat di pura sekitar danau, serta pameran hasil bumi dan UMKM lokal. Selain itu, festival ini juga mengedepankan kampanye pelestarian alam, sehingga wisatawan bisa ikut serta dalam kegiatan bersih-bersih dan penanaman pohon di sekitar kawasan danau.`,
        agenda: [
        "Hari 1: Upacara pembukaan & parade budaya",
        "Hari 2: Lomba perahu tradisional di Danau Buyan",
        "Hari 3: Ritual adat & pameran UMKM lokal",
        "Hari 4: Penutupan dengan konser seni & kampanye lingkungan",
        ],
    },
    ];

    const EventDetail = () => {
    const { slug } = useParams();
    const event = eventData.find((e) => e.slug === slug);

    if (!event) {
        return (
        <div className="max-w-4xl mx-auto text-center mt-20 text-gray-700">
            <h2 className="text-3xl font-bold">Event tidak ditemukan</h2>
            <p className="mt-4">Periksa kembali URL atau pilih event lain.</p>
        </div>
        );
    }

    return (
        <main className="max-w-[1200px] mx-auto my-16 px-9 py-14 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col gap-14">
        {/* Gambar */}
        <img
            src={event.imageSrc}
            alt={event.title}
            className="w-[1132px] h-[560px] object-cover rounded-2xl"
        />

        {/* waktu */}
        <div>
            <h1 className="text-4xl font-bold text-zinc-700 mb-4">{event.title}</h1>
            <p className="text-2xl text-zinc-800 font-normal">
            📅 Tanggal: {event.date} <br />
            📍 Lokasi: {event.location}
            </p>
        </div>

        {/* deskripsi */}
        <div>
            <h2 className="text-3xl font-bold text-zinc-700 mb-3">
            Apa itu {event.title}?
            </h2>
            <p className="whitespace-pre-line text-2xl font-normal text-zinc-800 text-justify">{event.desk}</p>
        </div>

        {/* jadwal */}
        <div>
            <h2 className="text-3xl font-bold text-zinc-700 mb-3">
            Jadwal / Agenda
            </h2>
            <ul className="list-none list-inside text-2xl font-normal text-zinc-800">
            {event.agenda.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        </main>
    );
};

export default EventDetail;
