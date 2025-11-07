import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const LupaPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Email reset dikirim ke:", data.email);
        navigate("/verify-otp");
    };

    const validateEmail = (value) => {
        if (!value) {
            return "Email wajib diisi";
        }
        if (!validator.isEmail(value)) {
            return "Format email tidak valid";
        }
        return true;
    };
    

    const baseStyle =
        "w-full h-11 px-2.5 py-2 rounded-lg border-2 focus:ring-primary focus:border-primary placeholder-zinc-400 focus:outline-none";
    const defaultStyle = "border-primary";
    const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";
    const errorMessage = "mt-1 text-sm text-red-500";

    return (
        <div className="flex w-full h-screen bg-white focus:outline-none">
        {/* Bagian Kiri : latar */}
        <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
            <img
            src="/login.png"
            alt="Forgot Password"
            className="absolute inset-0 h-full w-full object-cover"
            />
        </div>

        {/* Bagian Kanan: form */}
        <div className="flex w-full items-center justify-center md:w-2/5">
            <div className="w-full max-w-md text-center">
            <h2 className="text-4xl font-bold text-zinc-800 mb-6">
                Lupa Kata Sandi
            </h2>
            <p className="text-base font-medium mb-11">
                Atur ulang kata sandi dan lanjutkan perjalanan
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="text-left mb-6">
                <label className="text-zinc-800 text-base font-semibold ">
                    Alamat Email
                </label>
                <input
                    type="email"
                    placeholder="Masukkan Alamat Email"
                    {...register("email", { required: "Email wajib diisi", validate: validateEmail, })}
                    className={`${baseStyle} ${
                    errors.email ? errorStyle : defaultStyle
                    }`}
                />
                {errors.email && (
                    <p className={errorMessage}>{errors.email.message}</p>
                )}
                </div>

                <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-xl text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                Lanjutkan
                </button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default LupaPassword;
