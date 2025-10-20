import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import FestivalCard from "../component/FestivalCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {GaleriPengunjung} from './beranda';

function Acara() {
    
    const acaraGallery = [
        { id: 1, src: '/festival-1.png', alt: 'festival-1' },
        { id: 2, src: '/festival-2.jpg', alt: 'festival-2' },
        { id: 3, src: '/festival-3.jpg', alt: 'festival-3' },
        { id: 4, src: '/festival-4.jpg', alt: 'festival-4' },
    ];

    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16">
        {/*tagline*/}
            <div className="relative w-full max-w-[1200px] aspect-[2.6/1] max-h-[458px] mx-auto">
                <img src="/tagline.png" alt="Kelana Lovina" className="absolute inset-0 w-full h-full object-cover rounded-[35px]" />
            <div className="absolute inset-0 bg-black/30 rounded-[35px]" />
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-semibold">
                    Jelajahi Festival
                </h3>
            </div>
            <FestivalLovina/>
            <GaleriPengunjung 
            title="Galeri Acara"
            description="Galeri foto penuh warna yang menghadirkan cerita dari setiap event dan festival di Lovina"
            images={acaraGallery}
            />
        </main>
    )
}

export default Acara;


// komponen FestivalLovina
const eventData = [
  {
    id: 1,
    imageSrc: "/festival-buleleng.png",
    title: "Buleleng Festival",
    description:
      "Menghadirkan seni tradisional & modern, UMKM, kuliner lokal, digital expo, serta transportasi gratis dengan bemo dan dokar.",
  },
  {
    id: 2,
    imageSrc: "/festival-pemutaran-bay.png",
    title: "Pemuteran Bay Festival",
    description:
      "Menampilkan pertunjukan seni budaya, kuliner, kemungkinan pameran & juag aktivitas laut di daerah pantai sekitar Pemuteran.",
  },
  {
    id: 3,
    imageSrc: "/festival-twin-lake.png",
    title: "Twin Lake Festival",
    description:
      "Menampilkan pelepasan burung, lomba memancing, tracking, serta carving buah sebagai bagian dari hiburan dan atraksi wisata.",
  },
  {
    id: 1,
    imageSrc: "/festival-buleleng.png",
    title: "Buleleng Festival",
    description:
      "Menghadirkan seni tradisional & modern, UMKM, kuliner lokal, digital expo, serta transportasi gratis dengan bemo dan dokar.",
  },
  {
    id: 2,
    imageSrc: "/festival-pemutaran-bay.png",
    title: "Pemuteran Bay Festival",
    description:
      "Menampilkan pertunjukan seni budaya, kuliner, kemungkinan pameran & aktivitas laut di daerah pantai Pemuteran.",
  },
  {
    id: 3,
    imageSrc: "/festival-twin-lake.png",
    title: "Twin Lake Festival",
    description:
      "Menampilkan pelepasan burung, lomba memancing, tracking, serta carving buah sebagai bagian dari hiburan dan atraksi wisata.",
  },
  
];

function FestivalLovina() {
  return (
    <section className="mt-16 w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
          Acara & Festival di Pantai Lovina & Sekitarnya
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
          Pantai Lovina dan desa-desa sekitar di Buleleng selalu hidup dengan
          beragam festival budaya dan pariwisata sepanjang tahun. Dari festival
          tahunan seperti Lovina Festival, Buleleng Festival, hingga acara
          lingkungan dan budaya di danau. Temukan info lengkap acara yang akan
          datang agar liburan Anda makin bermakna.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        pagination={false}
        loop={true}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="festival-slider"
      >
        {eventData.map((event) => (
          <SwiperSlide key={event.id}>
            <FestivalCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};


