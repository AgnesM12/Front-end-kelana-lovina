import { createTiket, getTiketByUser, getTiketById } from "../models/tiketModel.js";

// Tambah tiket
export const addTiket = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user_id = req.user.id;
    const { paket_id, tanggalBerangkat, payment_id, jumlahOrang } = req.body;

    if (!paket_id || !tanggalBerangkat || !jumlahOrang) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const barcode_tiket = `TKT-${Date.now()}-${user_id}`;
    const booking_id = `KL${Date.now()}-${user_id}`;

    const tiketId = await createTiket({
      user_id,
      paket_id,
      tanggalBerangkat,
      payment_id,
      barcode_tiket,
      booking_id,
      jumlahOrang,
    });

    res.status(201).json({ success: true, tiketId });
  } catch (err) {
    console.error("Error addTiket:", err);
    res.status(500).json({ message: "Gagal simpan tiket" });
  }
};

// Ambil semua tiket user
export const getMyTiket = async (req, res) => {
  console.log("req.user:", req.user);
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user_id = req.user.id;
    const tiket = await getTiketByUser(user_id);

    res.json({ tiket });
  } catch (err) {
    console.error("ERROR getMyTiket:", err);
    res.status(500).json({ message: "Gagal ambil tiket" });
  }
};

// Detail tiket
export const getDetailTiket = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tiket = await getTiketById(req.params.id, req.user.id);

    if (!tiket) {
      return res.status(404).json({ message: "Tiket tidak ditemukan" });
    }

    res.json({ tiket });
  } catch (err) {
    console.error("ERROR getDetailTiket:", err);
    res.status(500).json({ message: "Gagal ambil detail tiket" });
  }
};
