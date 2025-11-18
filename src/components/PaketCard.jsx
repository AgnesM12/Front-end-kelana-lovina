import React from 'react' 
import { HiStar } from 'react-icons/hi';
import { Link } from "react-router-dom";


const PaketCard = ({ paket }) => {
    const slug = paket.title.toLowerCase().replace(/\s+/g, "-");

    return (
    <div className="w-[220px] sm:w-[290px] md:w-[360px] lg:w-[385px] h-auto p-3 sm:p-5 lg:p-6 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col items-center justify-center transition-transform duration-300">
        <img className="w-full aspect-[1.2/1] object-cover object-center rounded-xl" src={paket.imageSrc} alt={paket.title} />
        <div className="p-2.5 sm:p-5 flex flex-col gap-3  sm:text-left">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold object-center text-gray-900">{paket.title}</h3>
            <p className="text-base sm:text-base md:text-lg text-gray-600 line-clamp-3">{paket.description}</p>
            <div className="flex flex-row justify-between sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                <p className="text-base sm:text-xl font-bold text-black">{paket.price}</p>
                <div className="flex items-center justify-center sm:justify-end gap-1 text-gray-500">
                    <HiStar className="h-5 w-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-zinc-500 text-sm sm:text-lg md:text-xl font-medium">{paket.rating}</span>
                    <span className='text-zinc-500 text-sm sm:text-lg md:text-xl font-medium'>({paket.reviews})</span>
                </div>
            </div>
            <Link to={`/paket/${slug}`} >
            <button className="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-3 md:py-2.5 md:px-4 rounded-lg hover:bg-blue-700 transition-colors">Lihat paket</button>
            </Link>
        </div>
    </div>
    )
};
export default PaketCard;

