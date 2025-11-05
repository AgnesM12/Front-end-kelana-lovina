import React, { useState } from "react";
import { FaStar, FaRegStar, FaRegImage } from "react-icons/fa";

const TambahUlasan = () => {
    const [rating, setRating] = useState(0);
    const [ulasan, setUlasan] = useState("");
    const maxKarakter = 350;

    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Ulasan berhasil dikirim!");
        setUlasan("");
        setRating(0);
    };

    return (
        <div className="w-[1046px] h-[811px] relative bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden p-10 mx-auto mt-8">
        <h2 className="text-center text-2xl font-semibold text-black mb-8">
            Bagikan Pengalaman kamu di Lovina Kepada Mereka
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Rating */}
            <div>
            <label className="text-base font-bold text-black/60">
                Seberapa Memuaskan Pengalaman Anda?
            </label>
            <div className="flex gap-2 mt-3">
                {[1, 2, 3, 4, 5].map((index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => handleStarClick(index)}
                    className="text-3xl text-yellow-400"
                >
                    {index <= rating ? <FaStar /> : <FaRegStar />}
                </button>
                ))}
            </div>
            </div>

            {/* Ulasan */}
            <div>
            <label className="text-base font-bold text-black/60">Tulis Ulasan</label>
            <textarea
                className="w-full h-36 border-2 border-blue-700 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Ceritakan Pengalaman Anda Berlibur di Lovina..."
                value={ulasan}
                maxLength={maxKarakter}
                onChange={(e) => setUlasan(e.target.value)}
            />
            <div className="text-right text-[10px] text-gray-600 mt-1">
                {ulasan.length}/{maxKarakter} maks. karakter
            </div>
            </div>

            {/* Upload Foto/Video */}
            <div>
            <label className="text-base font-bold text-black/60">
                Tambahkan Foto atau Video Anda
            </label>
            <div className="w-full h-36 border-2 border-blue-700 rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer mt-2 hover:bg-blue-50 transition">
                <FaRegImage className="text-3xl text-blue-600" />
                <p className="text-[10px] text-gray-700">
                Klik untuk menambahkan beberapa foto atau video
                </p>
            </div>
            </div>

            {/* Tombol Submit */}
            <button
            type="submit"
            className="h-12 w-full sm:w-auto px-6 py-3.5 bg-blue-700 rounded-lg text-white text-lg font-extrabold self-center hover:bg-blue-800 transition"
            >
            Bagikan Cerita Anda
            </button>
        </form>
        </div>
    );
};

export default TambahUlasan;
