import React, { useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TiketSaya = ({ onClose }) => {
  const navigate = useNavigate();
  const [tiketList, setTiketList] = useState([]);

  useEffect(() => {
    const tiket = JSON.parse(localStorage.getItem("tiketSaya")) || [];
    setTiketList(tiket);
  }, []);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose || (() => navigate(-1))}
          className="absolute top-4 right-4"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Tiket Aktif</h2>

        {tiketList.length === 0 && (
          <p className="text-gray-500">Kamu belum memiliki tiket</p>
        )}

        <div className="flex flex-col gap-6">
          {tiketList.map((tiket, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center gap-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={tiket.imageSrc}
                  alt={tiket.paket}
                  className="w-44 h-32 object-cover rounded-xl"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {tiket.paket}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {formatTanggal(tiket.tanggalBerangkat)}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {tiket.jumlahOrang} Orang
                  </p>
                </div>
              </div>

              <ChevronRight
                className="w-7 h-7 cursor-pointer"
                onClick={() => navigate("/tiket/detailTiketSaya", { state: { paket: tiket.paket, data: tiket.data } , }) }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiketSaya;