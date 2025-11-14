// import React, {useState} from "react";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";

function Album () {
    const [album, setAlbum] = useState([]);

    useEffect(() => {
        const savedAlbum = JSON.parse(localStorage.getItem("album")) || [];
        setAlbum(savedAlbum);
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
                album.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden">
                        <img
                            src={item.imageSrc}
                            alt={`Album Item ${index + 1}`}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-black text-base font-medium">
                                {item.description}
                            </p>
                        </div>
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