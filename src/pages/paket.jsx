import React from "react";
import HeroSection from "../components/HeroSection";
import HalamanPaketPenuh from "../components/HalamanPaketPenuh";

function Paket() {

    const dataHeroSection = {
        title: "Temukan Paket Terbaik untuk Perjalananmu",
        imageSrc: '/hero.png',
        altText: 'hero',
    }

    return(
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden ">
            <HeroSection hero={dataHeroSection} />
        <section className="my-16">
            <HalamanPaketPenuh />
        </section>
        </main>
    )
}
export default Paket;