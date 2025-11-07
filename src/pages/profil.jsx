import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditProfil from '../components/EditProfil';
import TiketSaya from '../components/TiketSaya';
import UbahKataSandi from '../components/UbahKataSandi';
import Bantuan from '../components/Bantuan';
import { logout } from '../redux/slice';

function Profil() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
    dispatch(logout());     
    navigate('/');             
    };

    const PreferensiButton = ({ label }) => (
        <button className="px-6 py-3.5 h-14 rounded-lg border-2 border-primary text-primary text-lg font-semibold transition-colors">
        {label}
        </button>
    );

    const [dataProfil, setDataProfil] = useState({
        namaLengkap: user?.name || user?.email?.split('@')[0] || "Pengguna Baru",
        bio: "Traveling buatku bukan sekadar liburan, tapi cara ngumpulin cerita & kenangan baru",
        preferensiWisata: ["Pantai", "Alam", "Snorkeling", "Paket Wisata"],
    });

    const [tampilEdit, setTampilEdit] = useState(false);
    const [tampilTiket, setTampilTiket] = useState(false);
    const [tampilUbahSandi, setTampilUbahSandi] = useState(false);
    const [tampilBantuan, setTampilBantuan] = useState(false);

    const handleUpdateProfil = (dataBaru) => {
        setDataProfil((prev) => ({
        ...prev,
        ...dataBaru,
        preferensiWisata: Array.isArray(dataBaru.preferensiWisata) 
        ? dataBaru.preferensiWisata
        : prev.preferensiWisata,
        }));
        setTampilEdit(false);
    };

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
                    {dataProfil.namaLengkap}
                </h2>
                <p className="text-2xl font-semibold text-zinc-800 mt-2">
                    Wisatawan
                </p>
                <p className="text-base font-medium text-zinc-800 mt-6 max-w-lg">
                    {dataProfil.bio}
                </p>
                </div>

                {/* Tombol Edit Profil */}
                <button
                onClick={() => setTampilEdit(true)}
                className="bg-primary text-white text-lg font-extrabold h-14 px-6 py-3.5 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto flex-shrink-0"
                >
                Edit Profil
                </button>
            </div>
            </section>
        </div>

        {/* 1. Preferensi Wisata */}
        <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex flex-col gap-10">
            <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-6">Preferensi Wisata</h2>
            <div className="flex flex-wrap gap-4">
            {Array.isArray(dataProfil.preferensiWisata) && dataProfil.preferensiWisata.map((pref, i) => (
                <PreferensiButton key={i} label={pref} />
                ))}
            </div>
            </section>

            {/* 2. Galeri Pengguna */}
            <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-6">Galeri Pengguna</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <img className="w-96 h-60 object-cover rounded-2xl" src="/galeri-pengguna1.jpg" alt="Galeri Pengguna 1" />
                <img className="w-96 h-60 object-cover rounded-2xl" src="galeri-pengguna2.jpg" alt="Galeri Pengguna 2" />
                <img className="w-96 h-60 object-cover rounded-2xl" src="galeri-pengguna3.png" alt="Galeri Pengguna 3" />
            </div>
            </section>

            {/* 3. Pemesanan */}
            <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Pemesanan</h2>
            <div className="flex flex-col gap-3">
                <Link to="/riwayat-pemesanan" className="text-primary text-2xl font-semibold hover:underline">
                Riwayat Pemesanan
                </Link>
            </div>
            </section>

            {/* 4. Aktivitas & Riwayat */}
            <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Aktivitas & Riwayat</h2>
            <div className="flex flex-col gap-3">
                <button onClick={() => setTampilTiket(true)} className="text-primary text-2xl font-semibold hover:underline text-left">
                Tiket Saya
                </button>
                <Link to="/review-rating" className="text-primary text-2xl font-semibold hover:underline">
                Review/Rating
                </Link>
                <Link to="/unggah-foto-video" className="text-primary text-2xl font-semibold hover:underline">
                Foto/Video Diunggah
                </Link>
            </div>
            </section>

            {/* 5. Keamanan & Pengaturan */}
            <section className="w-full">
            <h2 className="text-black text-3xl font-bold mb-3">Keamanan & Pengaturan</h2>
            <div className="flex flex-col gap-3">
                <button  onClick={() => setTampilUbahSandi(true)} className="text-primary text-2xl font-semibold hover:underline text-left">
                Ubah Kata Sandi
                </button>
            </div>
            </section>
        </div>
        <div className="w-full max-w-6xl flex justify-end gap-4 my-16">
            <button onClick={() => setTampilBantuan(true)} className="w-full sm:w-auto flex-1 sm:flex-none bg-primary text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors">
            Bantuan
            </button>
            <button onClick={handleLogout} className="w-full sm:w-auto flex-1 sm:flex-none bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
            Keluar
            </button>
        </div>
        {tampilEdit && (
            <EditProfil
            closeModal={() => setTampilEdit(false)}
            onSave={handleUpdateProfil}
            existingData={dataProfil}
            />
        )}
        {tampilTiket && <TiketSaya onClose={() => setTampilTiket(false)} />}
        {tampilUbahSandi && <UbahKataSandi closeModal={() => setTampilUbahSandi(false)} />}
        {tampilBantuan && <Bantuan closeModal={() => setTampilBantuan(false)} /> } 
        </div>
    );
}

export default Profil;





