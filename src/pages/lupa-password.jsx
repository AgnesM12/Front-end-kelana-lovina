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
        "w-full h-11 px-2.5 py-2 rounded-lg border-2 focus:ring-primary focus:border-primary placeholder-zinc-400 focus:outline-none text-sm sm:text-base";
    const defaultStyle = "border-primary";
    const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";
    const errorMessage = "mt-1 text-xs sm:text-sm text-red-500";

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-white">
        {/* Bagian Kiri : latar */}
        <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 items-center justify-center bg-gray-500">
            <img
            src="/login.png"
            alt="Forgot Password"
            className="absolute inset-0 h-full w-full object-cover"
            />
        </div>

        {/* Bagian Kanan: form */}
        <div className="flex w-full  h-full md:w-1/2 lg:w-2/5 items-center justify-center bg-white p-6 sm:p-10">
            <div className="w-full max-w-md text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 mb-4 sm:mb-6">
                Lupa Kata Sandi
            </h2>
            <p className="text-sm sm:text-base font-medium mb-8 sm:mb-11 text-zinc-700">
                Atur ulang kata sandi dan lanjutkan perjalanan
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 w-full">
                <div className="text-left mb-6">
                <label className="text-zinc-800 text-sm sm:text-base font-semibold ">
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
