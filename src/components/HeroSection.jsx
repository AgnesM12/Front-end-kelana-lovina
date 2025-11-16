import React from 'react';

const HeroSection = ({hero}) => (
    <div className="relative w-full max-w-[1200px] aspect-[2.6/1] max-h-[458px] mx-auto px-4 sm:px-6 md:px-8 ">
        <img 
            src={hero.imageSrc} 
            alt={hero.altText} 
            className="absolute inset-0 w-full h-full object-cover  rounded-[25px] sm:rounded-[30px] md:rounded-[35px]" 
        />
        <div className="absolute inset-0 bg-black/30 rounded-[25px] sm:rounded-[30px] md:rounded-[35px]" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                    px-2 sm:px-4">
                {hero.title}
            </h3>
    </div>
);

export default HeroSection;