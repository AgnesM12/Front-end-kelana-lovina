import React, { useState } from "react";
import { Heart } from "lucide-react";

const ReviewCard = ({ review }) => {
  const [likesCount, setLikesCount] = useState(review.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const images = Array.isArray(review.images)
  ? review.images
  : (() => {
    try {
      return JSON.parse(review.images || "[]");
    } catch {
      return [];
    }
  })();

  const handleLikeClick = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const heartColorClass = isLiked ? "text-red-500" : "text-gray-400";
  const heartFill = isLiked ? "currentColor" : "none";

  return (
    <div className="w-full max-w-[996px] bg-white rounded-[41.94px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-6 sm:p-8 md:p-10 mx-auto mb-10 flex flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <img
          src={review.fotoProfile || "/profile.svg"}  
          alt={review.username || "Pengguna Anonim"}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
          <h3 className="font-bold text-black">
          {review.username || "Pengguna Anonim"}
          </h3>
          <p className="font-medium text-black">
            menambahkan ulasan pada {review.tanggal || "Tanggal tidak diketahui"}  
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-16">
        <div className="text-yellow-400 text-lg sm:text-xl md:text-2xl mb-1">
          {"★".repeat(review.rating || 0)}
        </div>
        <h4 className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl">
          {review.paketTitle || "Trip"}
        </h4>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 sm:px-8 md:px-16 no-scrollbar">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:4000/uploads/${img}`}
            alt={`Foto ulasan ${idx + 1}`}
            className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-28 object-cover rounded-xl flex-shrink-0"
          />
        ))}
      </div>

      <p className="text-zinc-800 leading-relaxed px-4 sm:px-8 md:px-16 text-sm sm:text-base text-justify">
        {review.text || ""}
      </p>

      <div
        className={`flex items-center justify-end gap-1 cursor-pointer transition duration-150 ${heartColorClass}`}
        onClick={handleLikeClick}
      >
        <Heart fill={heartFill} className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base font-medium">{likesCount}</span>
      </div>
    </div>
  );
};

export default ReviewCard;