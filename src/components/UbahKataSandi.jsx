import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { X } from "lucide-react";

const UbahKataSandi = ({ closeModal }) => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    // validasi password
    const validatePassword = (value) => {
        if (value.length < 8) {
        return "Password minimal 8 karakter";
        }
        if (!/\d/.test(value)) {
        return "Password setidaknya mengandung satu angka";
        }
        if (!/[!@#$%^&*]/.test(value)) {
        return "Password setidaknya mengandung 1 simbol (!@#$%^&*)";
        }
        return true;
    };

    const togglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Validasi kata sandi saat ini
        if (!formData.currentPassword) {
        newErrors.currentPassword = "Kata sandi saat ini wajib diisi";
        }

        // Validasi kata sandi baru
        const newPasswordCheck = validatePassword(formData.newPassword);
        if (newPasswordCheck !== true) {
        newErrors.newPassword = newPasswordCheck;
        }

        // Validasi konfirmasi sandi baru
        if (formData.confirmPassword !== formData.newPassword) {
        newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok";
        }

        // Jika ada error → hentikan submit
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }
        console.log("Kata sandi berhasil diubah!");
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75 z-50 p-4 overflow-x-hidden">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-6 md:p-12 relative overflow-y-auto max-h-[90vh]">
            {/* Tombol X */}
            <button
            onClick={closeModal}
            className="absolute right-6 top-6 text-3xl font-bold text-black hover:text-red-500"
            >
            <X />
            </button>

            {/* Judul */}
            <h1 className="text-zinc-800 text-4xl font-bold mb-3">Ubah Kata Sandi</h1>
            <p className="text-zinc-800 text-lg font-normal mb-2">
            Kata sandi Anda harus paling tidak 8 karakter dan harus menyertakan kombinasi huruf dan simbol
            </p>

            {/* Form */}
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Kata sandi saat ini */}
            <div>
                <label className="block text-zinc-800 text-lg font-semibold mb-2">
                Kata sandi saat ini
                </label>
                <div className="relative">
                <input
                    type={showPassword.current ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Masukan kata sandi anda saat ini"
                    className={`w-full h-12 px-4 py-2 border-2 rounded-lg text-xl font-normal focus:outline-none ${
                    errors.currentPassword ? "border-red-500" : "border-blue-700"
                    }`}
                />
                <button
                    type="button"
                    onClick={() => togglePassword("current")}
                    className="absolute right-4 top-4 text-gray-600"
                >
                    {showPassword.current ? <FiEye size={22} /> : <FiEyeOff size={22} />}
                </button>
                </div>
                {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                )}
            </div>

            {/* Kata sandi baru */}
            <div>
                <label className="block text-zinc-800 text-lg font-semibold mb-2">
                Kata sandi baru
                </label>
                <div className="relative">
                <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Masukkan kata sandi baru anda"
                    className={`w-full h-12 px-4 py-2 border-2 rounded-lg font-normal text-lg focus:outline-none ${
                    errors.newPassword ? "border-red-500" : "border-blue-700"
                    }`}
                />
                <button
                    type="button"
                    onClick={() => togglePassword("new")}
                    className="absolute right-4 top-4 text-gray-600"
                >
                    {showPassword.new ? <FiEye size={22} /> : <FiEyeOff size={22} />}
                </button>
                </div>
                {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
            </div>

            {/* Konfirmasi kata sandi baru */}
            <div>
                <label className="block text-zinc-800 text-lg font-semibold mb-2">
                Konfirmasi kata sandi baru
                </label>
                <div className="relative">
                <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Tulis ulang kata sandi baru anda"
                    className={`w-full h-12 px-4 py-2 border-2 rounded-lg font-normal text-lg focus:outline-none ${
                    errors.confirmPassword ? "border-red-500" : "border-blue-700"
                    }`}
                />
                <button
                    type="button"
                    onClick={() => togglePassword("confirm")}
                    className="absolute right-4 top-4 text-gray-600"
                >
                    {showPassword.confirm ? <FiEye size={22} /> : <FiEyeOff size={22} />}
                </button>
                </div>
                {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            {/* Tombol Simpan */}
            <button
                type="submit"
                className="self-end w-60 h-14 px-6 py-3.5 bg-blue-700 rounded-lg text-white text-lg font-extrabold hover:bg-blue-800"
            >
                Ubah Kata Sandi
            </button>
            </form>
        </div>
        </div>
    );
};

export default UbahKataSandi;
