import {React, useEffect, useState} from "react";

import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul"
import FilterUlasan from "../components/FilterUlasan";
import ReviewCard from "../components/ReviewCard";

function Ulasan() {
    const [filter, setFilter] = useState({});
    const [userReview, setUserReview] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

        const normalizedReviews = savedReviews.map((review) => ({
            ...review,
            date: review.date || review.tanggal,
        }));

        setUserReview(normalizedReviews);
    }, []);

    const reviews = [];

    const gabunganReview = [...reviews, ...userReview];

    const handleFilterChange = (value) => setFilter(value);

    const filtered = gabunganReview.filter((r) => {
        return (
            (!filter.rating || r.rating === Number(filter.rating)) &&
            (!filter.kategori || r.kategori === filter.kategori) &&
            (!filter.search || 
                r.username.toLowerCase().includes(filter.search.toLowerCase()) || 
                r.tripTitle.toLowerCase().includes(filter.search.toLowerCase()))
        );
    })
    .sort((a, b) => {
        if (filter.waktu === "terbaru") {
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
            // ubah format dari string ke object
            const parseDate = (str) => {
                if (!str) return new Date(0);
                const [tanggal, bulan, tahun] = str.split(" ");
                return new Date(Number(tahun), bulanMap[bulan], Number(tanggal));
            };
            const dateA = parseDate(a.date || a.tanggal);
            const dateB = parseDate(b.date || b.tanggal);
    
            return dateB - dateA;
        }
    })    

    return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
        <HeroSection hero={{
            imageSrc: "/hero.png",
            altText: "hero",
            title: "Pengalaman Mereka"
        }} />
        <div className="my-16 "> 
        <Judul header={{
            title: "Kisah Perjalanan Pengunjung Lovina",
            description: "Setiap orang punya cerita seru setelah berkunjung ke Pantai Lovina. Ada yang berbagi tentang indahnya sunrise, ada yang senang melihat lumba-lumba dari dekat. Di sini, kamu bisa temukan kisah nyata mereka yang sudah merasakan liburan di Lovina"
        }}/>
        </div>
        <FilterUlasan onFilterChange={handleFilterChange} />
        <div className="mt-8">
            {filtered.length > 0 ? (
                filtered.map((r,id) => <ReviewCard key={id} review={r} />)
            ):(
                <p className="text-center text-gray-500 mt-60">
                    Tidak ada ulasan yang cocok
                </p>
            )}
        </div>
    </main>
    );
}
export default Ulasan;