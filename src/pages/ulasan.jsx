import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";
import { reviewsMapping } from "../components/reviewPaket/reviewsMapping";

function Ulasan() {
    const { slug } = useParams();
    const ReviewComponent = reviewsMapping[slug];
    const staticReviews = ReviewComponent || []; 
    const [filter, setFilter] = useState({});
    const [userReview, setUserReview] = useState([]);

    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch (`http://localhost:4000/api/reviews/by-slug/${slug}`);
                const data = await res.json();
                setUserReview(data.reviews || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReviews();
    }, [slug]);

    const gabunganReview = [...staticReviews, ...userReview];
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
        return new Date(Number(tahun), bulanMap[bulan], Number(tanggal));
    };

    const filtered = gabunganReview
    .filter((r) => {
      return (
        (!filter.rating || r.rating === Number(filter.rating)) &&
        (!filter.search || 
          (r.username || "").toLowerCase().includes(filter.search.toLowerCase()) ||
          (r.tripTitle || "").toLowerCase().includes(filter.search.toLowerCase()) ||
          (r.text || "").toLowerCase().includes(filter.search.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      const dateA = parseDate(a.tanggalBerangkat || a.tanggal); 
      const dateB = parseDate(b.tanggalBerangkat || b.tanggal);
      if (filter.waktu === "terbaru") return dateB - dateA;
      if (filter.waktu === "terlama") return dateA - dateB;
      return 0; 
    });
  
    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
            <HeroSection
                hero={{
                    imageSrc: "/hero.png",
                    altText: "hero",
                    title: "Pengalaman Mereka",
                }}
            />

            <div className="my-16">
                <Judul
                    header={{
                        title: "Kisah Perjalanan Pengunjung Lovina",
                        description:
                            "Setiap orang punya cerita seru setelah berkunjung ke Pantai Lovina. Ada yang berbagi tentang indahnya sunrise, ada yang senang melihat lumba-lumba dari dekat. Di sini, kamu bisa temukan kisah nyata mereka yang sudah merasakan liburan di Lovina",
                    }}
                />
            </div>

            <FilterUlasan onFilterChange={handleFilterChange} />

            <div className="mt-8">
                {filtered.length > 0 ? (
                    filtered.map((r, id) => <ReviewCard key={id} review={r} />)
                ) : (
                    <p className="text-center text-gray-500 mt-60">
                        Tidak ada ulasan yang cocok
                    </p>
                )}
            </div>
        </main>
    );
}

export default Ulasan;