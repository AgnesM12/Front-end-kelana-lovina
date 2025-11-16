import React, { useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const TiketSaya = ({ onClose }) => {

    const navigate = useNavigate();
    const {state} = useLocation(); 
    const [tiketList, setTiketList] = useState([]);

    useEffect(() => {
        const tiket = JSON.parse(localStorage.getItem("tiketSaya")) || [];
        const aktif = tiket.filter((t) => t.status?.toLowerCase() === "berhasil" || t.status?.toLowerCase() === "selesai");
        setTiketList(aktif)
    }, []);
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-4 gap-6">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-6 md:p-12 relative overflow-y-auto max-h-[90vh]">
            
            {/* Tombol Tutup */}
            <button
            onClick={onClose || (() => navigate(-1))}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition"
            >
            <X size={28} className="text-black hover:text-red-500" />
            </button>

            {/* Header */}
            <h2 className=" text-zinc-800 text-3xl font-bold mb-10">
            Tiket Aktif
            </h2>

            {tiketList.length === 0 && <p className="text-gray-500">Kamu belum memiliki tiket</p>}

            {/* Kartu Tiket */}
            <div className="flex flex-col gap-6">
                {tiketList.map((tiket, index) => (
                <div key={index} className="w-full bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] p-6 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <img
                    src={tiket.paket.imageSrc}
                    alt={tiket.paket.title}
                    className="w-52 h-36 rounded-2xl object-cover"
                    />
                    <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold text-zinc-800">
                        {tiket.paket.title}
                    </h3>
                    <p className="text-gray-500 text-lg mt-1">{tiket.paket.deskripsi}</p>
                    <p className="text-zinc-800 text-lg font-medium mt-4">
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
