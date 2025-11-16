import React from 'react';


const GaleriGrid = ({ images }) => {
    return (
        <div className="flex flex-col gap-4 items-center w-full px-4">
        {/* Baris 1 */}
        <div className="flex w-full max-w-[1191px] gap-4">
            <div className="w-[40%] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[306px] overflow-hidden rounded-2xl">
            <img 
                src={images[0].src} 
                alt={images[0].alt} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl" 
            />
            </div>
            <div className="w-[60%] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[306px] overflow-hidden rounded-2xl">
            <img 
                src={images[1].src} 
                alt={images[1].alt} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl" 
            />
            </div>
        </div>
        {/* Baris 2 */}
        <div className="flex w-full max-w-[1191px] gap-4">
            <div className="w-[60%] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[306px] overflow-hidden rounded-2xl">
            <img 
                src={images[2].src} 
                alt={images[2].alt} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl" 
            />
            </div>
            <div className="w-[40%] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[306px] overflow-hidden rounded-2xl">
            <img 
                src={images[3].src} 
                alt={images[3].alt} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl" 
            />
            </div>
        </div>
        </div>
    );
};

export default GaleriGrid;