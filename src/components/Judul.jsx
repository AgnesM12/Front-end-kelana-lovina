import React from 'react';

const Judul = ({ header }) => {
    return (
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug tracking-wide">
            {header.title}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
            {header.description}
        </p>
        </div>
    );
};

export default Judul;