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

            const insertUser = "INSERT INTO users (email, password) VALUES (?, ?)";
            db.query(insertUser, [email, hash], (err) => {
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
                user: { id: user.id, email: user.email }
            });
        });
    });
};
