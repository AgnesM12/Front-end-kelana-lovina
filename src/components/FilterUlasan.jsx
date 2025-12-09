import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FilterUlasan = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    rating: "",
    waktu: "",
    search: "",
  });

  const [openDropdown, setOpenDropdown] = useState("");

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange && onFilterChange(updated);
    setOpenDropdown("");
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? "" : key);
  };

  const getLabel = (key, defaultLabel) => {
    switch (key) {
      case "rating":
        if (filters.rating) return `Bintang ${filters.rating}`;
        break;
      case "waktu":
        if (filters.waktu === "terbaru") return "Terbaru";
        break;
      default:
        break;
    }
    return defaultLabel;
  };

  return (
    <section className="w-[970px] mx-auto mt-12 mb-10 relative overflow-visible">
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-left">
        Kisah yang telah tertulis
      </h2>

      <div className="flex items-center gap-4 flex-nowrap w-full overflow-visible">
        <div className="flex items-center gap-4 sm:gap-4 md:gap-6 flex-shrink-0 overflow-visible">
          {/* rating */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => toggleDropdown("rating")}
              className="bg-blue-600 text-white font-semibold text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full flex items-center justify-between gap-1 min-w-[70px] sm:min-w-[120px] md:min-w-[140px]"
            >
              {openDropdown === "rating" ? (
                <ChevronUp className="w-3 h-3 sm:w-6 sm:h-6" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-6 sm:h-6" />
              )}
              <span>{getLabel("rating", "Rating")}</span>
            </button>
            {openDropdown === "rating" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl overflow-hidden w-full top-full z-50">
                {[5, 4, 3].map((num) => (
                  <div
                    key={num}
                    onClick={() => handleChange("rating", num)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                  >
                    Bintang {num}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* waktu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("waktu")}
              className="bg-blue-600 text-white font-semibold text-xs sm:text-xs md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full flex items-center justify-between gap-1 min-w-[70px] sm:min-w-[120px] md:min-w-[140px]"
            >
              {openDropdown === "waktu" ? (
                <ChevronUp className="w-3 h-3 sm:w-6 sm:h-6" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-6 sm:h-6" />
              )}
              <span>{getLabel("waktu", "Waktu")}</span>
            </button>
            {openDropdown === "waktu" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl overflow-hidden w-full z-50">
                <div
                  onClick={() => handleChange("waktu", "terbaru")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                >
                  Terbaru
                </div>
              </div>
            )}
          </div>
        </div>
        {/* cari ulasan */}
        <div className="flex items-center bg-blue-600 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-36 sm:w-60 md:w-80 lg:w-[29rem] ml-2 sm:ml-4 flex-shrink-0">
          <Search className="text-white w-3 h-3  sm:w-5 sm:h-5 mr-2" />
          <input
            type="text"
            placeholder="Cari Ulasan"
            onChange={(e) => handleChange("search", e.target.value)}
            className="bg-transparent text-white placeholder-white/80 text-xs sm:text-sm md:text-base font-semibold w-full focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default FilterUlasan;
