import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { getAllItems } from "../Utilis/indexedDB";

const ReviewCard = ({ review }) => {
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

  const [likesCount, setLikesCount] = useState(review.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [images, setImages] = useState([]); 

  useEffect(() => {
    const userLikes =JSON.parse(localStorage.getItem("userLikedReviews")) || [];
    setIsLiked(userLikes.includes(review.id));
  }, [review.id]);

  useEffect(() => {
    let objectUrls = [];
  
    const loadImages = async () => {
      try {
        const allImages = await getAllItems("album");
        const relatedImages = allImages.filter(
          (img) => Number(img.reviewId) === Number(review.id)
        );
  
        objectUrls = relatedImages.map((img) =>
          URL.createObjectURL(img.imageFile)
        );
  
        setImages(objectUrls);
      } catch (err) {
        console.error("Gagal load foto ulasan:", err);
      }
    };
  
    loadImages();
  
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [review.id]);
  

  const handleLikeClick = () => {
    if (isLiked) return;
    
    const reviews =JSON.parse(localStorage.getItem("reviews")) || [];
    const userLikes =JSON.parse(localStorage.getItem("userLikedReviews")) || [];

    const updatedReviews = reviews.map(r => {
      if (r.id === review.id) {
        return {
          ...r,
          likes: isLiked
            ? Math.max((r.likes || 1) - 1, 0)
            : (r.likes || 0) + 1,
        };
      }
      return r;
    });

    const updatedUserLikes = isLiked
      ? userLikes.filter(id => id !== review.id)
      : [...userLikes, review.id];

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    localStorage.setItem("userLikedReviews", JSON.stringify(updatedUserLikes)
    );

    setLikesCount( isLiked ? likesCount - 1 : likesCount + 1 );
    setIsLiked(!isLiked);
  };

  const heartColorClass = isLiked
    ? "text-red-500"
    : "text-gray-400";
  const heartFill = isLiked ? "currentColor" : "none";

  return (
    <div className="w-full max-w-[996px] bg-white rounded-[41.94px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-6 sm:p-8 md:p-10 mx-auto mb-10 flex flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <img
          src={savedProfile?.fotoProfile || "/profileDefault.jpg"}
          alt={review.username || "Pengguna Anonim"}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
          <h3 className="font-bold text-black">
            {review.username || "Pengguna Anonim"}
          </h3>
          <p className="font-medium text-black">
            menambahkan ulasan pada{" "}
            {review.tanggal || "Tanggal tidak diketahui"}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-16">
        <div className="text-yellow-400 text-lg sm:text-xl md:text-2xl mb-1">
          {"★".repeat(review.rating || 0)}
        </div>
        <h4 className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl">
          {review.title || "Trip"}
        </h4>
      </div>

      {images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto px-4 sm:px-8 md:px-16 no-scrollbar">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`ulasan-${idx}`}
              className="h-24 w-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <p className="text-zinc-800 leading-relaxed px-4 sm:px-8 md:px-16 text-sm sm:text-base text-justify">
        {review.text || ""}
      </p>

      <div
        className={`flex items-center justify-end gap-1 cursor-pointer transition duration-150 ${heartColorClass}`}
        onClick={handleLikeClick}
      >
        <Heart fill={heartFill} className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base font-medium">
          {likesCount}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
