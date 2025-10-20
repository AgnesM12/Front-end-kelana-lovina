import React from 'react';

const HeroSection = ({hero}) => (
    <div className="relative w-full max-w-[1200px] aspect-[2.6/1] max-h-[458px] mx-auto">
        <img 
            src={hero.imageSrc} 
            alt={hero.altText} 
            className="absolute inset-0 w-full h-full object-cover rounded-[35px]" 
        />
        <div className="absolute inset-0 bg-black/30 rounded-[35px]" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-semibold">
                {hero.title}
            </h3>
    </div>
);

export default HeroSection;