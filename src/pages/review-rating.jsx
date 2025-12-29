import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";

  function ReviewRating() {
    const { state } = useLocation();
    const { slug } = state || {};
    const paketId = state?.paketId;

    const [tiketList, setTiketList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState({});

    // Ambil data user login
    const savedUser = JSON.parse(localStorage.getItem("user_data"));
    const userId = savedUser?.id;

    // Ambil review dari database
    useEffect(() => {
      if (!slug) return;
    
      const fetchReviews = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/reviews/${slug}`);
          const data = await response.json();
          setReviews(data.reviews || []);
        } catch (err) {
          console.error("Gagal mengambil ulasan", err);
        }
      };
      fetchReviews();
    }, [slug]);

    // Ambil tiket yang sudah berhasil/selesai
    useEffect(() => {
      const tiket = JSON.parse(localStorage.getItem("tiketSaya")) || [];
      const aktif = tiket
        .filter(t => ["berhasil", "selesai"].includes(t.status?.toLowerCase()))
        .map((t, idx) => ({
          id: t.id + "_" + t.tanggalBerangkat + "_" + idx,
          bookingId: t.bookingId,
          paketId: t.paket.id,
          slug: t.paket.slug,
          aktivitasId: `${t.id}_${t.paket.id}_${t.data.tanggalBerangkat}_${t.data.bookingId}`,
          imageSrc: t.paket.imageSrc || "/default.png",
          title: t.paket.title || "Paket tidak diketahui",
          desk: t.paket.tagLine || "Tidak ada tagline paket",
          kategori: t.paket.kategori,
          tanggalBerangkat: t.data.tanggalBerangkat,
        }));
      setTiketList(aktif);
    }, []);

    const handleFilterChange = (value) => setFilter(value);

    const bulanMap = {
      Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
      Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
    };

    const parseDate = (str) => {
      if (!str) return new Date(0);
      const [tanggal, bulan, tahun] = str.split(" ");
      return new Date(tahun, bulanMap[bulan], tanggal);
    };

    // Filter dan sortir review
    const filtered = reviews
      .filter(r => 
        (!filter.rating || r.rating === Number(filter.rating)) &&
        (!filter.kategori || r.kategori === filter.kategori) &&
        (!filter.search ||
          r.username?.toLowerCase().includes(filter.search.toLowerCase()) ||
          r.title?.toLowerCase().includes(filter.search.toLowerCase()))
      )
      .sort((a, b) => filter.waktu === "terbaru" ? parseDate(b.tanggal) - parseDate(a.tanggal) : 0);

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

        <div className="my-16">
          <p className="text-zinc-800 text-2xl font-bold">
            Jejak Perjalanan yang Belum Tertulis
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            {tiketList.map((tiket) => {
                const hasReviewed = reviews.some(r => Number(r.user_data) === Number(userId) && Number(r.paket_id) === Number(tiket.paketId));
            
              return (
                <UlasanCard
                  key={tiket.id}
                  aktivitas={tiket}
                  canReview={new Date() >= parseTanggalBerangkat(tiket.tanggalBerangkat)}
                  hasReviewed={hasReviewed}
                />
              );
            })}
          </div>
        </div>

        <FilterUlasan onFilterChange={handleFilterChange} />

        <div className="mt-8">
          {reviews.length > 0 ? (
            reviews.map((r, i) => <ReviewCard key={i} review={r} />)
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

  const getLocalDateOnly = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  };

  const parseTanggalBerangkat = (input) => {
    if (!input) return null;
    const tanggalOnly = input.split(" ")[0];
    const [year, month, day] = tanggalOnly.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

const UlasanCard = ({ aktivitas, canReview, hasReviewed }) => {
  const navigate = useNavigate();
  const disabled = hasReviewed || !canReview;

  const buttonText = hasReviewed
    ? "Ulasan telah ditambahkan"
    : !canReview
    ? "Belum bisa direview"
    : "Tambahkan ulasan anda";

  return (
    <div className="w-96 p-6 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col items-center gap-6">
      <img
        className="w-[340px] h-72 rounded-2xl object-cover"
        src={aktivitas.imageSrc}
        alt={aktivitas.title}
      />
      <div className="flex flex-col gap-2">
        <h3 className="w-[340px] text-zinc-700 text-2xl font-semibold">
          {aktivitas.title}
        </h3>
        <p className="w-80 text-gray-600 text-xl font-normal pb-6">
          {aktivitas.desk}
        </p>
        <button
          disabled={disabled}
          onClick={() =>
            !disabled &&
            navigate(`/tambah-ulasan/${aktivitas.slug}`, {
              state: { ...aktivitas },
            })
          }
          className={`w-80 text-white text-xl font-bold py-2 px-6 rounded-lg transition-colors ${
            disabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-blue-700"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
