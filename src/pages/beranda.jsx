import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import GaleriGrid from '../component/GaleriGrid';
import PaketCard from '../component/PaketCard';
import Judul from '../component/Judul';

function Beranda() {
  return (
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden ">
          
          {/* Hero */}
          <div className="relative w-full max-w-[1200px] aspect-[2.6/1] max-h-[458px] mx-auto pt-24 ">
              <img src="/hero.png" alt="Kelana Lovina" className="absolute inset-0 w-full h-full object-cover rounded-[35px]" />
              <div className="absolute inset-0 bg-black/30 rounded-[35px]" />
              <img src="/Loogooo 1.png" alt="Logo Kelana" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[850px] h-auto" />
          </div>
          
          {/* Tentang Lovina & Paket*/}
          <section className="mt-16 flex min-h-screen justify-center content-center  flex-wrap lg:gap-16">

              {/*Tentang Lovina */}
              <div className="w-full max-w-2xl bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-8 flex flex-col gap-6">
                  <h2 className="text-3xl py-15 font-bold text-gray-900 pt-14">Tentang Kelana Lovina</h2>
                  <p className="text-zinc-700 leading-relaxed pt-8">Selamat datang di Kelana Lovina! Di sini, Kamu bisa merencanakan liburan di Pantai Lovina dengan mudah dan menyenangkan. Pesan tiket paket wisata yang tersedia, dapatkan informasi terbaru tentang berbagai acara, dan susun rencana perjalanan sesuai keinginanmu.</p>
                  <p className="text-zinc-700 leading-relaxed pt-4">Setelah liburan, bagikan pengalaman, cerita, dan tipsmu dengan pengguna lain, sehingga perjalananmu tidak hanya berkesan untukmu, tapi juga bermanfaat bagi orang lain.</p>
                  <button className="bg-blue-700 text-white font-bold text-base mt-8 px-6 py-3 rounded-xl self-start hover:bg-blue-800 transition-colors ">Atur Rencana Perjalananmu</button>
              </div>

              {/*Paket & Informasi Cepat */}
              <div className="w-full max-w-md flex flex-col gap-8">
                  <div className="bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-4 flex flex-col gap-4">
                      <img src="/lumba.png" alt="Tur lumba-lumba" className="w-full h-60 object-cover rounded-2xl" />
                      <div className="flex justify-between items-center gap-4 px-1">
                          <h3 className="text-xl font-bold text-gray-900">Paket sunrise dolphin tur</h3>
                          <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">IDR 300.000</p>
                      </div>
                      <div className="flex justify-between items-center gap-4 px-1">
                          <p className="text-sm text-zinc-700">Durasi 3 jam - Sudah termasuk sarapan dan snorkeling</p>
                          <button className="bg-blue-700 text-white font-bold text-base px-8 py-2.5 rounded-xl hover:bg-blue-800 transition-colors flex-shrink-0">Pesan</button>
                      </div>
                  </div>
                  <div className="bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Informasi cepat</h3>
                      <ul className="text-zinc-700 list-disc list-inside space-y-2">
                          <li>Lokasi: Kabupaten Buleleng, Bali Utara</li>
                          <li>Waktu terbaik: 05:30 — 08:00</li>
                          <li>Bawalah sunblock & topi</li>
                          <li>Minimal peserta: 2 orang</li>
                      </ul>
                  </div>
              </div>
          </section>
          <RekomendasiPaket />
          <GaleriPengunjung/>
          <LokasiLovina/> 

      </main> 
  );
}
export default Beranda;


