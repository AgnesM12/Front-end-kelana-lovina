import React from 'react'
import { useNavigate } from "react-router-dom";



const FestivalCard = ({ event }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    const path =`/acara/${event.title.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(path);
  }; 

  return (
  <div className="w-[320px] sm:w-[320px] md:w-[360px] xl:w-[385px] h-auto p-5 sm:p-6 flex-shrink-0 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col items-center justify-center transition-transform duration-300">
    <img
      className="w-full aspect-[1.2/1] object-cover object-center rounded-xl"
      src={event.imageSrc}
      alt={event.title}
    />
    <div className="p-4 sm:p-5 flex flex-col gap-3 text-center">
      <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900">{event.title}</h3>
      <p className="text-base sm:text-base md:text-lg text-gray-600 line-clamp-3 leading-relaxed">
        {event.description}
      </p>
      <button onClick={handleClick} className="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-3 md:py-2.5 md:px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Lihat Event
      </button>
    </div>
  </div>
  )
  };
  export default FestivalCard;