import React from "react";
import { X, ChevronRight } from "lucide-react";

const TiketSaya = ({ onClose }) => {
    const tiketAktif = {
        id: 1,
        image: "/paket-sunrise-cruise.png",
        title: "Sunrise Dolphin Cruise",
        deskripsi: "Durasi 2 jam - Termasuk snack & minum",
        tanggal: "01 Agustus 2025",
        waktu: "05.30",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-4">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-6 md:p-12 relative overflow-y-auto max-h-[90vh]">
            
            {/* Tombol Tutup */}
            <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition"
            >
            <X size={28} className="text-black hover:text-red-500" />
            </button>

            {/* Header */}
            <h2 className=" text-zinc-800 text-3xl font-bold mb-10">
            Tiket Aktif
            </h2>

            {/* Kartu Tiket */}
            <div className="w-full bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-6 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <img
                src={tiketAktif.image}
                alt={tiketAktif.title}
                className="w-52 h-36 rounded-2xl object-cover"
                />
                <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-zinc-800">
                    {tiketAktif.title}
                </h3>
                <p className="text-gray-500 text-lg mt-1">{tiketAktif.deskripsi}</p>
                <p className="text-zinc-800 text-lg font-medium mt-4">
                    {tiketAktif.tanggal} | {tiketAktif.waktu}
                </p>
                </div>
            </div>

            <ChevronRight className="text-black w-7 h-7" />
            </div>
        </div>
        </div>
    );
};

export default TiketSaya;
