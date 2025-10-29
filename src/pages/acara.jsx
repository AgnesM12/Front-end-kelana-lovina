import {React, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import GaleriGrid from "../components/GaleriGrid";
import HeroSection from "../components/HeroSection";
import FestivalCard from "../components/FestivalCard";
import Judul from "../components/Judul";
import HalamanAcaraPenuh from "../components/HalamanAcaraPenuh";

function Acara() {

  const [tampilkanAcaraPenuh, setTampilkanAcaraPenuh] = useState(false);
    
    const acaraGallery = [
        { src: '/festival-1.png', alt: 'festival-1' },
        { src: '/festival-2.jpg', alt: 'festival-2' },
        { src: '/festival-3.jpg', alt: 'festival-3' },
        { src: '/festival-4.jpg', alt: 'festival-4' },
    ];

    const dataHero = {
      title: "Jelajahi Festival",
      imageSrc: '/hero.png',
      altText: 'hero',
    };

    const onShowMore = () => {
      setTampilkanAcaraPenuh(true);
    };

    if(tampilkanAcaraPenuh) {
      const dataHero = {
        title: "Jelajahi Festival",
        imageSrc: '/hero.png',
        altText: 'hero',
      };

      return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
          <HeroSection hero={dataHero}/>
          <HalamanAcaraPenuh />
        </main>
      )
    } else {
    return (
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
        <HeroSection hero={dataHero}/>
          <div className="mt-16">
            <FestivalLovina/>
          </div>
          <div className=" mt-16">
            <Judul header={{
              title: "GALERI ACARA",
              description: "Galeri foto penuh warna yang menghadirkan cerita dari setiap event dan festival di Lovina" }}
              />
            <GaleriGrid
            images={acaraGallery}
            />
          <div className="text-center mt-12">
          <button 
          onClick={onShowMore}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Selengkapnya
          </button>
          </div>
        </div>
        </main>
    )
  };
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
      "Menampilkan pertunjukan seni budaya, kuliner, kemungkinan pameran & juga aktivitas laut di daerah pantai sekitar Pemuteran.",
  },
  {
    id: 3,
    imageSrc: "/festival-twin-lake.png",
    title: "Twin Lake Festival",
    description:
      "Menampilkan pelepasan burung, lomba memancing, tracking, serta carving buah sebagai bagian dari hiburan dan atraksi wisata.",
  },
  {
    id: 4,
    imageSrc: "/festival-buleleng.png",
    title: "Buleleng Festival",
    description:
      "Menghadirkan seni tradisional & modern, UMKM, kuliner lokal, digital expo, serta transportasi gratis dengan bemo dan dokar.",
  },
  {
    id: 5,
    imageSrc: "/festival-pemutaran-bay.png",
    title: "Pemuteran Bay Festival",
    description:
      "Menampilkan pertunjukan seni budaya, kuliner, kemungkinan pameran & juga aktivitas laut di daerah pantai sekitar Pemuteran.",
  },
  {
    id: 6,
    imageSrc: "/festival-twin-lake.png",
    title: "Twin Lake Festival",
    description:
      "Menampilkan pelepasan burung, lomba memancing, tracking, serta carving buah sebagai bagian dari hiburan dan atraksi wisata.",
  },
  
];

function FestivalLovina() {

  const judulFestival = {
    title: "Acara & Festival di Pantai Lovina & Sekitarnya",
    description: "Pantai Lovina dan desa-desa sekitar di Buleleng selalu hidup dengaan beragam festival budaya dan pariwisata sepanjang tahun. Dari festival tahunan seperti Lovina Festival, Buleleng Festival, hingga acara lingkungan dan budaya di danau. Temukan info lengkap acara yang akan datang agar liburan Anda makin bermakna.",
  };

  return (
    <section className="mt-16 w-full">
      {/* Header */}
      <Judul header={judulFestival} />

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


