import React, { useState, useEffect} from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, Dialog } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Rows, X } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import KodeBayarPDF from "../components/kodeBayar.jsx";
import DataDetailPaket from "../components/DataDetailPaket.jsx";


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

    // const [selectedIdentitas, setSelectedIdentitas] = useState("Pilih Identitas");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNested, setIsOpenNested] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const openNested = () => setIsOpenNested(true);
    // const closeNested = () => setIsOpenNested(false);

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

    //hitungan mundur dan booking (gagal/berhasil)
    const [seconds, setSeconds] = useState(15);
    const [statusBooking, setStatusBooking ] = useState(null);

    useEffect(() => {
        let timer;

        if (isOpenNested && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        }
        if (seconds === 0) {
            clearInterval(timer);
        }
        
        return () => clearInterval(timer);
    }, [isOpenNested, seconds]);

    const closeNested = () => {
        const status = seconds <= 0 ? "gagal" : "berhasil";
    
        const riwayatLama = JSON.parse(localStorage.getItem("riwayat")) || [];
        const riwayatBaru = {
            paket: paket.title,
            tanggal: new Date().toLocaleDateString("id-ID"),
            status,
            imageSrc: paket.imageSrc,
            deskripsi: paket.tagLine,
        };
        localStorage.setItem("riwayat", JSON.stringify([...riwayatLama, riwayatBaru]));
    
        if (status === "berhasil") {
            const tiketSebelumnya = JSON.parse(localStorage.getItem("tiketSaya")) || [];
            const tiketBaru = {
                paket: paket,
                data: formData,
                status,
            };
            localStorage.setItem("tiketSaya", JSON.stringify([...tiketSebelumnya, tiketBaru]));
        } else {
            alert("Pembayaran Gagal!");
        }
    
        setIsOpenNested(false);
        navigate("/riwayat-pemesanan", { state: { status } });
    };

    const formatTime = (seconds) => {
        const hour = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsRemaining = seconds % 60;
        return [hour, minutes, secondsRemaining].map((v) => v.toString().padStart(2, "0")).join(":");
    }

    const handleOpenNested = () => {
        setSeconds(15);
        close();
        setIsOpenNested(true);
    };


    //download kode pembayaran PDF
    const handleDownloadPDF = async () => {  
        if (!formData){
                alert("Form data is missing!");
        };

        const blob = await pdf(
            <KodeBayarPDF data={formData} paket={paket} />
        ).toBlob();
        
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "tiket_wisata.pdf";
            a.click();
            URL.revokeObjectURL(url);
        };
    
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

                            {/* Identitas */}
                            {/* <div className="sm:col-span-12">
                                <label htmlFor="identitas" className="block text-lg font-bold text-gray-900">Identitas</label>
                                <div className="mt-2 flex items-center gap-10">
                                    <Menu as="div" className="relative w-3/5 overflow-visible">
                                        <div className="block w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-base text-gray-900">
                                            <Menu.Button className="flex w-full items-center justify-between text-gray-700 text-base">{selectedIdentitas} <ChevronDownIcon className="size-4 text-gray-400"/></Menu.Button>
                                        </div>
                                        <Menu.Items className="absolute left-0 z-[9999] mt-2 w-full origin-top-right rounded-lg border border-gray-200 bg-white shadow-xl p-1 text-base text-gray-800 transition-all duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                            {["KTP", "Passpord"].map((item) => (
                                                <Menu.Item key={item}>{({ active, close }) => (
                                                    <button onClick={() => { setSelectedIdentitas(item); close(); }}
                                                        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 ${active ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}>{item}</button>)}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>

                                        <input id="nomorIdentitas" type="text" {...register('nomorIdentitas', { required: "Nomor identitas wajib di isi" })} placeholder={selectedIdentitas === "KTP" ? "Masukan Nomor KTP Anda" : selectedIdentitas === "Passpord" ? "Masukkan Nomor Passpord Anda" : "Isi sesuai identitas pilihan Anda"} className="block w-full  rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                                </div>
                                <p className="mt-2 pl-3 text-sm text-red-500 min-h-[24px]">{errors.nomorIdentitas?.message}</p>
                            </div> */}

                            
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

            </div>

            {/* Pop up Info Pembayaran */}
            <Dialog open={isOpen} onClose={close} className="relative z-50">
                <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="bg-[#005ED1] rounded-2xl w-full max-w-md mx-auto">
                    <div className="p-3 bg-white rounded-t-2xl">
                        <div className="flex items-center gap-48">
                            <Dialog.Title className="text-2xl font-bold text-gray-900">Info Pembayaran</Dialog.Title>     
                            <button onClick={close}> <X size={28} className="text-black hover:text-red-500" /></button>          
                        </div>
                    <p className="text-gray-600">Paket Wisata</p>
                    </div>

                    <div className="flex items-center bg-[#005ED1] p-3">
                    <div className="flex items-center bg-white rounded-xl p-2 shadow-md w-full">
                        <img src={paket.imageSrc} className="h-20 w-28 rounded-sm" alt="" />
                        <div className="ml-4">
                        <h4 className="text-lg font-bold">{paket.title}</h4>
                        <p className="text-xs text-gray-400">{paket.tagLine}</p>
                        <p className="text-sm text-gray-500 mt-2">{paket.location}</p>
                        </div>
                    </div>
                    </div>

                    <div className="p-3 bg-white text-gray-800">
                    <p className="text-center font-bold text-xl mb-1"> {new Date().toLocaleDateString("id-ID", {weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    <hr className="my-2" />
                    <div className="flex justify-between text-base">
                        <p>Total</p>
                        <p className="font-bold">Rp. {subTotal.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex justify-between mt-2 text-base">
                        <p>Biaya Layanan</p>
                        <p className="font-bold">Rp. 10.000</p>
                    </div>

                    <div className="p-3 border-2 border-gray-300 rounded-lg w-4/5 mx-auto mt-5">
                        <p className="font-semibold mb-3">Pilih metode pembayaran</p>
                        <div className="flex justify-center gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3"><img src="/BCA.png" className="h-3 w-10"/>BCA</div>
                            <div className="flex items-center gap-3"><img src="/BNI.png" className="h-3 w-10"/>BNI</div>
                            <div className="flex items-center gap-3"><img src="/Mandiri.png" className="h-4 w-10"/>Mandiri</div>
                        </div>
                        <div className="w-px bg-gray-300 self-stretch"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3"><img src="/OVO.png" className="h-4 w-12"/>Ovo</div>
                            <div className="flex items-center gap-3"><img src="/Dana.png" className="h-4 w-12"/>Dana</div>
                            <div className="flex items-center gap-3"><img src="/gopay.png" className="h-4 w-12"/>Gopay</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex justify-between items-center">
                    <div>
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-3xl">Rp. {total.toLocaleString("id-ID")}</p>
                    </div>

                    <button onClick={() => { close(); setIsOpenNested(true)}} className="bg-[#005ED1] w-[200px] text-white py-5 px-6 rounded-lg font-bold text-lg hover:bg-blue-800"> 
                    Bayar </button>
                    </div>
                </Dialog.Panel>
                </div>
            </Dialog>

            {/* Pop up Kode Pembayaran */}
            <div className="p-6">
                <Dialog open={isOpenNested} onClose={closeNested} className="relative z-[100]">
                    <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <Dialog.Panel className="bg-blue-600 rounded-2xl w-full max-w-lg mx-auto">
                            
                            <div className="p-3 bg-white rounded-t-2xl tracking-normal">
                                <div className="flex items-center gap-80">
                                    <Dialog.Title className="text-2xl font-bold text-gray-900">Rp. {( ((watch("jumlahOrang") || 0) * parseInt(paket.price.replace(/\D/g, ""))) + 10000).toLocaleString("id-ID") }</Dialog.Title>
                                    <button onClick={closeNested}> <X size={28} className="text-black hover:text-red-500" /></button>
                                </div>
                                <p className="mt-2 text-gray-600">Kode transaksi #648274898402</p>
                            </div>

                            <div className="flex items-center justify-center bg-blue-600 gap-10">
                                <p className="text-white text-center">Waktu Tersisa</p>
                                <p className="text-white text-center">{formatTime(seconds)}</p>
                            </div>

                            <div className="p-3 bg-white">
                                <div className="flex justify-end-safe">
                                    <img src="/gopay.png" alt="logo gopay" className="h-10"/>
                                </div>
                                <div className="flex justify-center">
                                    <img src="/qrcode.png" alt="QR Code" className="h-[300px] w-[300px]"/>
                                </div>
                            </div>
                      
                            <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
                                <div className="flex justify-center">
                                    <button onClick={handleDownloadPDF} className="bg-[#005ED1]  text-white font-semibold text-lg px-6 py-3 rounded-xl w-48" style={{borderRadius: '8px'}}>Unduh QRIS</button>
                                </div>

                                <div className="flex justify-center mt-3">
                                    <button onClick={closeNested} className="bg-[#005ED1]  text-white font-semibold text-lg px-6 py-3 rounded-md w-48" style={{borderRadius: '8px'}}>Cek status</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </div>
    );

}

export default MenuPembayaran;