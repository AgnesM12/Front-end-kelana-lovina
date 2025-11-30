import React, { useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import {useNavigate } from "react-router-dom";

const TiketSaya = ({ onClose }) => {

    const navigate = useNavigate();
    const [tiketList, setTiketList] = useState([]);

    useEffect(() => {
        const tiket = JSON.parse(localStorage.getItem("tiketSaya")) || [];
        const aktif = tiket.filter((t) => t.status?.toLowerCase() === "berhasil" || t.status?.toLowerCase() === "selesai");
        setTiketList(aktif)
    }, []);
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-2 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-white rounded-[30px] shadow-2xl p-4 sm:p-8 lg:p-10 relative max-h-[90vh] overflow-y-auto">
            
            {/* Tombol Tutup */}
            <button
            onClick={onClose || (() => navigate(-1))}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition"
            >
            <X size={28} className="text-black hover:text-red-500" />
            </button>

            {/* Header */}
            <h2 className=" text-zinc-800 text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center sm:text-left">
            Tiket Aktif
            </h2>

            {tiketList.length === 0 && <p className="text-gray-500 text-center sm:text-left">Kamu belum memiliki tiket</p>}

            {/* Kartu Tiket */}
            <div className="flex flex-col gap-4 sm:gap-6">
                {tiketList.map((tiket, index) => (
                <div key={index} className="w-full bg-white rounded-[25px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <img
                    src={tiket.paket.imageSrc}
                    alt={tiket.paket.title}
                    className="w-full sm:w-44 md:w-52 h-40 sm:h-36 object-cover rounded-2xl"
                    />
                    <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-800">
                        {tiket.paket.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">{tiket.paket.deskripsi}</p>
                    <p className="text-zinc-800 text-sm sm:text-lg font-medium mt-3">
                        {tiket.data.tanggalBerangkat} {tiket.paket.departurTime}
                    </p>
                    </div>
                </div>
                <ChevronRight onClick={() => navigate ("/detailTiketSaya", {state: {paket: tiket.paket, data: tiket.data} })} style={{cursor: 'pointer'}} className="text-black w-7 h-7" />
                </div>
            ))}
        </div>
        </div>
        </div>
    );
};

export default TiketSaya;
