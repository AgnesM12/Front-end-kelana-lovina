import React, { useState, useEffect } from "react";
import { HiStar } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { getAllItems } from "../Utilis/indexedDB";

const PaketCard = ({ paket }) => {
    const slug = paket.title.toLowerCase().replace(/\s+/g, "-");
    const [stats, setStats] = useState({ avg: 0, total: 0 });
    const [imageUrl, setImageUrl] = useState(paket.imageSrc); 
    
    const loadStats = () => {
        const allReview = JSON.parse(localStorage.getItem("reviews")) || [];
        const paketReviews = allReview.filter(r => r.paketId === paket.paketId); 
        const total = paketReviews.length;
        const avg = 
            total === 0 
            ? 0 
            : (paketReviews.reduce((s, r) => s + Number(r.rating || 0), 0) / total).toFixed(1);
        setStats ({avg, total});
    };

    useEffect(() => {
        loadStats(); 
        window.addEventListener("reviewsUpdated", loadStats);
        return () => {
            window.removeEventListener("reviewsUpdated", loadStats);
        };
    }, [paket]);   


    useEffect(() => {
        loadStats();
        window.addEventListener("reviewsUpdated", loadStats);
        return () => window.removeEventListener("reviewsUpdated", loadStats);
      }, [paket]);
    
      useEffect(() => {
        let objectUrl;
    
        const loadImages = async () => {
          try {
            const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
            const paketReviews = allReviews.filter(r => r.paketId === paket.paketId);
            if (paketReviews.length === 0) return;
    
            const reviewIds = paketReviews.map(r => r.id);
            const album = await getAllItems("album");
            const reviewImages = album.filter(img => reviewIds.includes(img.reviewId));
    
            if (reviewImages.length > 0) {
              objectUrl = URL.createObjectURL(reviewImages[0].imageFile);
              setImageUrl(objectUrl);
            }
          } catch (err) {
            console.error("Gagal load gambar:", err);
          }
        };
    
        loadImages();
        window.addEventListener("reviewsUpdated", loadImages);
    
        return () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          window.removeEventListener("reviewsUpdated", loadImages);
        };
      }, [paket]);    

    return (
    <div className="w-full h-[500px] sm:w-[320px] md:w-[360px] lg:w-[385px] h-auto p-6 sm:p-5 lg:p-6 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col justify-center transition-transform duration-300">
        <img className="w-full h-[260px] object-cover object-center rounded-xl" src={imageUrl} alt={paket.title} />
        <div className="mt-2 p-2 sm:p-2 flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-xl md:text-lg font-bold text-gray-900 text-start">{paket.title}</h3>
            <p className="text-base sm:text-base md:text-lg text-gray-600">{paket.description}</p>
            <div className="flex flex-row justify-between sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-lg sm:text-xl font-bold text-black">{paket.price}</p>
                <div className="flex items-center justify-center sm:justify-end gap-1 text-gray-500">
                    <HiStar className="h-5 w-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-zinc-500 text-sm sm:text-lg md:text-xl font-medium">{stats.avg}</span>
                    <span className='text-zinc-500 text-sm sm:text-lg md:text-xl font-medium'>({stats.total})</span>
                </div>
            </div>
            <Link to={`/paket/${slug}`} >   
            <button className="mt-3 w-full bg-blue-600 text-white font-bold py-2 px-3 md:py-2.5 md:px-4 rounded-lg hover:bg-blue-700 transition-colors">Lihat paket</button>
            </Link>
        </div>
    </div>
    )
};
export default PaketCard;

