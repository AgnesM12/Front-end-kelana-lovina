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
  const { username, bio, preferensiWisata } = req.body;
  const fotoProfile = req.file ? `/uploads/${req.file.filename}` : null;

  // ambil data lama kalau fotoProfile tidak diupdate
  db.query("SELECT fotoProfile FROM users WHERE id = ?", [req.userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error", error: err });

    const oldFoto = result[0]?.fotoProfile || "/profileDefault.jpg";

    const sql = `
      UPDATE users SET 
        username = ?, 
        Bio = ?, 
        fotoProfile = ?, 
        preferensiWisata = ? 
      WHERE id = ?
    `;

    db.query(sql, [
      username,
      bio,
      fotoProfile || oldFoto,
      JSON.stringify(preferensiWisata || []),
      req.userId
    ], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "Update error", error: err2 });

      res.json({
        success: true,
        user: { username, bio, fotoProfile: fotoProfile || oldFoto, preferensiWisata }
      });
    });
  });
};
