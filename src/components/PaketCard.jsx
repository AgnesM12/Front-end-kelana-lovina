import React from 'react' 
import { HiStar } from 'react-icons/hi';
import { Link } from "react-router-dom";


const PaketCard = ({ paket }) => {
    const slug = paket.title.toLowerCase().replace(/\s+/g, "-");

    return (
    <div className=" w-[385px] h-[597px] p-6 flex-shrink-0 bg-white rounded-2xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] overflow-hidden flex flex-col items-center justify-center transition-transform duration-300">
        <img className="w-[323px] h-[300px] mt-6 object-cover object-center rounded-xl" src={paket.imageSrc} alt={paket.title} />
        <div className="p-5 flex flex-col gap-3">
            <h3 className="text-2xl font-bold object-center text-gray-900">{paket.title}</h3>
            <p className="text-xl text-gray-600">{paket.description}</p>
            <div className="flex justify-between items-center mt-2">
                <p className="text-xl font-bold text-black">{paket.price}</p>
                <div className="flex items-center gap-1 text-base text-gray-500">
                    <HiStar className="h-5 w-5 text-yellow-400" />
                    <span className="text-zinc-500 text-base font-medium">{paket.rating}</span>
                    <span className='text-zinc-500 text-base font-medium'>({paket.reviews})</span>
                </div>
            </div>
            <Link to={`/paket/${slug}`} >
            <button className="mt-6 w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors">Lihat paket</button>
            </Link>
        </div>
    </div>
    )
};
export default PaketCard;

