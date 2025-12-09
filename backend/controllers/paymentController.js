import { createPayment } from "../models/paymentModel.js";

export const savePayment = (req, res) => {
  const d = req.body;

  console.log("📥 DATA DARI FE:", d);

  // Validasi sesuai FE terbaru
  if (
    !d.fullName ||
    !d.email ||
    !d.nomorTelpon ||
    !d.jumlahOrang ||
    !d.tanggalBerangkat ||
    !d.paketId ||
    !d.totalPayment
  ) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  // Data yang disimpan ke database (HANYA sesuai FE)
  const formattedData = {
    fullName: d.fullName,
    email: d.email,
    nomorTelpon: d.nomorTelpon,
    jumlahOrang: d.jumlahOrang,
    tanggalBerangkat: d.tanggalBerangkat,
    paketId: d.paketId,
    paketNama: d.paketNama,
    totalPayment: d.totalPayment,
    status: d.status || "success"
  };

  createPayment(formattedData, (err, result) => {
    if (err) {
      console.error("❌ Error saving payment:", err);
      return res.status(500).json({
        message: "Gagal menyimpan pembayaran ke database",
        error: err,
      });
    }

    res.status(201).json({
      message: "Pembayaran berhasil disimpan!",
      paymentId: result.insertId,
    });
  });
};
