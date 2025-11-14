import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";
import { useLocation, useNavigate } from "react-router-dom";

function ReviewRating() {
  const { state } = useLocation();
  const [tiketList, setTiketList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({});
  const newReview = state?.newReview;

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updatedReviews = savedReviews.map((review) => ({
      ...review,
      username: review.username || "Pengguna Anonim",
      date: review.tanggal || "Tanggal tidak diketahui",
      profileImage: review.profileImage || "/default-profile.png",
    }));
    setReviews(updatedReviews);
  }, []);

  useEffect(() => {
    const tiket = JSON.parse(localStorage.getItem("tiketSaya")) || [];
    const aktif = tiket
      .filter(
        (t) =>
          t.status?.toLowerCase() === "berhasil" ||
          t.status?.toLowerCase() === "selesai"
      )
      .map((t) => ({
        id: t.id,
        imageSrc: t.paket.imageSrc || "/default.png",
        title: t.paket.title || "Paket tidak diketahui",
        desk: t.paket.tagLine || "Tidak ada tagline paket",
        kategori : t.paket.kategori,
        username: t.user?.name || "Pengguna Anonim",
        profileImage: t.user?.photo || "/default-profile.png",
        
      }));
    setTiketList(aktif);
  }, []);

  const handleFilterChange = (value) => setFilter(value);

  const bulanMap = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  const parseDate = (str) => {
    if (!str) return new Date(0);
    const [tanggal, bulan, tahun] = str.split(" ");
    return new Date(tahun, bulanMap[bulan], tanggal);
  };

  const filtered = reviews
    .filter((r) => {
      return (
        (!filter.rating || r.rating === Number(filter.rating)) &&
        (!filter.kategori || r.kategori === filter.kategori) &&
        (!filter.search ||
          r.username?.toLowerCase().includes(filter.search.toLowerCase()) ||
          r.tripTitle?.toLowerCase().includes(filter.search.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (filter.waktu === "terbaru") {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB - dateA;
      }
      return 0;
    });

  return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-16 overflow-x-hidden">
      <HeroSection
        hero={{
          imageSrc: "/hero.png",
          altText: "hero",
          title: "Tambahkan Ulasanmu",
        }}
      />
      <div className="mt-16">
        <Judul
          header={{
            title: "Cerita Perjalananmu di Lovina",
            description:
              "Lihat kembali aktivitas seru yang sudah kamu coba selama berada di Lovina. Berikan ulasan dan bagikan pengalamanmu, agar pengunjung lain bisa mendapatkan inspirasi dan informasi dari ceritamu.",
          }}
        />
      </div>

     
      <div className="my-16 ">
        <p className="text-zinc-800 text-2xl font-bold">
          Jejak Perjalanan yang Belum Tertulis
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          {tiketList.map((tiket) => (
            <UlasanCard key={tiket.id} aktivitas={tiket} />
          ))}
        </div>
      </div>

      {/* Filter dan hasil ulasan */}
      <FilterUlasan onFilterChange={handleFilterChange} />

      <div className="mt-8 ">
        {filtered.length > 0 ? (
          filtered.map((r, i) => <ReviewCard key={i} review={r} />)
        ) : (
          <p className="text-center text-gray-500 m-60">
            Tidak ada ulasan yang cocok
          </p>
        )}
      </div>
    </main>
  );
}

export default ReviewRating;

const UlasanCard = ({ aktivitas }) => {
  const navigate = useNavigate();

  return (
    <div className="w-96 p-6 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden  items-center gap-6 flex flex-col">
      <img
        className="w-80 h-72 rounded-2xl object-cover"
        src={aktivitas.imageSrc}
        alt={aktivitas.title}
      />
      <div className="flex flex-col gap-2">
        <h3 className="w-80 text-zinc-700 text-2xl font-semibold">
          {aktivitas.title}
        </h3>
        <p className="w-80 text-gray-600 text-xl font-normal pb-6">
          {aktivitas.desk}
        </p>
        <button
          onClick={() =>
            navigate("/TambahUlasan", { state: { trip: aktivitas } })
          }
          className="w-80 bg-primary text-white text-xl font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tambahkan Cerita Anda
        </button>
      </div>
    </div>
  );
};
