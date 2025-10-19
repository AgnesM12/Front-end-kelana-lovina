import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { HiStar } from 'react-icons/hi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Beranda() {
  return (
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden ">
          
          {/* Tagline */}
          <div className="relative w-full max-w-[1200px] aspect-[2.6/1] max-h-[458px] mx-auto pt-24 ">
              <img src="/tagline.png" alt="Kelana Lovina" className="absolute inset-0 w-full h-full object-cover rounded-[35px]" />
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

const PaketCard = ({ paket }) => (
  <div className=" w-[385px] h-[597px] p-6 flex-shrink-0 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col items-center justify-center transition-transform duration-300">
      <img className="w-[323px] h-[300px] mt-6 object-cover object-center rounded-xl" src={paket.imageSrc} alt={paket.title} />
      <div className="p-5 flex flex-col gap-3">
          <h3 className="text-2xl font-bold object-center text-gray-900">{paket.title}</h3>
          <p className="text-xl text-gray-600">{paket.description}</p>
          <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-bold text-blue-600">{paket.price}</p>
              <div className="flex items-center gap-1 text-base text-gray-700">
                <HiStar className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{paket.rating}</span>
                <span>({paket.reviews})</span>
              </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors">Lihat paket</button>
      </div>
  </div>
);

function RekomendasiPaket() {
  return (
    <section className="mt-16 w-full">
      {/* Header Teks */}
      <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">REKOMENDASI PAKET</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600">Temukan pilihan paket wisata lengkap mulai dari tur lumba-lumba saat matahari terbit, snorkeling di laut jernih, hingga penginapan nyaman di sekitar Lovina. Setiap paket sudah termasuk transportasi dan akomodasi sesuai kebutuhan Anda — cocok untuk keluarga, pasangan, maupun solo traveler.</p>
      </div>

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
        {/* Map data Anda ke <SwiperSlide> */}
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
  const defaultGalleryData = [
    { id: 1, src: '/galeri-1.png', alt: 'galeri-1', size: 'small-left' },
    { id: 2, src: '/galeri-2.png', alt: 'galeri-2', size: 'large-right' },
    { id: 3, src: '/galeri-3.png', alt: 'galeri-3', size: 'large-left' },
    { id: 4, src: '/galeri-4.png', alt: 'galeri-4', size: 'small-right' },
  ];

  export function GaleriPengunjung ({title, description, images}) {
    const gallery = images || defaultGalleryData;
  return (
    <section className="mt-16">
      <div className="mx-auto px-6 ">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
            {title || "GALERI PENGUNJUNG"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-800">
            { description || "Kumpulan foto dan momen seru dari para pengunjung Pantai Lovina yang bisa menjadi inspirasi liburan Anda."}
          </p>
        </div>

        {/* Grid Galeri */}
        <div className="flex flex-col gap-4 items-center">
          {/* Baris 1 */}
          <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]">
            <div className="w-full lg:w-[40%] h-[306px] overflow-hidden ">
              <img src={gallery[0].src} alt={gallery[0].alt} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="w-full lg:w-[60%] h-[306px] overflow-hidden">
              <img src={gallery[1].src} alt={gallery[1].alt} className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* Baris 2 */}
          <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]">
            <div className="w-full lg:w-[60%] h-[306px] overflow-hidden">
              <img src={gallery[2].src} alt={gallery[2].alt} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="w-full lg:w-[40%] h-[306px] overflow-hidden ">
              <img src={gallery[3].src} alt={gallery[3].alt} className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>

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
  return (
    <section className="w-full max-w-[1200px] h-auto rounded-[30px] py-10 mt-16 mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
            LOKASI PANTAI LOVINA
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600">
            "Pantai Lovina terletak di Bali Utara, tepatnya di Kabupaten Buleleng. Kawasan ini terkenal dengan pantai berpasir hitam, suasana tenang, serta menjadi spot populer untuk menyaksikan lumba-lumba di laut lepas."
          </p>
        </div>
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
