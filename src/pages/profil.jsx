import React from 'react';


function Profil() {
    const PreferenceButton = ({ label }) => (
        <button className="px-6 py-3.5 h-14 rounded-lg border-2 border-primary text-primary text-lg font-semibold hover:bg-primary/10 transition-colors">
            {label}
        </button>
    );
    
    const ProfileLink = ({ label }) => (
        <a href="#" className="text-primary text-2xl font-semibold ">
            {label}
        </a>
    );

    return (
    <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center gap-10">
        <div className="w-full max-w-6xl p-8 bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] mt-6">
            <section className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Foto Profil */}
            <img 
                className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover flex-shrink-0" 
                src="/profile.svg"
                alt="Profil Clara Anindya"
            />
            {/* Info Profil & Tombol Edit */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col justify-start items-start">
                <h2 className="text-4xl font-bold text-black">
                    Clara Anindya
                </h2>
                <p className="text-2xl font-semibold text-zinc-800 mt-2">
                    Wisatawan
                </p>
                <p className="text-base font-medium text-zinc-800 mt-6 max-w-lg">
                    Traveling buatku bukan sekadar liburan, tapi cara ngumpulin cerita & kenangan baru
                </p>
                </div>
                <button className="bg-blue-600 text-white text-lg font-extraboldbold  h-14 px-6 py-3.5 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto flex-shrink-0">
                Edit Profil
                </button>
            </div>
            </section>
        </div>
    <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col gap-10">
        {/* 1. Preferensi Wisata */}
        <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-6">Preferensi Wisata</h2>
            <div className="flex flex-wrap gap-4">
                <PreferenceButton label="Pantai" />
                <PreferenceButton label="Alam" />
                <PreferenceButton label="Snorkling" />
                <PreferenceButton label="Paket Wisata" />
            </div>
        </section>
        {/* 2. Galeri Pengguna */}
        <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-6">Galeri Pengguna</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img 
                className="w-96 h-60 object-cover rounded-2xl" 
                src="/galeri-pengguna1.jpg" 
                alt="Galeri Pengguna 1" 
            />
            <img 
                className="w-96 h-60 object-cover rounded-2xl" 
                src="galeri-pengguna2.jpg" 
                alt="Galeri Pengguna 2" 
            />
            <img 
                className="w-96 h-60 object-cover rounded-2xl" 
                src="galeri-pengguna3.png" 
                alt="Galeri Pengguna 3" 
            />
        </div>
        </section>

        {/* 3. Pemesanan */}
        <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Pemesanan</h2>
        <div className="flex flex-col gap-3">
            <ProfileLink label="Riwayat Pemesanan" />
        </div>
        </section>

        {/* 4. Aktivitas & Riwayat */}
        <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Aktivitas & Riwayat</h2>
        <div className="flex flex-col gap-3">
            <ProfileLink label="Tiket Saya" />
            <ProfileLink label="Review/Rating" />
            <ProfileLink label="Foto/Video diunggah" />
        </div>
        </section>

        {/* 5. Keamanan & Pengaturan */}
        <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Keamanan & Pengaturan</h2>
        <div className="flex flex-col gap-3">
            <ProfileLink label="Ubah Kata Sandi" />
        </div>
        </section>
    </div>

        {/* button bantun dan keluar*/}
    <div className="w-full max-w-6xl flex justify-end gap-4 my-16">
        <button className="w-full sm:w-auto flex-1 sm:flex-none bg-primary text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors">
            Bantuan
        </button>
        <button className="w-full sm:w-auto flex-1 sm:flex-none bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
            Keluar
        </button>
    </div>
    </div>
    );
}

export default Profil;

