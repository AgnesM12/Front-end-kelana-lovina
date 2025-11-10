import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";


    function DetailTiketSaya() {

        const navigate = useNavigate();
        const {state} = useLocation(); 
        const { paket, data } = state || {}; 

        const buttonStyle = {
            width: '200px', 
            height: '50px',
            BorderRadius: '8px', 
        }

        return(
            <div>
                <div className="flex min-h-screen flex-col justify-center items-center">
                    <p className="flex justify-center text-3xl font-bold py-5">Tiket Anda</p>

                    {/* Tampilan HTML di layar */}
                    <div className="flex flex-col justify-center bg-white shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] rounded-2xl max-w-4xl px-8 py-3">
                        <img src="/barcode.png" alt="barcode tiket"/>
                        <p className="flex justify-start text-3xl font-bold mt-5">{paket.title}</p>
                        <p className="flex justify-start text-lg font-bold mt-5">{data.fullName}</p>

                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-gray-300 mt-5">Tanggal Keberangkatan</p>
                            <p className="text-lg font-semibold mt-3">{data.tanggalBerangkat}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-300 mt-5">Waktu Keberangkatan</p>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold mt-2">{paket.departurTime}</p>
                                <p className="text-lg font-semibold mt-2">
                                    Rp.{(((data?.jumlahOrang || 0) * parseInt(paket?.price?.replace(/\D/g, "") || '0')) + 10000).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        <p>----------------------------------------------------------------------------------------------------------------------------------</p>

                        <div className="flex justify-between">  
                            <p>KL001170425-001</p>
                            <p className="text-lg font-semibold"> {data?.jumlahOrang} orang</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center p-10 gap-5"> 
                    <button onClick={() => navigate('/destinasi')} style={buttonStyle} className="bg-[#005ED1] text-white font-semibold rounded-lg"> Kembali </button>
                </div>
            </div>
        );
    }

    export default DetailTiketSaya;