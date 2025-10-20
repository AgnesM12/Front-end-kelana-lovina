import React from 'react';

const Judul = ({ header }) => {
    return (
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
            {header.title}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
            {header.description}
        </p>
        </div>
    );
};

export default Judul;