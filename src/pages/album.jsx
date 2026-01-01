import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";
import { getAllItems } from "../Utilis/indexedDB";
import { id } from "date-fns/locale";

function Album () {
    const [album, setAlbum] = useState([]);

    const loadAlbum = async () => {
        try {
          const savedAlbum = await getAllItems("album"); 
          setAlbum(savedAlbum);
        } catch (err) {
          console.error("Tidak dapat memuat album:", err);
          setAlbum([]);
        }
      };

    useEffect(() => {
        loadAlbum();
        const handleReviewsUpdated = () => {
            loadAlbum();
        }; 
        window.addEventListener("reviewsUpdated", handleReviewsUpdated);

        return () => {
            window.removeEventListener("reviewsUpdated", handleReviewsUpdated);
          };
    }, []);


    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-16 overflow-x-hidden">
            <HeroSection hero={{
                imageSrc: "/hero.png",
                altText: "hero",
                title: "Album Pribadi"
            }} />
            <div className="mt-16">
                <Judul header={{
                    title: "Albumku",
                    description: "Kumpulan momen terbaik yang pernah aku abadikan",
                }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20">
            {album.length > 0 ? (
                album.map((item) => (
                    <div key={id} className="bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden">
                        <img
                            src={URL.createObjectURL(item.imageFile)}
                            alt={item.description || "Foto perjalanan"}
                            className="w-full h-60 object-cover"
                        />
                    </div>
                ))
            ) : (
                <p className="text-black text-lg col-span-full text-center">
                    Belum ada foto di albummu. Ayo mulai abadikan momen serumu!
                </p>    
            )}
            </div>
        </main>
    )
}
export default Album;