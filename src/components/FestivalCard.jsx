import React from 'react'

const FestivalCard = ({ event }) => (
  <div className="w-[386px] h-[580px] p-6 flex-shrink-0 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col items-center transition-transform duration-300">
    <img
      className="w-[323px] h-[260px] object-cover rounded-xl mt-3"
      src={event.imageSrc}
      alt={event.title}
    />
    <div className="p-5 flex flex-col gap-3 text-center">
      <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
      <p className="text-gray-600 text-[16px] leading-relaxed">
        {event.description}
      </p>
      <button className="mt-6 w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Lihat Event
      </button>
    </div>
  </div>
  );
  export default FestivalCard;