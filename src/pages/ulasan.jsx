import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import ReviewCard from "../components/ReviewCard";
import { reviewsMapping } from "../components/reviewPaket/reviewsMapping";

const Ulasan = () => {
  const { slug } = useParams();
  const staticReviews = reviewsMapping[slug] || [];
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const filteredUserReviews = savedReviews.filter((r) => r.slug === slug);
    const merged = [...staticReviews, ...filteredUserReviews];
    setReviews(merged);
  }, [slug]);

  const handleToggleLike = (reviewId) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((r) =>
        r.id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r
      );

      // Simpan ke localStorage hanya review user, bukan static
      localStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews.filter((r) => !r.static))
      );

      return updatedReviews;
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 my-16">
      <HeroSection
        hero={{
          imageSrc: "/hero.png",
          title: "Pengalaman Mereka",
        }}
      />
      <div className="my-16">
        <Judul
          header={{
            title: "Kisah Perjalanan Pengunjung Lovina",
            description: "Cerita nyata dari pengunjung Pantai Lovina",
          }}
        />
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onLike={handleToggleLike} />
        ))
      ) : (
        <p className="text-center text-gray-500">Belum ada ulasan</p>
      )}
    </main>
  );
};

export default Ulasan;
