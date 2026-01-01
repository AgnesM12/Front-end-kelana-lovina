import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import paketData from "../components/DataDetailPaket.jsx";

    const DetailPaket = ({ isLoggedIn }) => { 
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const newReview = location.state?.newReview;
    const [userReviews, setUserReviews] = useState([]);
    const [reviewsUpdated, setReviewsUpdated] = useState(0);

    const paket = paketData.find((p) => p.slug === slug);
    // const decodedSlug = decodeURIComponent(slug);
    // const paket = paketData.find((p) => `${p.paketId}-${p.slug}` === decodedSlug);
    console.log("Slug URL:", slug); 
    console.log("Data found:", paket); 
    console.log("All slugs:", paketData.map(p => p.slug));

    useEffect(() => {
        if (!paket) return;
      
        const loadReviews = () => {
            const allReview = JSON.parse(localStorage.getItem("reviews")) || [];
            const filtered = allReview.filter(
              r => r.paketId === paket.paketId
            );  
            setUserReviews(filtered);  
        }; 
        loadReviews();
        window.addEventListener("reviewsUpdated", loadReviews);
        return () => {
            window.removeEventListener("reviewsUpdated", loadReviews);
        };  
      }, [paket]);
      
    
    if (!paket) {
        return <p className="text-center mt-40 text-gray-500">Paket tidak ditemukan.</p>
    ;}
        
    const totalReviews = userReviews.length;
    const avgRating = totalReviews === 0
        ? 0
        : (
            userReviews.reduce( (sum, r) => sum + Number(r.rating || 0), 0) / totalReviews
            ).toFixed(1);

    const handlePesanClick = () => {
        if (isLoggedIn) {
            navigate(`/paket/${slug}/menuPembayaran`, { state: paket });
        } 
        else {
            navigate("/login");
        }
        };

        return (
            <div className="max-w-full mx-auto bg-white flex flex-col gap-8 p-4 sm:p-6 md:p-8 lg:max-w-[1200px] lg:my-16 lg:px-9 lg:py-14 lg:rounded-[30px] lg:shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
                {/* Gambar latar */}
                <img
                    src={paket.imageSrc}
                    alt={paket.title}
                    className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[560px] object-cover rounded-xl lg:rounded-2xl"
                />

                {/* Judul & price */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-zinc-700">{paket.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
                    <p className="text-lg sm:text-2xl md:text-2xl font-bold text-zinc-700">{paket.price}/Person</p>
                    <div className="flex items-center text-sm sm:text-lg md:text-xl font-semibold text-zinc-500">
                        <HiStar className="mr-1 h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" /> {avgRating}
                        {/* <span className="ml-2">({paket.reviews})</span> */}
                        <span className="ml-2 cursor-pointer underline" 
                            onClick={() => navigate(`/paket/${slug}/ulasan`)}> ({totalReviews} ulasan)
                        </span>
                    </div>
                    </div>
                </div>

                {/*  Durasi & Kapasitas */}
                <div className="text-base sm:text-lg md:text-2xl text-zinc-800 leading-relaxed">
                    <p>
                    <span className="font-bold ">Durasi: </span>{paket.duration}
                    </p>
                    <p>
                    <span className="font-bold">Kapasitas: </span>{paket.capacity}
                    </p>
                </div>

                {/* Paket Termasuk */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 mb-2 md:mb-3">Paket Termasuk</h2>
                    <ul className="list-disc list-inside text-base sm:text-lg md:text-2xl text-zinc-800 leading-relaxed space-y-1">
                    {paket.desk.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                    </ul>
                </div>

                {/* Jadwal & Lokasi */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 mb-2 md:mb-3">Jadwal & Lokasi</h2>
                    <p className="text-base sm:text-lg md:text-2xl text-zinc-800">
                    <span className="font-bold">Waktu Keberangkatan: </span>{paket.schedule}
                    </p>
                    <p className="text-base sm:text-lg md:text-2xl text-zinc-800">
                    <span className="font-bold">Lokasi: </span>{paket.location}
                    </p>
                </div>


                {/* Tombol Pesan */}
                    <button onClick={handlePesanClick} className="mt-4 w-full h-14 sm:h-16 px-6 py-3 bg-primary text-white text-lg sm:text-2xl md:text-3xl font-bold rounded-lg hover:bg-blue-700 transition">
                        Pesan Sekarang
                    </button>
                </div>
            );
        };

    export default DetailPaket;
