import React, { useState } from "react";
import { FaStar, FaRegStar, FaRegImage } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TambahUlasan = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { slug } = useParams();
  const {paketId, title, imageSrc, kategori, tanggalBerangkat} = state || {};
  const trip = state?.trip;
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const maxKarakter = 350;

  const user = useSelector((state) => state.auth?.user);
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
  const profile = savedProfile; 

  const username =profile?.namaLengkap || user?.name || user?.email?.split("@")[0] || "Pengguna";

  const profileImage = user?.fotoProfil || savedProfile?.fotoProfil || "/profile.svg";

  const tanggalSekarang = new Date();
  const bulanList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const tanggalFormat = `${tanggalSekarang.getDate()} ${
    bulanList[tanggalSekarang.getMonth()]
  } ${tanggalSekarang.getFullYear()}`;

  const handleStarClick = (index) => setRating(index);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const readFileAsBase64 = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

    const base64Images = await Promise.all(
      files.map(async (file) => await readFileAsBase64(file))
    );

    setPreviewImages((prev) => [...prev, ...base64Images]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Silakan beri rating terlebih dahulu!");
      return;
    }
    if (!ulasan.trim()) {
      alert("Silakan tulis ulasan Anda terlebih dahulu!");
      return;
    }
    
    const ulasanData = {
      paketId: Number(paketId), 
      id: Date.now(),
      slug, 
      aktivitasId: state.aktivitasId,
      tanggalBerangkat,
      username,
      profileImage,
      rating,
      text: ulasan,
      images: previewImages,
      title,
      imageSrc,
      kategori,
      date: tanggalFormat,
    };

    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    existingReviews.push(ulasanData);
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    const existingAlbum = JSON.parse(localStorage.getItem("album")) || [];
    const newAlbumItems = previewImages.map((img) => ({
      imageSrc: img,
      description: `Foto dari ulasan tentang ${trip?.title || "trip saya"}`,
    }));
    localStorage.setItem("album", JSON.stringify([...existingAlbum, ...newAlbumItems]));

    alert("Ulasan berhasil dikirim!");
    navigate("/review-rating", { state: { newReview: ulasanData } });

    setUlasan("");
    setRating(0);
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  return (
    <div className="w-[1046px] min-h-[890px] relative bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden p-10 mx-auto mt-8 mb-8">
      <h2 className="text-center text-2xl font-semibold text-black mb-8">
        Bagikan Pengalaman kamu di {title || "Lovina"} Kepada Mereka
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

        <div>
          <label className="text-base font-bold text-black/60">
            Tambahkan Foto atau Video Anda
          </label>
          <div className="flex items-center justify-center w-full mt-2">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-blue-700 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaRegImage className="text-4xl text-blue-600 mb-2" />
                <p className="text-lg text-gray-500 mb-2">
                  Klik untuk menambahkan beberapa foto atau video
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>

          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {previewImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center justify-center h-12 w-full sm:w-auto px-6 py-3.5 bg-blue-700 rounded-lg text-white text-lg font-extrabold self-center hover:bg-blue-800 transition"
        >
          Bagikan Cerita Anda
        </button>
      </form>
    </div>
  );
};

export default TambahUlasan;