// Komponen RekomedasiPaket
const paketData = [
    { 
      id: 1,
      imageSrc: '/paket-morning-dolphin.png', 
      title: 'Morning Dolphin Tour', 
      description: 'Durasi 3 jam - Termasuk sarapan', 
      price: 'Rp. 200.000', 
      rating: 4.3, 
      reviews: 68 
    },
    { id: 2, 
      imageSrc: '/paket-sunrise-cruise.png', 
      title: 'Sunrise Dolphin Cruise', 
      description: 'Durasi 2 jam - Termasuk snack & minum', 
      price: 'Rp. 180.000', 
      rating: 4.7, 
      reviews: 44 },
    { id: 3, 
      imageSrc: '/paket-snorkeling.png', 
      title: 'Snorkeling Lovina', 
      description: 'Durasi 2 jam - Termasuk pemandu & guide', 
      price: 'Rp. 150.000', 
      rating: 4.2, 
      reviews: 39 },
      { 
        id: 4,
        imageSrc: '/paket-dolphin-watching.png', 
        title: 'Dolphin Watching Tour', 
        description: 'Durasi 3 jam - Termasuk minuman hangat', 
        price: 'Rp. 200.000', 
        rating: 4.4, 
        reviews: 40 
      },
      { id: 5, 
        imageSrc: '/paket-swim-with.png', 
        title: 'Swim with Dolphin', 
        description: 'Durasi 1,5 jam - Termasuk pelampung', 
        price: 'Rp. 200.000', 
        rating: 4.6, 
        reviews: 36 },
        { id: 6, 
          imageSrc: '/paket-privat-tour.png', 
          title: 'Private Tour Guide', 
          description: 'Durasi 2 jam - Termasuk satu perahu khusus', 
          price: 'Rp. 150.000', 
          rating: 4.5, 
          reviews: 40 },
];

function RekomendasiPaket() {

const judulRekomendasi = {
  title: "REKOMENDASI PAKET",
  description: "Temukan pilihan paket wisata lengkap mulai dari tur lumba-lumba saat matahari terbit, snorkeling di laut jernih, hingga penginapan nyaman di sekitar Lovina. Setiap paket sudah termasuk transportasi dan akomodasi sesuai kebutuhan Anda — cocok untuk keluarga, pasangan, maupun solo traveler.",
}

  return (
    <section className="mt-16 w-full">
      <Judul header = {judulRekomendasi}/>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        navigation={true}
        pagination={false}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        className="paket-slider"
      >
        {/* Map ke <SwiperSlide> */}
        {paketData.map((paket) => (
          <SwiperSlide key={paket.id}>
            <PaketCard paket={paket} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Lihat paket lainnya*/}
      <div className="text-center mt-12">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">Lihat paket lainnya</button>
      </div>
    </section>
  );
}
//Komponwn GaleriPengunjung
  const GalleryData = [
    { src: '/galeri-1.png', alt: 'galeri-1', size: 'small-left' },
    { src: '/galeri-2.png', alt: 'galeri-2', size: 'large-right' },
    { src: '/galeri-3.png', alt: 'galeri-3', size: 'large-left' },
    { src: '/galeri-4.png', alt: 'galeri-4', size: 'small-right' },
  ];

  export function GaleriPengunjung () {

    const judulGaleri = {
      title: "GALERI PENGUNJUNG",
      description: "Kumpulan foto dan momen seru dari para pengunjung Pantai Lovina yang bisa menjadi inspirasi liburan Anda."
    };

  return (
    <section className="mt-16">
      <div className="mx-auto px-6 ">
        {/* Header */}
        <Judul header = {judulGaleri} />  
        <GaleriGrid images = {GalleryData}/>
        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Selengkapnya
          </button>
        </div>
      </div>
    </section>
  )
}

// Komponen LokasiLovina
  function LokasiLovina () {

    const judulLokasi = {
      title: "LOKASI PANTAI LOVINA",
      description: "Pantai Lovina terletak di Bali Utara, tepatnya di Kabupaten Buleleng. Kawasan ini terkenal dengan pantai berpasir hitam, suasana tenang, serta menjadi spot populer untuk menyaksikan lumba-lumba di laut lepas."
    }
  return (
    <section className="w-full max-w-[1200px] h-auto rounded-[30px] py-10 mt-16 mx-auto">
        {/* Header Section */}
        <Judul header={judulLokasi} />
        <div className="w-full h-[547px] bg-white rounded-3xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex items-center justify-center sm:p-6">
          <iframe
            title="Peta Lokasi Pantai Lovina"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15802.71987588526!2d115.0139886475704!3d-8.157884240751147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b1747c4e511%3A0x1b2b87565a440123!2sPantai%20Lovina!5e0!3m2!1sid!2sid!4v1729199208076!5m2!1sid!2sid"
            className="w-full h-[500px] border-0 rounded-2xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
    </section>
  );
};
