import React, {useState} from "react";
import { Heart } from "lucide-react";

const ReviewCard = ({ review }) => {

    const [likesCount, setLikesCount]= useState(review.likes)
    const [isLiked,  setIsLikes] = useState(false);

    const handleLikeClick = () => {
        if (isLiked) {
            setLikesCount(prevCount => prevCount - 1);
            setIsLikes(false);
        } else {
            setLikesCount(prevCount => prevCount + 1);
            setIsLikes(true)
            }
        };

    const heartColorClass = isLiked ? "text-red-500" : "text-gray-400";
    const heartFill = isLiked ? "currentColor" : "none";

    return (
        <div className="w-[996px] h-auto bg-white rounded-[41.94px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-10 mx-auto mb-10 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
            <img
            src={review.avatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <h3 className="font-bold text-2xl text-black">{review.username}</h3>
            <p className="font-medium text-black">
                menambahkan ulasan pada {review.date}
            </p>
            </div>
        </div>
        <div>
            <div className="text-yellow-400 text-xl mb-1 px-16">
            {"★".repeat(review.rating)}
            </div>
            <h4 className="font-semibold text-gray-800  px-16">
            {review.tripTitle}
            </h4>
        </div>
        <div className="flex gap-3 overflow-x-auto  px-16">
            {review.images.map((img, idx) => (
            <img
                key={idx}
                src={img}
                alt={`Review ${idx}`}
                className="w-40 h-28 object-cover rounded-xl"
            />
            ))}
        </div>
        <p className="text-gray-700 leading-relaxed px-16 text-justify">{review.text}</p>
        <div 
                className={`flex items-center justify-end gap-1 cursor-pointer transition duration-150 ${heartColorClass}`}
                onClick={handleLikeClick}
            >
                <Heart fill={heartFill} className="w-5 h-5" />
                <span className="text-sm font-medium">{likesCount}</span>
            </div>
        </div>
    );
};
export default ReviewCard;
