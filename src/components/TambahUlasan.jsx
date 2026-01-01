import React, { useState } from "react";
import { FaStar, FaRegStar, FaRegImage } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addItem } from "../Utilis/indexedDB";

const TambahUlasan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { slug } = useParams();

  const { paketId, title, imageSrc, kategori, tanggalBerangkat } = state || {};
  const trip = state?.trip;

  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const maxKarakter = 350;

  const user = useSelector((state) => state.auth?.user);
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
  const username =
    savedProfile?.namaLengkap ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Pengguna";

  const tanggalSekarang = new Date();
  const bulanList = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];
  const tanggalFormat = `${tanggalSekarang.getDate()} ${
    bulanList[tanggalSekarang.getMonth()]
  } ${tanggalSekarang.getFullYear()}`;

  const handleStarClick = (index) => setRating(index);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages((prev) => [...prev, ...files]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!rating) return alert("Silakan beri rating terlebih dahulu!");
  if (!ulasan.trim()) return alert("Silakan tulis ulasan Anda terlebih dahulu!");

  const ulasanId = Date.now();
  const imageIds = [];

  try {
    for (let i = 0; i < previewImages.length; i++) {
      const file = previewImages[i];
      if (file instanceof File || file instanceof Blob) {
        const imageId = ulasanId + i;
        imageIds.push(imageId);

        await addItem("album", {
          id: imageId,
          reviewId: ulasanId,
          imageFile: file,
          description: `Foto dari ulasan tentang ${title || "trip saya"}`,
        });
      }
    }

    const ulasanData = {
      paketId: Number(paketId),
      id: ulasanId,
      slug: state?.slug || slug,
      aktivitasId: state?.aktivitasId,
      tanggalBerangkat,
      username,
      rating,
      text: ulasan,
      title,
      imageSrc,
      kategori,
      tanggal: tanggalFormat,
      likes: 0,
      imageIds,
    };

    await addItem("reviews", ulasanData);

    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    localStorage.setItem("reviews", JSON.stringify([...existingReviews, ulasanData]));
    window.dispatchEvent(new Event("reviewsUpdated"));

    alert("Ulasan berhasil dikirim!");
    navigate("/review-rating");

    setUlasan("");
    setRating(0);
    setPreviewImages([]);
  } catch (err) {
    console.error("Gagal menyimpan ulasan:", err);
    alert("Terjadi kesalahan saat menyimpan ulasan.");
  }
};


  return (
    <div className="w-[1046px] min-h-[890px] bg-white rounded-[30px] shadow-[0px_6px_40px_rgba(0,94,209,0.16)] p-10 mx-auto my-8">
      <h2 className="text-center text-2xl font-semibold mb-8">
        Bagikan Pengalaman kamu di {title || "Lovina"} Kepada Mereka
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* RATING */}
        <div>
          <label className="font-bold text-black/60">
            Seberapa Memuaskan Pengalaman Anda?
          </label>
          <div className="flex gap-2 mt-3">
            {[1,2,3,4,5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleStarClick(i)}
                className="text-3xl text-yellow-400"
              >
                {i <= rating ? <FaStar /> : <FaRegStar />}
              </button>
            ))}
          </div>
        </div>

        {/* ULASAN */}
        <div>
          <label className="font-bold text-black/60">Tulis Ulasan</label>
          <textarea
            className="w-full h-36 border-2 border-blue-700 rounded-xl p-4 mt-2"
            placeholder="Ceritakan pengalaman liburanmu..."
            value={ulasan}
            maxLength={maxKarakter}
            onChange={(e) => setUlasan(e.target.value)}
          />
          <div className="text-right text-xs text-gray-600">
            {ulasan.length}/{maxKarakter}
          </div>
        </div>

        {/* UPLOAD */}
        <div>
          <label className="font-bold text-black/60">
            Tambahkan Foto atau Video
          </label>

          <label className="flex flex-col items-center justify-center h-52 border-2 border-blue-700 rounded-lg cursor-pointer bg-gray-50 mt-2">
            <FaRegImage className="text-4xl text-blue-600 mb-2" />
            <p className="text-gray-500">
              Klik untuk menambahkan beberapa foto atau video
            </p>
            <input
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </label>

          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {previewImages.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="self-center bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800"
        >
          Bagikan Cerita Anda
        </button>
      </form>
    </div>
  );
};

export default TambahUlasan;