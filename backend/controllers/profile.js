import db from "../config/db.js";

// GET PROFILE
export const getMe = (req, res) => {
    const sql = `SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?`;
    db.query(sql, [req.userId], (err, result) => {
      if (err) return res.status(500).json({ success: false });
      if (result.length === 0) return res.status(404).json({ success: false, message: "User tidak ditemukan" });
  
      const user = result[0];
      res.json({
        success: true,
        user: {
          ...user,
          preferensiWisata: JSON.parse(user.preferensiWisata || "[]")
        }
      });
    });
  };
  
// UPDATE PROFILE
export const updateProfile = (req, res) => {
  if (!req.userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { username, bio, preferensiWisata } = req.body;

  db.query("SELECT fotoProfile FROM users WHERE id = ?", [req.userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });

    const oldFoto = result[0]?.fotoProfile || "/profileDefault.jpg";
    const newFoto = req.file ? `/uploads/${req.file.filename}` : oldFoto;

    const sql = `
      UPDATE users SET
        username = ?,
        bio = ?,
        fotoProfile = ?,
        preferensiWisata = ?
      WHERE id = ?
    `;

    db.query(sql, [
      username || null,
      bio || "",
      newFoto,
      JSON.stringify(preferensiWisata || []),
      req.userId
    ], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "Update Error", error: err2.message });

      // Ambil data terbaru untuk response
      db.query("SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?", [req.userId], (err3, rows) => {
        if (err3 || rows.length === 0) return res.status(500).json({ success: false, message: "Gagal ambil data terbaru" });

        const user = rows[0];
        res.json({
          success: true,
          user: {
            ...user,
            preferensiWisata: JSON.parse(user.preferensiWisata || "[]")
          }
        });
      });
    });
  });
};