import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

function MetodePembayaran({ paket, formData, isOpen, setIsOpen, jumlahOrang, total }) {
    const navigate = useNavigate(); 
    const [isPaying, setIsPaying] = useState(false);
    const hargaPerTiket = parseInt(paket.price.replace(/\D/g, "")) || 0;
    const subTotal = (jumlahOrang || 0) * hargaPerTiket;

    const close = () => {
        if (!isPaying) setIsOpen(false);
    }; 

    const handleBayar = async () => {
        if (!formData || isPaying) return;
      
        if (!window.snap) {
          alert("Payment gateway belum siap");
          return;
        }
      
        setIsPaying(true);
      
        try {
          const response = await fetch("http://localhost:4000/api/payments/midtrans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              nomorTelpon: formData.nomorTelpon,
              jumlahOrang: formData.jumlahOrang,
              tanggalBerangkat: formData.tanggalBerangkat,
              paketId: paket.paketId || paket.id,
              paketNama: paket.title,
              totalPayment: total,
            }),
          });
      
          const data = await response.json();
          if (!response.ok) throw new Error(data.message);
      
          setIsOpen(false);
      
          window.snap.pay(data.token, {
            onSuccess: (result) => {
              simpanRiwayat("berhasil", result.order_id);
              simpanTiket(result.order_id);
              navigate("/riwayat-pemesanan", { state: { status: "berhasil" } });
            },

            onPending: (result) => {
              simpanRiwayat("pending", result.order_id);
              navigate("/riwayat-pemesanan", { state: { status: "pending" } });
            },

            onError: (result) => {
              simpanRiwayat("gagal", result?.order_id);
              navigate("/riwayat-pemesanan", { state: { status: "gagal" } });
            },

            onClose: () => {
              setIsPaying(false);
              navigate("/riwayat-pemesanan");
            },
          });
      
        } catch (err) {
          alert(err.message || "Gagal terhubung ke server");
          setIsPaying(false);
        }
      };      

      const simpanRiwayat = (status, orderId) => {
        const riwayatLama = JSON.parse(localStorage.getItem("riwayat")) || [];
        riwayatLama.push({
            orderId, 
            paketId: paket.paketId || paket.id,
            paket: paket.title, 
            tanggal: new Date().toLocaleDateString("id-ID"), 
            status, 
            total, 
            imageSrc: paket.imageSrc, 
        }); 
        localStorage.setItem("riwayat", JSON.stringify(riwayatLama));
      };

      const simpanTiket = (orderId) => {
        const tiketLama = JSON.parse(localStorage.getItem("tiketSaya")) || []; 
        tiketLama.push({
            orderId,
            paketId: paket.paketId || paket.id,
            paket: paket.title,         
            imageSrc: paket.imageSrc,
            departurTime: paket.departurTime, 
            fullName: formData.fullName,       
            tanggalBerangkat: formData.tanggalBerangkat,
            jumlahOrang: formData.jumlahOrang,
            sudahReview: false,
            status: "berhasil"
        });
        localStorage.setItem("tiketSaya", JSON.stringify(tiketLama));
      }

      return (
        <Dialog open={isOpen} onClose={close} className="relative z-50">
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white rounded-2xl w-full max-w-md mx-auto overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <Dialog.Title className="text-xl font-bold">
                  Ringkasan Pembayaran
                </Dialog.Title>
                <button onClick={close}>
                  <X />
                </button>
              </div>
    
              {/* Konten */}
              <div className="p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={paket.imageSrc}
                    alt=""
                    className="w-24 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="font-bold">{paket.title}</p>
                    <p className="text-sm text-gray-500">{paket.tagLine}</p>
                  </div>
                </div>
    
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp{subTotal.toLocaleString("id-ID")}</span>
                </div>
    
                <div className="flex justify-between text-sm">
                  <span>Biaya layanan</span>
                  <span>Rp10.000</span>
                </div>
    
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rp{total.toLocaleString("id-ID")}</span>
                </div>
              </div>
    
              {/* Footer */}
              <div className="p-4 border-t">
                <button
                  onClick={handleBayar}
                  disabled={isPaying}
                  className={`w-full py-3 rounded-xl text-white font-bold
                    ${isPaying ? "bg-gray-400" : "bg-[#005ED1] hover:bg-blue-800"}
                  `}
                >
                  {isPaying ? "Memproses..." : "Bayar Sekarang"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      );
}

export default MetodePembayaran;
