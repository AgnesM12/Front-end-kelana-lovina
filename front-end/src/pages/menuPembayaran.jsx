import React from "react";
import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";



    function MenuPembayaran() {

        const {state: paket} = useLocation();

        //pop up biling info 
        const [isOpen, setIsOpen] = useState(false);
        const open = () => setIsOpen(true);
        const close = () => setIsOpen(false);

        //pop up kode pembayaran
        const [isOpenNested, setIsOpenNested] = useState(false);
        const openNested = () => setIsOpenNested(true);
        const closeNested = () => setIsOpenNested(false);

        const cardContainerStyle={
            display: "flex",   
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "1200px",   
            margin: "0 auto",  
            gap: '24px'
        };

        const cardPengunjungStyle={
            width: '690px', 
            height: '897px', 
            boxShadow: '0 4px 12px rgba(0, 94, 209, 0.3)',
            borderRadius: '30px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            textAlign: "left",
            alignItems: 'flex-start',
            justifyContent: 'flex-start', 
            padding: '30px', 
            margin: '20px 0px',
        };

        const cardPesananStyle={
            width: '486px',
            height: '897px', 
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0, 94, 209, 0.3)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            textAlign: "left",
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', //teks rata kiri
            padding: '30px', 
            margin: '20px 0px',
        };

        const imageStyle ={
            width: '419px', 
            height: '302px', 
            objectFit : 'cover', 
            borderRadius : '15px',
            justifyContent: 'center',   
        };
        
        const buttonStyle ={
            width: '300px',
            height: '50px',
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '18px',
            borderRadius: '8px', 
            margin: '30px auto 10px auto', 
            display: 'flex', 
            alignItems: 'center',
            textAlign: 'center',
          };

        return(   
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '50px', gap: '24px'}}>
                    <h2><b></b></h2>
                    <h2 style={{width: '780px'}}><b>Detail Pelanggan</b></h2>
                    <h2 style={{width: '400px'}}><b>Detail Pesanan</b></h2>
                </div>

                {/* card detail pengunjung */}
                <div style={cardContainerStyle}>
                    <div style={cardPengunjungStyle} gap> 
                        <div style={{lineHeight: '50px'}}>
                        <form>
                            <div className="space-y-12 lineheight-20">
                                <div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-12">
                                        <label htmlFor="username" className="block text-3xl font-medium text-gray-900 font-size-52">Nama Pengguna</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-2 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:outline-3 focus-within:-outline-offset-3 focus-within:outline-blue-00">
                                                <input id="username" type="text" name="username" placeholder="Masukan nama lengkap Anda" className="block w-screen bg-white py-1.5 pr-3 pl-1 text-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12">
                                        <label htmlFor="identitas" className="block text-3xl font-medium text-gray-900 font-size-52">Identitas</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-2 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:outline-3 focus-within:-outline-offset-3 focus-within:outline-blue-00">
                                                <input id="identitas" type="text" name="identitas" placeholder="Nomor KTP Anda" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12">
                                        <label htmlFor="jumlahOrang" className="block text-3xl font-medium text-gray-900 font-size-52">Jumlah Orang</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-2 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:outline-3 focus-within:-outline-offset-3 focus-within:outline-blue-00">
                                                <input id="jumlahOrang" type="number" name="jumlahOrang" placeholder="Contoh: 5 orang" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12">
                                        <label htmlFor="nomorTelpon" className="block text-3xl font-medium text-gray-900 font-size-52">Nomor Telepon</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-2 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:outline-3 focus-within:-outline-offset-3 focus-within:outline-blue-00">
                                                <input id="nomorTelpon" type="text" name="nomorTelpon" placeholder="Masukan nomor aktif Anda" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-12">
                                        <label htmlFor="tanggalBerangkat" className="block text-3xl font-medium text-gray-900 font-size-52">Tanggal Keberangkatan</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-2 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:outline-3 focus-within:-outline-offset-3 focus-within:outline-blue-00">
                                                <input id="tanggalBerangkat" type="date" name="tanggalBeranglkat" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    
                    {/* Card detail pesanan */}
                    <div style={cardPesananStyle}>
                        <img src={paket.gambar} alt="" style={imageStyle}/> <br/>
                        <h1><b>{paket.nama}</b></h1>
                        <p style={{fontSize: '20px', color: '#878787'}}>{paket.desk}</p> <br/>
                        <div style={{lineHeight: '20px'}}>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>   
                            <p>Tiket</p>
                            <p>Jumlah</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '24px'}}><b> {paket.nama} </b></p>
                            <p style={{fontSize: '24px'}}>x1</p>
                        </div>
                        <p style={{fontSize: '24px'}}><b>{paket.harga}</b></p>
                        <p style={{color: '#B3B3B3'}}>-----------------------------------------------------------------</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}>Total</p>
                            <p style={{fontSize: '24px'}}>{paket.harga}</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}>Biaya Layanan</p>
                            <p style={{fontSize: '24px'}}>Rp. 10.000</p>
                        </div>
                        <p style={{color: '#B3B3B3'}}>-----------------------------------------------------------------</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '24px'}}>Total</p>
                            <p style={{fontSize: '24px'}}><b>Rp. 190.000</b></p>
                        </div>
                        </div>
                    </div>

                    <div>
                        <button  onClick={() => setIsOpen(true)} style={buttonStyle} className="flex justify-center flex-items bg-blue-700 text-white font-bold"> Bayar </button>
                    </div>

                    {/* pop up biling info */}
                    <div className="mt-20 p-6">
                    <Dialog open={isOpen} onClose={close} className="relative z-50">
                        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <DialogPanel className="bg-blue-600 rounded-2xl w-full max-w-lg mx-auto">
                            
                            <div className="p-3 bg-white rounded-t-2xl tracking-normal">
                                <DialogTitle className="text-lg font-medium text-gray-900">Info Pembayaran</DialogTitle>
                                <p className="mt-2 text-gray-600">Paket Wisata</p>
                            </div>

                            <div className="flex items-center bg-blue-600 p-3">
                                <div className="flex items-center bg-white rounded-xl p-2 shadow-md w-full inset-shadow-sm">
                                <img src={paket.gambar} className="h-28 w-28 rounded-sm" alt="" />
                                <div className="ml-5">
                                    <h4 className="font-bold">{paket.nama}</h4>
                                    <p className="text-sm text-gray-400">{paket.desk}</p>
                                    <p className="text-sm text-gray-500">{paket.lokasi}</p>
                                </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white text-gray-800">
                                <p className="text-center font-bold text-xl mb-1">Kamis, 17 September 2025</p>
                                <p className="text-center text-gray-400">-----------------------------------------------------------------</p>
                                <div className="flex justify-between text-base">
                                    <p>Total</p>
                                    <p>{paket.harga}</p>
                                </div>

                                <div className="flex justify-between text-base">
                                    <p>Biaya Layanan</p>
                                    <p>Rp. 10.000</p>
                            </div>

                            
                            <div className="border-2 border-gray-300 rounded-lg p-3 w-4/5 mx-auto">
                                <p className="font-semibold text-left mb-3">Pilih metode pembayaran</p>
                                <div className="flex justify-center items-start gap-6">
                                    <div className="flex flex-col ">
                                        <div className="flex items-center gap-3">
                                            <img src="/src/assets/BCA.png" alt="logo BCA" className="h-3 w-10 items-center"/>
                                            <p>BCA</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img src="/src/assets/BNI.png" alt="logo BNI" className="h-3 w-10"/>
                                            <p>BNI</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <img src="/src/assets/Mandiri.png" alt="logo Mandiri" className="h-4 w-12" />
                                            <p>Mandiri</p>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-300 self-stretch"></div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3">
                                            <img src="/src/assets/OVO.png" alt="logo OVO" className="h-4 w-12"/>
                                            <p>Ovo</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <img src="/src/assets/Dana.png" alt="logo dana" className="h-4 w-12"/>
                                            <p>Dana</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3"> 
                                            <img src="/src/assets/Gopay.png" alt="logo dana" className="h-4 w-12"/>
                                            <p>Gopay</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
                                <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col" style={{lineHeight: '1px'}}>
                                    <p className="font-bold">Total</p>
                                    <p className="font-bold text-3xl">Rp. 190.000</p>

                                </div>
                                    <button onClick={(openNested)} className="bg-blue-700 text-white py-3 w-48 h-25 hover:bg-blue-800 transition-colors" style={{borderRadius: '8px', fontWeight:'bold', fontSize: '18px'}}>Bayar</button>
                                </div>

                            </div>
                            </DialogPanel>
                        </div>
                        </Dialog>
                    </div>

                     {/* pop up kode pembayaran */}
                     <div className="p-6">
                        <Dialog open={isOpenNested} onClose={closeNested} className="relative z-51">
                        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <DialogPanel className="bg-blue-600 rounded-2xl w-full max-w-lg mx-auto">
                            
                            <div className="p-3 bg-white rounded-t-2xl tracking-normal">
                                <DialogTitle className="text-lg font-medium text-gray-900">Rp. 190.000</DialogTitle>
                                <p className="mt-2 text-gray-600">Kode transaksi #648274898402</p>
                            </div>

                            <div className="flex items-center justify-center bg-blue-600 gap-10">
                                <p className="text-white text-center">Waktu Tersisa</p>
                                <p className="text-white text-center"> 00:15:00</p>
                            </div>

                            
                            <div className="p-3 bg-white">
                                <div className="flex justify-end-safe">
                                    <img src="/src/assets/gopay.png" alt="logo gopay" className="h-10"/>
                                </div>
                                <div className="flex justify-center">
                                    <img src="/src/assets/qrcode.png" alt="QR Code" className="w-90"/>
                                </div>
                            </div>
                      
                            <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
                                <div className="flex justify-center">
                                    <button onClick={() => setIsOpenNested(false)} className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl w-48" style={{borderRadius: '8px'}}>Unduh QRIS</button>
                                </div>

                                <div className="flex justify-center mt-3">
                                    <button onClick={() => setIsOpenNested(false)} className="bg-blue-700 text-white font-semibold text-2xl px-6 py-3 rounded-md w-48" style={{borderRadius: '8px'}}>Cek status</button>
                                </div>
                            </div>
                            </DialogPanel>
                        </div>
                        </Dialog>
                    </div>

                </div>
            </div> 
        );
    };

export default MenuPembayaran;

