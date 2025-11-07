import React from "react";
import { X, Headset, Mail, ChevronRight } from "lucide-react";

const Bantuan = ({ closeModal }) => {
    const handleChatClick = () => {
        console.log("Navigating to chat...");
        alert("Memulai chat dengan layanan pelanggan.");
    };

    const handleEmailClick = () => {
        console.log("Navigating to email support...");
        alert("Membuka aplikasi email untuk bantuan.");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/70 z-50 p-4">
        <div className="w-full max-w-xl bg-white rounded-[30px] shadow-[0_6px_40px_rgba(0,94,209,0.16)] p-8 md:p-12 relative">
            <button
            onClick={closeModal}
            className="absolute right-6 top-6 text-zinc-800 hover:text-red-500 transition-colors"
            aria-label="Tutup Bantuan"
            >
            <X size={32} />
            </button>

            {/* Judul */}
            <h1 className="text-zinc-800 text-4xl md:text-5xl font-bold mb-10">
            Bantuan
            </h1>

            {/* Opsi Bantuan */}
            <div className="flex flex-col gap-6">
            {/* Chat dengan Kami */}
            <button
                onClick={handleChatClick}
                className="w-full py-5 px-4 flex justify-between items-center border-b-2 border-gray-200 hover:bg-blue-50/50 rounded-lg group transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                <div className="flex items-center gap-6">
                <Headset
                    size={32}
                    className="text-zinc-800 group-hover:text-blue-700 transition-colors"
                />
                <span className="text-zinc-800 text-xl md:text-2xl font-semibold">
                    Chat dengan kami!
                </span>
                </div>
                <ChevronRight
                size={30}
                className="text-zinc-800 group-hover:text-blue-700 transition-transform group-hover:translate-x-1"
                />
            </button>

            {/*Bantuan Email */}
            <button
                onClick={handleEmailClick}
                className="w-full py-5 px-4 flex justify-between items-center hover:bg-blue-50/50 rounded-lg group transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                <div className="flex items-center gap-6">
                <Mail
                    size={32}
                    className="text-zinc-800 group-hover:text-blue-700 transition-colors"
                />
                <div className="text-left">
                    <p className="text-zinc-800 text-xl md:text-2xl font-semibold">
                    Bantuan Email
                    </p>
                    <p className="text-zinc-600 text-base">
                    Kelananusantara@gmail.com
                    </p>
                </div>
                </div>
                <ChevronRight
                size={30}
                className="text-zinc-800 group-hover:text-blue-700 transition-transform group-hover:translate-x-1"
                />
            </button>
            </div>
        </div>
        </div>
    );
};

export default Bantuan;
