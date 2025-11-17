import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch("password");

    const onSubmit = (data) => {
        console.log("Register berhasil:", data);
        reset();
    };

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

    const baseStyle =
        "w-full h-11 px-2.5 py-2 rounded-lg border-2 focus:ring-primary focus:border-primary placeholder-zinc-400 focus:outline-none text-sm sm:text-base";
    const defaultStyle = "border-primary";
    const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";
    const errorMessage = "mt-1 text-xs sm:text-sm text-red-500";

    return (
        <div className="flex w-full h-screen bg-white">
        <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
            <img src="/login.png" alt="Register" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex w-full md:w-1/2 lg:w-2/5 items-center justify-center bg-white p-6 sm:p-10">
            <div className="w-full max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 text-center mb-3 sm:mb-4">Daftar Sekarang!</h2>
            <p className="text-sm sm:text-base font-medium text-zinc-800 text-center mb-8 sm:mb-12">Daftar sekarang dan mulai perjalanamu</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                <label className="block text-sm sm:text-base font-semibold text-zinc-800">Alamat Email</label>
                <input
                    type="email"
                    placeholder="Masukkan Alamat Email"
                    {...register("email", {
                    required: "Email wajib diisi",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Format email tidak valid" },
                    })}
                    className={`${baseStyle} ${errors.email ? errorStyle : defaultStyle}`}
                />
                {errors.email && <p className={errorMessage}>{errors.email.message}</p>}
                </div>

                <div>
                <label className="block text-sm sm:text-base font-semibold text-zinc-800">Kata Sandi</label>
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    {...register("password", {
                        required: "Password wajib diisi",
                        validate: validatePassword,
                    })}
                    className={`${baseStyle} pr-10 ${errors.password ? errorStyle : defaultStyle}`}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-primary"
                    >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                </div>
                {errors.password && <p className={errorMessage}>{errors.password.message}</p>}
                </div>

                <div>
                <label className="block text-sm sm:text-base font-semibold text-zinc-800">Konfirmasi Kata Sandi</label>
                <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi Kata Sandi"
                    {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) => value === password || "Password tidak cocok",
                    })}
                    className={`${baseStyle} pr-10 ${errors.confirmPassword ? errorStyle : defaultStyle}`}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-primary"
                    >
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </button>
                </div>
                {errors.confirmPassword && <p className={errorMessage}>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                <div className="flex items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    {...register("terms", { required: "Anda harus menyetujui ketentuan & privasi" })}
                                    className="h-4 w-4 sm:h-5 sm:w-5 mt-1 sm:mt-0 rounded border-gray-400 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="ml-2 text-xs sm:text-sm font-semibold text-black">
                                    Saya menyetujui{" "}
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-primary text-sm font-semibold hover:underline">
                                        Ketentuan & Privasi
                                    </a>
                                </label>
                            </div>
                            {errors.terms && <p className={errorMessage}>{errors.terms.message}</p>}
                        </div>
                <button type="submit" className="w-full py-3 sm:py-3.5 bg-blue-600 text-white text-sm sm:text-base font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Daftar
                </button>

                <p className="text-center text-xs sm:text-sm mt-4 text-zinc-700">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Masuk di sini
                </Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Register;
