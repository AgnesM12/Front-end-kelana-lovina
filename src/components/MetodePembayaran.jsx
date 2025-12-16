import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import KodeBayarPDF from "./kodeBayar.jsx";

function MetodePembayaran({ paket, formData, isOpen, setIsOpen, isOpenNested, setIsOpenNested, jumlahOrang, total }) {
    const navigate = useNavigate();
    const close = () => setIsOpen(false);
    const [seconds, setSeconds] = useState(15);
    const hargaPerTiket = parseInt(paket.price.replace(/\D/g, "")) || 0;
    const subTotal = (jumlahOrang || 0) * hargaPerTiket;

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
            // metode: selectedMethod, 
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

    const handleDownloadPDF = async () => {
        if (!formData) return alert("Form data is missing!");
        const blob = await pdf(<KodeBayarPDF data={formData} paket={paket} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tiket_wisata.pdf";
        a.click();
        URL.revokeObjectURL(url);
    };

    //pilih metode pembayaran
    const paymentMethod = {
        BCA: "/BCA.png", 
        BNI: "/BNI.png", 
        Mandiri: "/Mandiri.png", 
        Ovo: "/OVO.png", 
        Dana: "/Dana.png", 
        Gopay: "/gopay.png"
    };

    const [selectedMethod, setSelectedMethod] = useState(null);

    return (
        <div>
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
                            <p className="text-center font-bold text-xl mb-1">
                                {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </p>
                            <hr className="my-2" />
                            <div className="flex justify-between text-base">
                                <p>Total</p>
                                <p className="font-bold">Rp. {subTotal.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="flex justify-between mt-2 text-base">
                                <p>Biaya Layanan</p>
                                <p className="font-bold">Rp. 10.000</p>
                            </div>

                            <div className="border-2 border-gray-300 rounded-lg p-3 w-4/5 mx-auto mt-5 mb-3">
                                <p className="font-semibold mb-3">Pilih metode pembayaran</p>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                    {Object.keys(paymentMethod).map((method) => (
                                        <button key={method} onClick={() => setSelectedMethod(method)}
                                            className={`flex items-center gap-3 p-2 rounded-md ${
                                            selectedMethod === method ? "border-blue-600 bg-blue-100" : "border-gray-300 hover:bg-gray-100"
                                            }`}>
                                                <img src={paymentMethod[method]} className="h-4 w-12" alt={method} />
                                                <span className="font-semibold">{method}</span>
                                        </button>
                                         ))}
                                </div>
                            </div>

                        </div>

                        <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] flex justify-between items-center">
                            <div>
                                <p className="font-bold">Total</p>
                                <p className="font-bold text-3xl">Rp. {total.toLocaleString("id-ID")}</p>
                            </div>

                            <button disabled={!selectedMethod} onClick={handleOpenNested}
                                className={`w-[200px] py-5 px-6 rounded-lg font-bold text-lg
                                    ${!selectedMethod 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-[#005ED1] hover:bg-blue-800 text-white"}
                                `}>
                                Bayar
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Pop up Kode Pembayaran */}
            <Dialog open={isOpenNested} onClose={closeNested} className="relative z-[100]">
                <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-blue-600 rounded-2xl w-full max-w-lg mx-auto">
                        <div className="p-3 bg-white rounded-t-2xl tracking-normal">
                            <div className="flex items-center gap-80">
                                <Dialog.Title className="text-xl font-bold text-gray-900">
                                    Rp. {((jumlahOrang || 0) * hargaPerTiket + 10000).toLocaleString("id-ID")}
                                </Dialog.Title>
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
                                <img src={paymentMethod[selectedMethod]} alt={selectedMethod} className="h-5"/>
                            </div>
                            <div className="flex justify-center">
                                {selectedMethod && (
                                  <img src="/qrcode.png"  alt="QR Pembayaran" className="h-[300px] w-[300px]"/>
                                )}
                            </div>
                        </div>

                        <div className="p-3 bg-white rounded-b-xl shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)]">
                            <div className="flex justify-center">
                                <button onClick={handleDownloadPDF} className="bg-[#005ED1] text-white font-semibold text-lg px-6 py-3 rounded-xl w-48">Unduh QRIS</button>
                            </div>
                            <div className="flex justify-center mt-3">
                                <button onClick={closeNested} className="bg-[#005ED1] text-white font-semibold text-lg px-6 py-3 rounded-xl w-48">Cek status</button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

export default MetodePembayaran;
