import React from 'react';


const GaleriGrid = ({ images }) => {
    return (
        <div className="flex flex-col gap-4 items-center">
        {/* Baris 1 */}
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]">
            <div className="w-full lg:w-[40%] h-[306px] overflow-hidden ">
            <img 
                src={images[0].src} 
                alt={images[0].alt} 
                className="w-full h-full object-cover rounded-2xl" 
            />
            </div>
            <div className="w-full lg:w-[60%] h-[306px] overflow-hidden">
            <img 
                src={images[1].src} 
                alt={images[1].alt} 
                className="w-full h-full object-cover rounded-2xl" 
            />
            </div>
        </div>

        {/* Baris 2 */}
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[1191px]">
            <div className="w-full lg:w-[60%] h-[306px] overflow-hidden">
            <img 
                src={images[2].src} 
                alt={images[2].alt} 
                className="w-full h-full object-cover rounded-2xl" 
            />
            </div>
            <div className="w-full lg:w-[40%] h-[306px] overflow-hidden ">
            <img 
                src={images[3].src} 
                alt={images[3].alt} 
                className="w-full h-full object-cover rounded-2xl" 
            />
            </div>
        </div>
        </div>
    );
};

export default GaleriGrid;