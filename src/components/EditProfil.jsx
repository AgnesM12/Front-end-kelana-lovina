import React, { useState, useEffect, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { X, ChevronUp, ChevronDown } from "lucide-react";

const InputField = ({ label, placeholder, value, onChange }) => (
  <div className="w-full flex flex-col gap-2.5">
    <label className="text-zinc-800 text-base font-semibold">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-11 px-4 py-2 rounded-lg border-2 border-blue-700 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"/>
  </div>
);

const EditProfil = ({ closeModal, existingData, onSave }) => {
  const data = existingData ?? {};

  const [namaLengkap, setNamaLengkap] = useState(data.namaLengkap || "");
  const [bio, setBio] = useState(data.bio || "");
  const [preferensiWisata, setPreferensiWisata] = useState(Array.isArray(data.preferensiWisata) ? data.preferensiWisata : []);
  
  const [fotoProfile, setFotoProfile] = useState(data.fotoProfile || "");
  const [fotoFile, setFotoFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const preferensi = 
  [
    "Pantai", "Alam", "Snorkeling", "Paket Wisata",
    "Event", "Sunrise", "Watching Dolphin", "Kuliner", "Budaya"
  ];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userProfile"));
    if (savedData) {
      setNamaLengkap(savedData.namaLengkap || "");
      setBio(savedData.bio || "");
      setPreferensiWisata(savedData.preferensiWisata || []);
      setFotoProfile(savedData.fotoProfile || "");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePreference = (pref) => {
    setPreferensiWisata((prev) =>
      prev.includes(pref) ? prev.filter((item) => item !== pref) : [...prev, pref]
    );
  };

  const handleChangeFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFotoProfile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedProfile = {namaLengkap, bio, preferensiWisata, fotoProfile, };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    if (onSave) onSave(updatedProfile);
    closeModal();
  };

  const Dropdown = ({ label, options }) => (
    <div ref={dropdownRef} className="w-full flex flex-col gap-2.5 relative z-30">
      <label className="text-zinc-800 text-base font-semibold">{label}</label>
      <button
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="w-full min-h-11 px-4 py-2 rounded-lg border-2 border-blue-700 flex justify-between items-start text-gray-700 text-sm bg-white focus:outline-none"
      >
        <div className="flex flex-wrap gap-2 text-left">
          {preferensiWisata.length > 0 ? (
            preferensiWisata.map((pref, index) => (
              <span
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePreference(pref);
                }}
                className="flex items-center text-sm bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium hover:bg-red-100 transition duration-100"
              >
                {pref}
                <X className="w-4 h-4 ml-1 cursor-pointer" />
              </span>
            ))
          ) : (
            <span className="text-gray-400 py-1">Pilih preferensi wisata anda</span>
          )}
        </div>

        {isDropdownOpen ? (
          <ChevronUp className="w-6 h-6 text-zinc-600 ml-2 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-zinc-600 ml-2 flex-shrink-0" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-40">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => togglePreference(option)}
              className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${
                preferensiWisata.includes(option)
                  ? "bg-blue-200 text-blue-700 font-semibold"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-6 md:p-12 relative overflow-y-auto max-h-[90vh]">
        <X onClick={closeModal} className="absolute top-6 right-6 w-8 h-8 text-zinc-800 hover:text-red-500 cursor-pointer" />
        <h1 className="text-center text-zinc-800 text-3xl font-bold mb-10">Informasi Pemilik Akun</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <label className="relative cursor-pointer">
              <img className="w-56 h-56 rounded-full object-cover shadow-lg bg-pink-300" src={fotoProfile} alt="Foto Profil" />
              <div className="absolute bottom-4 right-4 bg-blue-700 text-white p-2 rounded-full shadow-md hover:bg-blue-800">
                <FiCamera className="w-5 h-5" />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleChangeFoto} />
            </label>
          </div>
          <div className="space-y-6 w-full text-base font-semibold text-zinc-800">
            <InputField label="Nama Lengkap" placeholder="Masukkan nama lengkap anda" value={namaLengkap} onChange={setNamaLengkap} />
            <InputField label="Bio" placeholder="Tambahkan bio anda" value={bio} onChange={setBio} />
            <Dropdown label="Preferensi Wisata" options={preferensi} />
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSave}
            className="w-full max-w-sm h-14 px-6 py-3.5 bg-blue-700 hover:bg-blue-800 transition duration-200 rounded-lg text-white text-lg font-extrabold shadow-lg"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfil;
