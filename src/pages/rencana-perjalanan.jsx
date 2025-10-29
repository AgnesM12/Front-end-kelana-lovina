import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import RencanaPerjalanan from "../components/AturRencana";
import RencanaCard from "../components/RencanaCard";
import Judul from "../components/Judul";

function Rencana() {
  const dataHero1 = {
    title: "Atur  Rencana Perjalanan Sesukamu",
    imageSrc: "/hero.png",
    altText: "hero",
  };

  const [packages, setPackages] = useState([]);

  const handleAddPackage = (newPackage) => {
    const packageWithAction = {
      ...newPackage,
      onDelete: () => handleDelete(newPackage.id),
    };
    setPackages((prev) => [...prev, packageWithAction])
  };

  const handleDelete = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const judulItenary = {
    title: "Rencana Perjalanan",
    description: "Atur dan pantau rencana liburanmu dengan lebih mudah, mulai dari memilih tanggal, paket wisata, hingga perkiraan biaya yang sesuai. Nikmati ringkasan perjalanan yang jelas agar liburanmu di Lovina semakin terencana, nyaman, dan tak terlupakan.",
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 my-16">
      <HeroSection hero={dataHero1} />
      <RencanaPerjalanan onAddPackage={handleAddPackage} />
      <div className="mt-16">
      <Judul header={judulItenary} /> 
      </div>
      
      {/* Card yang ditampilkan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
        {packages.map((pkg) => (
          <RencanaCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
      {packages.length > 0 && (
      <div className="mt-16 font-semibold flex justify-center items-center text-xl p-4 bg-white rounded-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] max-w-2xl mx-auto">
        <p>Selesaikan perjalananmu dan siapkan rencana berikutnya </p>
      </div>
      )}
    </main>
  );
}
export default Rencana;
