// import React, {useState} from "react";
import HeroSection from "../components/HeroSection";
import Judul from "../components/Judul";

function Album () {
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
        </main>
    )
}
export default Album;