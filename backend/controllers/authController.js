import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = (req, res) => {
    const { email, password } = req.body;

    console.log("📥 Data diterima:", req.body);

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const rawUsername = email.split("@")[0];
    const username = rawUsername.replace(/[^a-zA-Z]/g, ""); 

    const checkEmail = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmail, [email], (err, result) => {
        if (err) {
            console.error("❌ ERROR CHECK EMAIL:", err);
            return res.status(500).json({ message: "DB Error", error: err });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error("❌ ERROR HASH:", err);
                return res.status(500).json({ message: "Hash Error", error: err });
            }

            const insertUser =  "INSERT INTO users (email, username, password, fotoProfile, bio, preferensiWisata) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(insertUser, [email, username, hash, "/profileDefault.jpg", "", JSON.stringify([])], (err) => {
                if (err) {
                    console.error("❌ ERROR INSERT USER:", err);
                    return res.status(500).json({ message: "Insert Error", error: err });
                }
                return res.json({ message: "Registrasi berhasil" });
            });
        });
    });
};


// LOGIN USER
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("❌ LOGIN DB ERROR:", err);
            return res.status(500).json({ message: "DB Error", error: err });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Email tidak ditemukan" });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("❌ COMPARE ERROR:", err);
                return res.status(500).json({ message: "Compare Error", error: err });
            }

            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Password salah" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            return res.json({
                success: true,
                message: "Login berhasil",
                token,
                user: { 
                    id: user.id, 
                    email: user.email,
                    username: user.username,
                }
            });
        });
    });
};

// UPDATE USER PROFILE 
// export const updateProfile = (req, res) => {
//   if (!req.userId) return res.status(401).json({ success: false, message: "Unauthorized" });

//   const { username, bio, preferensiWisata } = req.body;

//   db.query("SELECT fotoProfile FROM users WHERE id = ?", [req.userId], (err, result) => {
//     if (err) return res.status(500).json({ success: false, message: "DB Error" });

//     const oldFoto = result[0]?.fotoProfile || "/profileDefault.jpg";
//     const newFoto = req.file ? `/uploads/${req.file.filename}` : oldFoto;

//     const sql = `
//       UPDATE users SET
//         username = ?,
//         bio = ?,
//         fotoProfile = ?,
//         preferensiWisata = ?
//       WHERE id = ?
//     `;

//     db.query(sql, [
//       username || null,
//       bio || "",
//       newFoto,
//       JSON.stringify(preferensiWisata || []),
//       req.userId
//     ], (err2) => {
//       if (err2) return res.status(500).json({ success: false, message: "Update Error", error: err2.message });

//       db.query("SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?", [req.userId], (err3, rows) => {
//         if (err3 || rows.length === 0) return res.status(500).json({ success: false, message: "Gagal ambil data terbaru" });

//         const user = rows[0];
//         res.json({
//           success: true,
//           user: {
//             ...user,
//             preferensiWisata: JSON.parse(user.preferensiWisata || "[]")
//           }
//         });
//       });
//     });
//   });
// };

// REFRESH HALAMAN
// export const getMe = (req, res) => {
//   const sql = `SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?`;
//   db.query(sql, [req.userId], (err, result) => {
//     if (err) return res.status(500).json({ success: false });
//     if (result.length === 0) return res.status(404).json({ success: false, message: "User tidak ditemukan" });

//     const user = result[0];
//     res.json({
//       success: true,
//       user: {
//         ...user,
//         preferensiWisata: JSON.parse(user.preferensiWisata || "[]")
//       }
//     });
//   });
// };

// UPDATE USER PROFILE 
export const updateProfile = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { username, bio, preferensiWisata } = req.body;
  const userId = req.user.id;  // ← Ambil dari req.user.id

  db.query("SELECT fotoProfile FROM users WHERE id = ?", [userId], (err, result) => {
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
      userId
    ], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "Update Error", error: err2.message });

      db.query("SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?", [userId], (err3, rows) => {
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

// REFRESH HALAMAN / GET ME
export const getMe = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const userId = req.user.id;

  const sql = `SELECT id, email, username, fotoProfile, bio, preferensiWisata FROM users WHERE id = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
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

  

