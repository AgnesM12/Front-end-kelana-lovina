import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FilterUlasan = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    rating: "",
    waktu: "",
    kategori: "",
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
        if (filters.waktu === "terlama") return "Terlama";
        break;
      case "kategori": {
        const mapping = {
          morning: "Morning Tour",
          snorkeling: "Snorkeling",
          sunrise: "Sunrise Tour",
          watching: "Watching",
          swim: "Swim",
          cruise: "Private",
        };
        if (filters.kategori) return mapping[filters.kategori];
        break;
      }
      default:
        break;
    }
    return defaultLabel;
  };

  return (
    <section className="w-[970px] mx-auto mt-12 mb-10">
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-left">
        Kisah yang telah tertulis
      </h2>

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-6">
          {/* RATING */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rating")}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full flex items-center justify-between gap-1 min-w-[140px]"
            >
              {openDropdown === "rating" ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
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
          {/* WAKTU */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("waktu")}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full flex items-center justify-between gap-1 min-w-[140px]"
            >
              {openDropdown === "waktu" ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
              <span>{getLabel("waktu", "Waktu")}</span>
            </button>
            {openDropdown === "waktu" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl overflow-hidden w-full">
                <div
                  onClick={() => handleChange("waktu", "terbaru")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                >
                  Terbaru
                </div>
                <div
                  onClick={() => handleChange("waktu", "terlama")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                >
                  Terlama
                </div>
              </div>
            )}
          </div>
          {/* KATEGORI */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("kategori")}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full flex items-center justify-between gap-2 min-w-[160px]"
            >
              {openDropdown === "kategori" ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
              <span>{getLabel("kategori", "Kategori")}</span>
            </button>
            {openDropdown === "kategori" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl overflow-hidden w-full max-h-60 overflow-y-auto">
                {[
                  ["morning", "Morning Tour"],
                  ["snorkeling", "Snorkeling"],
                  ["sunrise", "Sunrise Tour"],
                  ["watching", "Watching"],
                  ["swim", "Swim"],
                  ["cruise", "Private"],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    onClick={() => handleChange("kategori", value)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* CARI ULASAN */}
        <div className="flex items-center bg-blue-600 rounded-full px-4 py-2 w-96 ml-8">
          <Search className="text-white w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Cari Ulasan"
            onChange={(e) => handleChange("search", e.target.value)}
            className="bg-transparent text-white placeholder-white/80 font-semibold w-full focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default FilterUlasan;
