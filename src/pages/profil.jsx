import React from 'react';
function Profil() {
    return(
    <div className="w-[1200px] p-6 m-auto  bg-white rounded-[30px] shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex items-center justify-center gap-14 my-16">
        <img 
            className="w-48 h-48 rounded-full object-cover" 
            src="/profile.svg"
            alt="Profil Clara Anindya"
        />
        <div className="w-[880px] h-48 flex justify-between items-start">
        <div className="flex flex-col justify-start items-start">
            <h2 className="text-4xl font-bold text-zinc-800">
                Clara Anindya
            </h2>
            <p className="text-2xl font-semibold text-zinc-800 mt-2">
                Wisatawan
            </p>
            <p className="text-base text-black mt-6">
                Traveling buatku bukan sekadar liburan, tapi cara ngumpulin cerita & kenangan baru
            </p>
        </div>
        <button className="bg-blue-600 text-white text-lg font-extraboldbold px-6 py-3.5 rounded-lg hover:bg-blue-700 transition-colors">
            Edit Profil
        </button>
    </div>
    </div>
    );
};
export default Profil;
