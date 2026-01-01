import db from "../config/db.js";
import { promisify } from "util";
const query = promisify(db.query).bind(db);

export const addReview = async (req, res) => {
  try {
    const { paket_id, tiket_id, rating, text, tanggal, user_data } = req.body;
    const files = req.files || [];

    // if (!user_data || !paket_id || !tiket_id || !rating || !text || !tanggal) {
    //   return res.status(400).json({ message: "Data ulasan tidak lengkap" });
    // }

    const tiketIdNum = Number(tiket_id);

    if (Number.isNaN(tiketIdNum)) {
      return res.status(400).json({
        message: "tiket_id tidak valid",
        body: req.body,
      });
    }

    const existingReviews = await query(
      "SELECT id FROM review WHERE user_data = ? AND tiket_id = ?",
      [user_data, tiket_id]
    );

    if (existingReviews.length > 0) {
      return res
        .status(400)
        .json({ message: "Tiket ini sudah pernah direview" });
    }

    const imagePaths = files.map((f) => f.filename);

    const result = await query(
      `INSERT INTO review 
       (user_data, paket_id, tiket_id, rating, text, images, tanggal, likes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(user_data),
        Number(paket_id),
        Number(tiket_id),
        Number(rating),
        text,
        JSON.stringify(imagePaths),
        tanggal,
        0,
      ]
    );

    console.log("BODY:", req.body);
  console.log("FILES:", req.files);

    res.status(201).json({
      success: true,
      message: "Ulasan berhasil disimpan",
      review_id: result.insertId,
    });
  } catch (err) {
    console.error("ERROR ADD REVIEW:", err); 
    res.status(500).json({ message: "Gagal menambahkan ulasan" });
  }
};


export const getReview = async (req, res) => {
  try {
    const paketId = req.params.paketId;
    const results = await query(
      `SELECT r.*, u.username, u.fotoProfile, p.title AS paketTitle, p.slug AS paketSlug
       FROM review r
       JOIN users u ON r.user_data = u.id
       JOIN paket p ON r.paket_id = p.id
       WHERE p.slug = ?
       ORDER BY r.tanggal DESC`,
      [paketId]
    );

    res.status(200).json({ message: "Ulasan berhasil diambil", reviews: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil ulasan", error: err });
  }
};

export const getReviewBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const results = await query(
      `SELECT r.*, u.username, u.fotoProfile, p.title AS paketTitle, p.slug AS paketSlug
       FROM review r
       JOIN users u ON r.user_data = u.id
       JOIN paket p ON r.paket_id = p.id
       WHERE p.slug = ?
       ORDER BY r.tanggal DESC`,
      [slug]
    );

    res.status(200).json({ success: true, reviews: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil ulasan berdasarkan slug"
    });
  }
};

export const likeReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) return res.status(400).json({ message: "ID review tidak ada" });

    await query("UPDATE review SET likes = likes + 1 WHERE id = ?", [reviewId]);
    const rows = await query("SELECT likes FROM review WHERE id = ?", [reviewId]);

    res.status(200).json({ message: "Suka berhasil ditambahkan", likes: rows[0].likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan suka", error: err });
  }
};
