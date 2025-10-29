import React, { use } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function Tiket(){

    const navigate = useNavigate();

    return(
        <div>
        <div className="flex min-h-screen flex-col justify-center items-center">
            <p className="flex justify-center text-3xl font-bold pt-10 py-4">Tiket</p>
            <div className="flex flex-col justify-center bg-white shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] rounded-2xl max-w-4xl px-8 py-3">
                <img src="/src/assets/barcode.png" alt="barcode tiket"/>
                <p className="flex justify-start text-2xl font-bold"> Sunrise Dolphine</p>
                <p className="flex justify-start text-2xl font-bold">Bayu Raka </p>

                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-gray-300">Tanggal Keberangkatan</p>
                        <p className="text-lg font-semibold">17 September 2025</p>
                    </div>

                <div>
                    <p className="text-sm font-semibold text-gray-300"> Waktu Keberangkatan</p>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">05.00 WITA</p>
                        <p className="text-lg font-semibold">Rp. 190.000</p>
                    </div>
                </div>
            
                <p>----------------------------------------------------------------------------------------------------------------------------------</p>
                
                <div className="flex justify-between">
                    <p>KL001170425-001</p>
                    <p className="text-lg font-semibold">5 Orang</p>
                </div>

            </div>
        </div>

        <div className="flex justify-center p-10 gap-5">   
            <button className="bg-blue-600 w-45 h-13items-center text-white font-semibold" style={{borderRadius: '8px'}}>Unduh tiket</button>
            <button onClick={() => navigate ('/menuPaket')} className="bg-blue-600 w-45 h-13 items-center text-white font-semibold" style={{borderRadius: '8px'}}>Kembali</button>
        </div>

        </div>
        
    );
}

export default Tiket;