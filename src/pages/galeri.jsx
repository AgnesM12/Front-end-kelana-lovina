import React, { useEffect, useState} from "react";
import Judul from "../components/Judul"; 
import HeroSection from "../components/HeroSection";


function HalamanGaleriPenuh() {
const [items, setItems] = useState([]);

useEffect(() => {
    const data = JSON.parse(localStorage.getItem("album")) || [];
    setItems(data);
}, []);

const dataHero = {
    title: "Temukan Paket Terbaik untuk Perjalananmu",
    imageSrc: '/hero.png',
    altText: 'hero',
}

const acaraData = [
    { src: "/galeriP-1.png", alt: "galeriP 1" },
    { src: "/galeriP-2.jpg", alt: "galeriP 2" },
    { src: "/galeriP-3.png", alt: "galeriP 3" },
    { src: "/galeriP-4.jpg", alt: "galeriP 4" },
    { src: "/galeriP-5.png", alt: "galeriP 5" },
    { src: "/galeriP-6.jpg", alt: "galeriP 6" },
    { src: "/galeriP-7.png", alt: "galeriP 7" },
    { src: "/galeriP-8.png", alt: "galeriP 8" },
    { src: "/galeriP-9.png", alt: "galeriP 9" },
    { src: "/galeriP-10.jpg", alt: "galeriP 10" },
    { src: "/galeriP-11.jpg", alt: "galeriP 11" },
    { src: "/galeriP-12.png", alt: "galeriP 12" },
    ];

    const itemRows = [];
    for (let i = 0; i<acaraData.length; i += 2) {
        itemRows.push(acaraData.slice(i, i+2));
    }
    const ukuranGambar = (barisPertama, barisKedua) => {
        if (barisKedua) {
            return barisPertama ? "w-2/5" : "w-3/5";
        } else {
            return barisPertama ? "w-3/5" : "w-2/5";
        }
    };

    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16">
            <HeroSection hero={dataHero} />
        <section className="flex flex-col items-center px-4 my-16">
        <Judul
            header={{
            title: "Galeri Pengunjung",
            description:
                "Galeri foto penuh warna yang menghadirkan cerita dari setiap event dan festival di Lovina",
            }}
        />

        <div className="flex flex-col gap-6 w-full items-center">
            {itemRows.slice(0, 6).map((row, index) => (
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

            <div className="flex flex-wrap justify-center gap-4">
                {items.map((item, index) => (
                    <div key={index} className="w-64 h-64 overflow-hidden rounded-2xl shadow-lg">
                        <img
                            src={item.imageSrc}
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

        </div>
    </section>
    </main>
    );
};

export default HalamanGaleriPenuh;
