import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const ResetSandi = () => {
    const baseStyle = "w-full h-11 px-2.5 py-2 rounded-lg border-2 focus:ring-blue-600 focus:border-blue-600 placeholder-zinc-400 focus:outline-none";
    const defaultStyle = "border-blue-600";
    const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";
    const errorMessage = "mt-1 text-sm text-red-500";

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch("password");

    const [isResetSuccess, setIsResetSuccess] = useState(false);

    const onSubmit = (data) => {
        console.log("Sandi baru telah diatur:", data.password);
        reset();
        setIsResetSuccess(true);
    };

    if (isResetSuccess) {
        return (
            <div className="flex w-full h-screen bg-white">
        {/* Kolom Kiri: latar*/}
        <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
            <img
            src="/login.png"
            alt="Latar belakang Kelana Lovina"
            className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
                
                {/* Kolom Kanan: Pesan Sukses */}
                <div className="flex w-full items-center justify-center md:w-2/5 p-8">
                    <div className="w-full max-w-sm text-center">
                        <FiCheckCircle className="w-20 h-20 text-blue-600 mx-auto mb-6" />
                        
                        <h2 className="text-3xl font-bold text-zinc-800 mb-3">
                            Kata sandi berhasil diatur ulang
                        </h2>
                        
                        <p className="text-zinc-600 text-base font-medium mb-8">
                            Gunakan kata sandi baru untuk masuk.
                        </p>
                        <Link to={"/login"} >
                        <button 
                            className="w-full py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Masuk
                        </button>
                        </Link >
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex w-full h-screen bg-white">
      {/* Kolom Kiri: latar */}
        <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
            <img
            src="/login.png"
            alt="Latar belakang Kelana Lovina"
            className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
            {/* Kolom Kanan: Form */}
            <div className="flex w-full items-center justify-center md:w-2/5 p-8">
                <div className="w-full max-w-sm">
                    <h2 className=" text-center text-4xl font-bold text-zinc-800 mb-3.5">Atur ulang kata sandi</h2>
                    <p className="text-zinc-600 text-base font-medium text-center mb-[50px]">Masukkan dan konfirmasi kata sandi baru Anda.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Field Kata Sandi Baru */}
                        <div>
                            <label className="block text-base font-semibold text-zinc-700 mb-2">Kata Sandi Baru</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukan Kata Sandi Baru"
                                    className={`${baseStyle} ${errors.password ? errorStyle : defaultStyle}`}
                                    {...register("password", { 
                                        required: "Kata sandi baru wajib diisi",
                                        minLength: { value: 8, message: "Minimal 8 karakter" }
                                    })}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEye className="w-5 h-5 text-gray-400" /> : <FiEyeOff className="w-5 h-5 text-gray-400" />}
                                </div>
                            </div>
                            {errors.password && <p className={errorMessage}>{errors.password.message}</p>}
                        </div>

                        {/* Field Konfirmasi Kata Sandi Baru */}
                        <div>
                            <label className="block text-base font-semibold text-zinc-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Konfirmasi Kata Sandi Baru"
                                    className={`${baseStyle} ${errors.confirmPassword ? errorStyle : defaultStyle}`}
                                    {...register("confirmPassword", {
                                        required: "Konfirmasi kata sandi wajib diisi",
                                        validate: value => value === password || "Kata sandi tidak cocok"
                                    })}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FiEye className="w-5 h-5 text-gray-400" /> : <FiEyeOff className="w-5 h-5 text-gray-400" />}
                                </div>
                            </div>
                            {errors.confirmPassword && <p className={errorMessage}>{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Tombol Submit */}
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            Atur ulang
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ResetSandi;