import React from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { Menu} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/16/solid'
import { useForm } from "react-hook-form"


    function MenuPembayaran() {

        const {state: paket} = useLocation();

        const navigate = useNavigate();

        //menyimpan identitas yang dipilih user
        const [selectedIdentitas, setSelectedIdentitas] = useState("Pilih Identitas");

        //menangani form, validasi dan watch input
        const {register, handleSubmit, watch, formState: {errors} } = useForm();

        //menyimpan form data saat disubmit
        const [formData, setFormData] = useState(null);

        //pop up biling info 
        const [isOpen, setIsOpen] = useState(false);
        const open = () => setIsOpen(true);
        const close = () => setIsOpen(false);

        //pop up kode pembayaran
        const [isOpenNested, setIsOpenNested] = useState(false);
        const openNested = () => setIsOpenNested(true);
        const closeNested = () => setIsOpenNested(false);

        //submit form 
        const onSubmit = (data) => {
            console.log(data);
            setFormData(data);
            setIsOpen(true);
        }

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
            width: '600px', 
            height: '850px', 
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
            // margin: '20px 0px',
        };

        const cardPesananStyle={
            width: '450px',
            height: '850px', 
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
            width: '322px',
            height: '51px',
            backgroundColor: '#005ED1',
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '18px',
            fontWeight: '700',
            borderRadius: '8px', 
            margin: '30px auto 10px auto', 
            display: 'flex', 
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center'
        };


        return(   
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '50px', gap: '24px'}}>
                    <h2><b></b></h2>
                    <h2 style={{width: '610px'}}><b>Detail Pelanggan</b></h2>
                    <h2 style={{width: '450px'}}><b>Detail Pesanan</b></h2>
                </div>

                {/* card detail pengunjung */}
                <div style={cardContainerStyle}>
                    <div style={cardPengunjungStyle}> 
                        <div style={{lineHeight: '40px'}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div>
                                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-6">   
                                    <div className="sm:col-span-12">
                                        <label htmlFor="fullName" className="block text-2xl font-bold text-gray-900">Nama Pengguna</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-3 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400">
                                                <input id="fullName" type="text" name="fullName" placeholder="Masukan nama lengkap Anda" {...register("fullName", {required: "Nama lengkap pengguna wajib diisi"} )}className="block w-screen bg-white py-1.5 pr-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none"/>
                                            </div>
                                            <p className="mt-2 pl-3 text-sm text-red-500 min-h-[20px]">{errors.fullName?.message}</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="identitas" className="block text-2xl font-bold text-gray-900"> Identitas</label>    
                                        <div className="mt-2">
                                            <div className="flex items-center gap-10">
                                                <Menu as="div" className="relative w-3/5 overflow-visible">
                                                    <div className="flex items-center rounded-2xl bg-white pl-3 pr-3 py-1.5 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400 transition-all">
                                                        <Menu.Button className="flex w-full items-center justify-between text-gray-700 text-base focus:outline-none">{selectedIdentitas} <ChevronDownIcon className="size-4 text-gray-400" /> </Menu.Button>
                                                    </div>

                                                    <Menu.Items className="absolute left-0 z-[9999] mt-2 w-full origin-top-right rounded-2xl border border-gray-200 bg-white shadow-xl p-1 text-base text-gray-800 transition-all duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                                        {["KTP", "Passpord"].map((item) => (
                                                        <Menu.Item key={item}>{({ active, close }) => (
                                                            <button onClick={() => {setSelectedIdentitas(item); close(); }}
                                                             className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 ${active ? "bg-blue-100 text-blue-600" : "text-gray-700"}`} >{item}</button>)}
                                                        </Menu.Item> ))}
                                                    </Menu.Items>
                                                </Menu>

                                            <div className="flex items-center rounded-2xl w-4/5 bg-white pl-3 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400">
                                                <input id="nomorIdentitas" type="text" name="nomorIdentitas" {...register('nomorIdentitas', {required: "Nomor identitas wajib di isi"} )} placeholder={ selectedIdentitas === "KTP" ? "Masukan Nomor KTP Anda" : selectedIdentitas === "Passpord" ? "Masukkan Nomor Passpord Anda" : "Isi sesuai identitas pilihan Anda"}
                                                className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl" />
                                            </div>
                                            </div>
                                            <p className="mt-2 pl-3 text-sm text-red-500 min-h-[20px]">{errors.nomorIdentitas?.message}</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="jumlahOrang" className="block text-2xl font-bold text-gray-900">Jumlah Orang</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-3 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400">
                                                <input id="jumlahOrang" type="number" name="jumlahOrang" {...register("jumlahOrang", {required: "Jumlah orang wajib diisi", min:{value: 1}})} placeholder="5" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                            <p className="mt-2 pl-3 text-sm text-red-500 min-h-[20px]">{errors.jumlahOrang?.message}</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="nomorTelpon" className="block text-2xl font-bold text-gray-900">Nomor Telepon</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-3 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400">
                                                <input id="nomorTelpon" type="text" name="nomorTelpon" {...register("nomorTelpon", {required: "Nomor telepon wajib diisi", pattern:{value: /^(?:\+?\d{1,3})?[ -]?(?:0)?8\d{7,11}$/, message: "Format nomor telepon tidak valid"}})} placeholder="Masukan nomor aktif Anda" className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                            <p className="mt-2 pl-3 text-sm text-red-500 min-h-[20px]">{errors.nomorTelpon?.message}</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="tanggalBerangkat" className="block text-2xl font-bold text-gray-900">Tanggal Keberangkatan</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-2xl bg-white pl-3 outline outline-3 -outline-offset-1 outline-blue-300 focus-within:-outline-offset-3 focus-within:outline-blue-400">
                                                <input id="tanggalBerangkat" type="date" name="tanggalBerangkat" {...register("tanggalBerangkat", {required: "Tanggal berangkat wajib diisi"})} className="block w-full bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-2xl"/>
                                            </div>
                                            <p className="mt-2 pl-3 text-sm text-red-500 min-h-[20px]">{errors.tanggalBerangkat?.message}</p>
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
                        <h2><b>{paket.nama}</b></h2>
                        <p style={{fontSize: '20px', color: '#878787'}}>{paket.desk}</p> <br/>
                        <div style={{lineHeight: '20px'}}>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>   
                            <p>Tiket</p>
                            <p>Jumlah</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}><b> {paket.nama} </b></p>
                            <p style={{fontSize: '20px'}}>x {watch("jumlahOrang") || 0}</p>  {/*watch mengambil nilai terbaru dari inputan jumlah orang (real-time), || 0 nilai default untuk tiket*/}
                        </div>
                        <p style={{fontSize: '20px'}}><b>{paket.harga}</b></p>
                        <p style={{color: '#B3B3B3'}}>------------------------------------------------------------</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}>Total</p>
                            <p style={{fontSize: '20px'}}>Rp. {( (watch("jumlahOrang") || 0) * parseInt(paket.harga.replace(/\D/g, "")) ).toLocaleString("id-ID")}</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}>Biaya Layanan</p>
                            <p style={{fontSize: '20px'}}>Rp. 10.000</p>
                        </div>
                        <p style={{color: '#B3B3B3'}}>------------------------------------------------------------</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                            <p style={{fontSize: '20px'}}>Total</p>
                            <p style={{fontSize: '20px'}}><b>Rp. {( ((watch("jumlahOrang") || 0) * parseInt(paket.harga.replace(/\D/g, ""))) + 10000).toLocaleString("id-ID") }</b></p>
                        </div>
                        </div>
                    </div>
                    <div>

                    <button onClick={handleSubmit(onSubmit)} className="bg-[#005ED1]  text-white py-3 w-48 h-25 hover:bg-blue-800 transition-colors" style={buttonStyle}>Bayar</button>

                    </div>

                    {/* pop up biling info */}
                    <div className="mt-20 p-6">
                    <Dialog open={isOpen} onClose={close} className="relative z-50">
                        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <DialogPanel className="bg-[#005ED1] rounded-2xl w-full max-w-lg mx-auto">
                            
                            <div className="p-3 bg-white rounded-t-2xl tracking-normal">
                                <DialogTitle className="text-lg font-medium text-gray-900">Info Pembayaran</DialogTitle>
                                <p className="mt-2 text-gray-600">Paket Wisata</p>
                            </div>

                            <div className="flex items-center bg-[#005ED1]  p-3">
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
                                    <p>Rp. {( (watch("jumlahOrang" || 0))* parseInt(paket.harga.replace(/\D/g, "")) ).toLocaleString("id-ID")}</p>
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
                                    <p className="font-bold text-3xl">Rp. {( ((watch("jumlahOrang") || 0) * parseInt(paket.harga.replace(/\D/g, ""))) + 10000).toLocaleString("id-ID") }</p>
                                </div>
                                    <button onClick={() => {close(); openNested(false); navigate('/menuPaket/detailPaket/menuPembayaran/tiket', { state: { paket, data: formData } });}} className="bg-[#005ED1]  text-white py-3 w-48 h-25 hover:bg-blue-800 transition-colors" style={{borderRadius: '8px', fontWeight:'bold', fontSize: '18px'}}>Bayar</button>
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
                                <DialogTitle className="text-lg font-medium text-gray-900">Rp. {( ((watch("jumlahOrang") || 0) * parseInt(paket.harga.replace(/\D/g, ""))) + 10000).toLocaleString("id-ID") }</DialogTitle>
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
                                    <button onClick={() => setIsOpenNested(false)} className="bg-[#005ED1]  text-white font-semibold px-6 py-3 rounded-xl w-48" style={{borderRadius: '8px'}}>Unduh QRIS</button>
                                </div>

                                <div className="flex justify-center mt-3">
                                    <button onClick={() => setIsOpenNested(false)} className="bg-[#005ED1]  text-white font-semibold text-2xl px-6 py-3 rounded-md w-48" style={{borderRadius: '8px'}}>Cek status</button>
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

