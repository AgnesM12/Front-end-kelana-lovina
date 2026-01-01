import React, { useEffect, useState} from "react";
import Judul from "../components/Judul"; 
import HeroSection from "../components/HeroSection";
import { getAllItems } from "../Utilis/indexedDB";

function HalamanGaleriPenuh() {
const [items, setItems] = useState([]);
const [galeriPengguna, setGaleriPengguna] = useState([]);

const loadGaleriPengguna = async () => {
    try{
        const photo = await getAllItems("album"); 
        const sorted = photo.sort((a, b) => b.id - a.id);
        setGaleriPengguna(sorted);
    } catch (err) {
        console.error("Gagal memuat galeri pengguna: ", err);
        setGaleriPengguna([]);
    };
};

useEffect(() => {
    loadGaleriPengguna();
    const handleUpdate = () => loadGaleriPengguna();
    window.addEventListener("reviewsUpdated", handleUpdate);
    return () => window.removeEventListener("reviewsUpdated", handleUpdate);
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

    const userPhotoRows = []; 
    for (let i=0; i<galeriPengguna.length; i+=2) {
        userPhotoRows.push(galeriPengguna.slice(i, i+2));
    }

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
                    // index % 2 === 0 ? "40%" : "60%"
                    index % 2 === 0 ? "lg:w-2/5" : "lg:w-3/5"
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
                    // index % 2 === 0 ? "60%" : "40%"
                    index % 2 === 0 ? "lg:w-3/5" : "lg:w-2/5"
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

            {userPhotoRows.length > 0 && ( <>
              {userPhotoRows.map((row, index) => (
                <div
                  key={`user-${index}`}
                  className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]"
                >
                  {/* Gambar kiri */}
                  <div
                    className={`w-full ${
                      index % 2 === 0 ? "lg:w-2/5" : "lg:w-3/5"
                    } h-[306px] overflow-hidden rounded-2xl shadow-lg`}
                  >
                    <img
                      src={URL.createObjectURL(row[0]?.imageFile)}
                      alt={row[0]?.description || "Foto pengunjung"}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Gambar kanan*/}
                  {row[1] && (
                    <div
                      className={`w-full ${
                        index % 2 === 0 ? "lg:w-3/5" : "lg:w-2/5"
                      } h-[306px] overflow-hidden rounded-2xl shadow-lg`}
                    >
                      <img
                        src={URL.createObjectURL(row[1]?.imageFile)}
                        alt={row[1]?.description || "Foto pengunjung"}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
    </section>
    </main>
    );
};

export default HalamanGaleriPenuh;
