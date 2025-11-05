import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, X, Copy} from "lucide-react";

function RencanaCard({ pkg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const detailsRef = useRef(null);

  const journeyId = pkg.id || '123';
  const titleSlug = (pkg.title || 'rencana-baru')
    .toLowerCase()                   
    .replace(/\s+/g, '-')            
    .replace(/[^a-z0-9-]/g, ''); 
  const shareUrl = `https://example.com/perjalanan/${journeyId}-${titleSlug}`;
  const shareText = `Cek rencana perjalanan saya: ${pkg.title}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialLinks = [
    {
      name: "Instagram",
      iconSrc: "/instagram.svg",
      href: "https://www.instagram.com",
    },
    {
      name: "Facebook",
      iconSrc: "/facebook.svg",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      iconSrc: "/whatsapp.svg",
      href: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`,
    },
  ];

  const handleShareClick = () => {
    setIsModalOpen(true);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsCopied(false);
    }
  }, [isModalOpen]);

  return (
    <>
    <div className="bg-white rounded-[5px] shadow-[0_6px_20px_rgba(0,0,0,0.1)] p-8 relative">
      {/* Titik tiga */}
      <div className="absolute top-2 right-4">
        <details className="relative">
          <summary className="list-none cursor-pointer">
            <MoreHorizontal className="text-blue-700 w-5 h-5" />
          </summary>
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-72 z-10">
            <button 
            onClick={handleShareClick}
            className="block w-full text-left p-2.5 hover:bg-blue-100 hover:rounded-[5px] text-base">
              Bagikan Rencana Perjalanan
            </button>
            <button className="block w-full text-left p-2.5 hover:bg-blue-100 hover:rounded-[5px] text-base">
              Unduh Rencana Perjalanan
            </button>
            <button
              onClick={pkg.onDelete}
              className="block w-full text-left p-2.5 hover:bg-red-100 hover:rounded-[5px] text-base text-red-600"
            >
              Hapus
            </button>
          </div>
        </details>
      </div>

      {/* Isi card */}
      <img
        src={pkg.imageSrc}
        alt={pkg.title}
        className="w-full aspect-video object-cover rounded-lg mb-4"
      />
    <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center">
        <h3 className="font-bold text-black-800 text-xl">{pkg.title}</h3>
        <p className="font-bold text-base text-black/80">{pkg.price}</p>
      </div>
    </div>

      {/* Baris 3: Lokasi & button */}
      <div className="flex justify-between items-end mt-2">
      <p className="text-base text-black-500">
        {pkg.date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
        <p className="text-base text-black-500">{pkg.description}</p>
      </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg  tetx-lg font-bold shrink-0 ml-2 gapl-2.5">
          Pesan Sekarang
        </button>
      </div>
    </div>

    {isModalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div
          className=" w-full bg-white rounded-[20px] shadow-xl max-w-sm p-8 relative mx-4"
          onClick={(e) => e.stopPropagation()}>
        
          {/* Tombol Tutup (X) */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-3 right-4 text-blue-600"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <h2 className="text-center text-2xl font-base text-black mb-6">
            Bagikan Rencana Perjalanan
          </h2>

          {/* Ikon Social Media */}
          <div className="flex justify-around mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-700 hover:text-black transition-colors"
              >
                <img src={link.iconSrc} alt={link.name} className="w-10 h-10" />
                <span className="text-xs">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Salin Link */}
          <div className="flex items-center shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] bg-white rounded-md p-3">
            <span className="text-sm text-zinc-800 truncate flex-1 mr-2">
              {shareUrl}
            </span>
            <button
              onClick={handleCopy}
              className="text-black shrink-0"
              title="Salin link"
            >
      <Copy
        size={20}
        className={
          isCopied
            ? "text-blue-600" 
            : "hover:text-zinc-800"
        }
      />
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default RencanaCard;
