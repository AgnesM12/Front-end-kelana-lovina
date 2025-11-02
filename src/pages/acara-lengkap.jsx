import React from "react";
import Judul from "../components/Judul"; 
import HeroSection from "../components/HeroSection";

function HalamanAcaraLengkap() {
    
    const dataHero = {
        title: "Jelajahi Festival",
        imageSrc: '/hero.png',
        altText: 'hero',
    };

const acaraData = [
    { src: "/acara-1.jpg", alt: "acara 1" },
    { src: "/acara-2.jpg", alt: "acara 2" },
    { src: "/acara-3.jpg", alt: "acara 3" },
    { src: "/acara-4.jpg", alt: "acara 4" },
    { src: "/acara-5.png", alt: "acara 5" },
    { src: "/acara-6.png", alt: "acara 6" },
    { src: "/acara-7.jpg", alt: "acara 7" },
    { src: "/acara-8.jpg", alt: "acara 8" },
    { src: "/acara-9.jpg", alt: "acara 9" },
    { src: "/acara-10.jpg", alt: "acara 10" },
    { src: "/acara-11.jpg", alt: "acara 11" },
    { src: "/acara-12.jpg", alt: "acara 12" },
    ];

    const rows = [];
    for (let i = 0; i<acaraData.length; i += 2) {
        rows.push(acaraData.slice(i, i+2));
    }

    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16 overflow-x-hidden">
            <HeroSection hero={dataHero}/>
        <section className="flex flex-col items-center px-4 my-16">
        <Judul
            header={{
            title: "Galeri Acara",
            description:
                "Galeri foto penuh warna yang menghadirkan cerita dari setiap event dan festival di Lovina",
            }}
        />
        <div className="flex flex-col gap-6 mt-10 w-full items-center">
            {rows.slice(0, 6).map((row, index) => (
            <div
                key={index}
                className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]"
            >
                {/* Gambar kiri */}
                <div
                className={`w-full lg:w-[${
                    index % 2 === 0 ? "40%" : "60%"
                }] h-[306px] overflow-hidden rounded-2xl shadow-lg`}
                >
                <img
                    src={row[0]?.src}
                    alt={row[0]?.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                </div>
                {/* Gambar kanan */}
                {row[1] && (
                <div
                    className={`w-full lg:w-[${
                    index % 2 === 0 ? "60%" : "40%"
                    }] h-[306px] overflow-hidden rounded-2xl shadow-lg`}
                >
                    <img
                    src={row[1]?.src}
                    alt={row[1]?.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                )}
            </div>
            ))}
        </div>
    </section>
    </main>
    );
};

export default HalamanAcaraLengkap;