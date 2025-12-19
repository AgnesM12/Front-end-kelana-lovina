import React, { useState, useEffect} from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DataDetailPaket from "../components/DataDetailPaket.jsx";
import MetodePembayaran from "../components/MetodePembayaran.jsx";


function MenuPembayaran() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const {slug} = useParams(); 
    
    const paket = state; 
    const displayTitle = paket.shortTitle || paket.titleT || paket.title;

    if (!paket) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center p-10 bg-white rounded-3xl shadow-2xl">
                    <p className="text-5xl mb-4">Paket Hilang!</p>
                    <p className="text-xl text-gray-600 mb-8">Mungkin lumba-lumbanya lagi berenang jauh</p>
                    <button 
                        onClick={() => navigate('/paket')}
                        className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg rounded-full hover:shadow-lg transition"
                    >
                        Kembali ke Paket
                    </button>
                </div>
            </div>
        );
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNested, setIsOpenNested] = useState(false);

    const onSubmit = async (data) => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            nomorTelpon: data.nomorTelpon,
            jumlahOrang: Number(data.jumlahOrang),
            tanggalBerangkat: data.tanggalBerangkat,
            paketId: paket.paketId,
            paketNama: paket.title || paket.titleT || paket.shortTitle,
            totalPayment: total,
            status: "success"
          };

        try {
            const response = await fetch("http://localhost:4000/api/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log("HASIL:", result);

            if (response.ok) {
                // Simpan data form untuk popup kode bayar
                setFormData(data);

                // Buka popup info pembayaran
                setIsOpen(true);
            } else {
                alert("❌ Gagal menyimpan pembayaran ke database");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Tidak dapat terhubung ke server");
        }
    };


    const jumlahOrang  = watch("jumlahOrang") || 0; 
    const hargaPerTiket = parseInt(paket.price?.replace(/\D/g, "") || "0"); 
    const subTotal = jumlahOrang * hargaPerTiket;
    const total = subTotal + 10000;

    const cardContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: '24px'
    };

    const cardPengunjungStyle = {
        width: '540px',
        height: '730px',
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
    };

    const cardPesananStyle = {
        width: '480px',
        height: '730px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0, 94, 209, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        textAlign: "left",
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        padding: '30px', 
        margin: '20px 0px',
    };

    const imageStyle = {
        width: '419px', 
        height: '302px', 
        objectFit: 'cover', 
        borderRadius: '15px',
        justifyContent: 'center',   
    };

    const buttonStyle = {
        width: '350px',
        height: '51px',
        backgroundColor: '#005ED1',
        fontFamily: 'Poppins, sans-serif', 
        fontSize: '18px',
        fontWeight: '700',
        borderRadius: '8px', 
        display: 'flex', 
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '50px', gap: '140px'}}>
                <p style={{width: '680px', fontSize: '30px', fontWeight: 'bold', fontFamily: 'poppins, sans-serif'}}>Detail Pengunjung</p>
                <p style={{width: '220px', fontSize: '30px', fontWeight: 'bold', fontFamily: 'poppins, sans-serif'}}>Detail Pesanan</p>
            </div>

            <div style={cardContainerStyle}>
                {/* Card Detail Pengunjung */}
                <div style={cardPengunjungStyle}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
                            {/* Nama Pengguna */}
                            <div className="sm:col-span-12">
                                <label htmlFor="fullName" className="block text-lg font-bold text-gray-900">Nama Pengguna</label>
                                <div className="mt-2">
                                    <div>
                                        <input id="fullName" size={100} type="text" {...register("fullName", { required: "Nama lengkap pengguna wajib diisi" })} placeholder="Masukan nama lengkap Anda" className="block w-full rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 max-w-[480px]"/>
                                    </div>
                                    <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.fullName?.message}</p>
                                </div>
                            </div>
                            
                            {/* Email */}
                            <div className="sm:col-span-12">
                                <label htmlFor="email" className="block text-lg font-bold text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input id="email" type="email" {...register("email", { required: "Email wajib diisi", pattern:{value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, message: "Format email tidak valid"} })} placeholder="Masukan nomor aktif Anda" className="block w-full  rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                                    <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.email?.message}</p>
                                </div>
                            </div>

                            {/* Jumlah Orang */}
                            <div className="sm:col-span-12">
                                <label htmlFor="jumlahOrang" className="block text-lg font-bold text-gray-900">Jumlah Orang</label>
                                <div className="mt-2">
                                        <input id="jumlahOrang" type="number" {...register("jumlahOrang", { required: "Jumlah orang wajib diisi", min: { value: 1 } })} placeholder="0" className="block w-full rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                                    <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.jumlahOrang?.message}</p>
                                </div>
                            </div>

                            {/* Nomor Telepon */}
                            <div className="sm:col-span-12">
                                <label htmlFor="nomorTelpon" className="block text-lg font-bold text-gray-900">Nomor Telepon</label>
                                <div className="mt-2">
                                    <input id="nomorTelpon" type="text" {...register("nomorTelpon", { required: "Nomor telepon wajib diisi", pattern:{value: /^(?:\+?\d{1,3})?[ -]?(?:0)?8\d{7,11}$/, message: "Format nomor telepon tidak valid"} })} placeholder="Masukan nomor aktif Anda" className="block w-full  rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                                    <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.nomorTelpon?.message}</p>
                                </div>
                            </div>

                            {/* Tanggal Tiket */}
                            <div className="sm:col-span-12">
                                <label htmlFor="tanggalBerangkat" className="block text-lg font-bold text-gray-900">Tanggal Tiket</label>
                                <div className="mt-2">
                                    <div>
                                    <input id="tanggalBerangkat" type="date" min ={new Date().toISOString().split("T")[0]}  
                                    {...register("tanggalBerangkat", { required: "Tanggal berangkat wajib diisi" })} className="block w-full  rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                                    </div>
                                    <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.tanggalBerangkat?.message}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Card Detail Pesanan */}
                <div style={cardPesananStyle}>
                    <img src={paket.imageSrc} alt="" style={imageStyle}/> <br/>
                    <p style={{fontSize: '25px', fontWeight: 'bold', fontFamily: 'poppins, sans-serif'}}>{paket.title}</p>
                    <p style={{fontSize: '15px', color: '#878787'}}>{paket.tagLine}</p> <br/>

                    <div style={{lineHeight: '20px'}}>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontFamily:'poppins, sans-serif'}}>   
                            <p>Tiket</p>
                            <p>Jumlah</p>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: '15px', fontFamily: 'poppins, sans-serif'}}>
                            <p style={{fontSize: '18px'}}>{paket.shortTitle || paket.titleT || paket.title} </p>
                            <p style={{fontSize: '18px'}}>x {watch("jumlahOrang") || 0}</p>
                        </div>

                        <p style={{fontSize: '22px', fontWeight: 'bold', fontFamily:'poppins, sans-serif',paddingTop: '15px'}}>{paket.price}</p>

                        <p style={{color: '#B3B3B3', paddingTop: '10px'}}>---------------------------------------------------------------</p>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: '15px', fontFamily: 'poppins, sans-serif'}}>
                            <p style={{fontSize: '20px'}}>Total</p><p style={{fontSize: '20px'}}>Rp. {subTotal.toLocaleString("id-ID")}</p>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: '15px', fontFamily: 'poppins, sans-serif'}}>
                            <p style={{fontSize: '18px'}}>Biaya Layanan</p>
                            <p style={{fontSize: '18px'}}>Rp. 10.000</p>
                        </div>

                        <p style={{color: '#B3B3B3', padding: '10px 0px'}}>---------------------------------------------------------------</p>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontFamily: 'poppins, sans-serif', marginTop: '2px'}}>
                            <p style={{fontSize: '22px'}}>Total</p>
                            <p style={{fontSize: '22px'}}><b>Rp. {total.toLocaleString("id-ID")}</b></p>
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit(onSubmit)} className="bg-[#005ED1]  text-white py-3 w-48 h-25 hover:bg-blue-800 transition-colors m-10" style={buttonStyle}>Bayar</button>

                <div>
                    <MetodePembayaran 
                        paket={paket}
                        formData={formData}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isOpenNested={isOpenNested}
                        setIsOpenNested={setIsOpenNested}
                        jumlahOrang={jumlahOrang}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
    }

    export default MenuPembayaran;
