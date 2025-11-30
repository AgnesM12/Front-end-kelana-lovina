import React, { useState, useEffect } from "react";
import { Calendar, Plus, ChevronUp, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const paketData = [
    { id: 1, imageSrc: "/paket-rafatour-dolphine-snorkling.png", title: "Rafatour dolphin & snorkeling", price: "Rp. 300.000" },
    { id: 2, imageSrc: "/paket-seadolphine-lovina.png", title: "Seadolphine Lovina", price: "Rp. 350.000" },
    { id: 3, imageSrc: "/paket-watching-dolphine-only.png", title: "Watching Dolphin Only", price: "Rp. 100.000" },
    { id: 4, imageSrc: "/paket-snorkling-tur.png", title: "Snorkeling & Dolphin Tur", price: "Rp. 350.000" },
    { id: 5, imageSrc: "/dolphinWatchingTour.jpg", title: "Dolphin Watching Tur", price: "Rp. 200.000" },
    { id: 6, imageSrc: "/swimWithDolphin.jpg", title: "Swim with Dolphin", price: "Rp. 200.000" },
    { id: 7, imageSrc: "/privateTourGuide.png", title: "Private Tour Guide", price: "Rp. 400.000" },
    { id: 8, imageSrc: "/paket-snorkeling-lovina.png", title: "Snorkeling Lovina", price: "Rp. 150.000" },

];

const priceOptions = [
  {value: "all", label: "Semua Harga"},
  {value: "150to200", label: "Di bawah Rp.200.000"},
  {value: "above200", label: "Di atas Rp.200.000"}
]

function RencanaPerjalanan({ onAddPackage }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [filteredPackages, setFilteredPackages] = useState(paketData);
    const [selectedPackage, setSelectedPackage] = useState(paketData[0].title);

    const [openDropdown, setOpenDropdown] = useState(null);
    const parsePrice = (priceStr) => parseInt(priceStr.replace(/\D/g, ""), 10);

useEffect(() => {
    const filterPackagesByPrice = () => {
        if (selectedPriceRange === "150to200") {
            return paketData.filter((p) => {
                const price = parsePrice(p.price);
                return price >= 150000 && price <= 180000;
            });
        } else if (selectedPriceRange === "above200") {
            return paketData.filter((p) => parsePrice(p.price) > 180000);
        }
        return paketData;
    };
    
    const filtered = filterPackagesByPrice();

    setFilteredPackages(filtered); 
    if (filtered.length > 0) {
        setSelectedPackage(filtered[0].title);
    } else {
        setSelectedPackage("Tidak ada paket");
    }
}, [selectedPriceRange]);    

const handleAddClick = () => {
    const paket = paketData.find((p) => p.title === selectedPackage);

    onAddPackage({
        id: Date.now(),
        imageSrc: paket ? paket.imageSrc : "/default.png",
        title: selectedPackage,
        date: selectedDate,
        description: "Kabupaten Buleleng, Bali Utara",
        price: paket ? paket.price : "Tidak ada paket",
    });
};

const toggleDropdown = (key) => {
  setOpenDropdown(openDropdown === key ? null : key);
}

const handelPriceSelect = (value) => {
  setSelectedPriceRange(value);
  setOpenDropdown(null);
}

const handlePackageSelect = (title) => {
  setSelectedPackage(title);
  setOpenDropdown(null);
}

const getPriceLabel = () => {
  const selected = priceOptions.find(opt => opt.value === selectedPriceRange);
  return selected ? selected.label : "Semua Harga"
}

  return (
    <div className="bg-white shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] rounded-2xl flex flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6 px-3 sm:px-6 lg:px-10 py-3 sm:py-4 mt-[-30px] sm:mt-[-40px] mx-auto w-[95%] sm:w-[90%] lg:w-[80%] relative z-10">
      {/* Pilih tanggal */}
      <div className="flex flex-col flex-1 min-w-[140px]">
        <span className="text-primary font-semibold text-sm sm:text-base">Tanggal</span>
        <div className="flex items-center justify-between mt-1 border-b-2 border-primary pb-1">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMMM yyyy"
            className="bg-transparent outline-none text-gray-700 text-sm sm:text-base"
          />
          <Calendar
            className="text-primary w-5 h-5 cursor-pointer"
            onClick={() =>
              document.querySelector(".react-datepicker__input-container input")?.focus()
            }
          />
        </div>
      </div>

      {/* Filter harga */}
      <div className="flex flex-col flex-1 min-w-[120px] relative z-20">
        <span className="text-primary font-semibold text-sm sm:text-base">Biaya</span>
        <button
          onClick={() => toggleDropdown('price')}
          className=" flex items-center justify-between mt-1 border-b-2 border-primary pb-1 bg-white text-gray-700 outline-none text-sm sm:text-base"
        >
          <span className="truncate"> {getPriceLabel()} </span>
          {openDropdown === "price" ? (
            <ChevronUp className="w-6 h-6 text-zinc-600 ml-2" />
          ) : (
            <ChevronDown className="w-6 h-6 text-zinc-600 ml-2" />
          )}
        </button>
        {openDropdown === "price" && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {priceOptions.map((option) => (
              <div 
              key={option.value}
              onClick={()=> handelPriceSelect(option.value)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-700 text-sm sm:text-base">
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pilihan paket */}
      <div className="flex flex-col flex-1 min-w-[140px] relative z-10">
        <span className="text-primary font-semibold text-sm sm:text-base">Pilihan paket</span>
        <div className="flex items-center justify-between mt-1 border-b-2 border-primary pb-1">
          <button
          onClick={() => toggleDropdown('package')}
          className="flex items-center justify-between bg-white text-gray-700 outline-none w-full text-sm sm:text-base"
          >
            <span className="truncate">{selectedPackage}</span>
            {openDropdown === 'package' ? (
              <ChevronUp className="w-6 h-6 text-zinc-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-zinc-600" />
            )}
          </button>
        </div>
        {openDropdown === 'package' && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((paket) =>(
                <div
                key={paket.id}
                onClick={() => handlePackageSelect(paket.title)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-700 text-sm sm:text-base"
                >
                  {paket.title}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 italic text-sm sm:text-base">Tidak ada paket tersedia</div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-none h-[56px]">
      <Plus
            className="text-primary w-8 h-8 cursor-pointer"
            onClick={handleAddClick}
          />
      </div>
    </div>
  );
}

export default RencanaPerjalanan;
