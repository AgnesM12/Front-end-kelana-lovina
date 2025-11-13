import React, {useRef} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    const otpRefs = useRef([]);

    const onSubmit = (data) => {
        const otpCode = Object.values(data).join('');
        console.log("Kode OTP:", otpCode);
        navigate("/reset-sandi");
    };

    // pindah ke kotak berikutnya
    const handleChange = (e, index) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');

        setValue(`otp${index + 1}`, numericValue);
        e.target.value = numericValue;
        if (numericValue && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    // mundur jika ada angka yang dihapus
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = () => {
        console.log("kode verifikasi sudah dikirim");
    };

    return (
        <div className="flex w-full h-screen bg-white flex-col md:flex-row">
        <div className="relative hidden md:flex h-full items-center justify-center bg-gray-500 md:w-3/5">
            <img src="/login.png" alt="Verify OTP" className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="flex w-full h-full items-center justify-center md:w-2/5 px-6 sm:px-10 py-10 md:py-0">
            <div className="w-full max-w-md text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 mb-4">Masukkan kode verifikasi</h2>
            <p className="text-zinc-800 text-sm sm:text-base font-medium mb-10">Kode 4 digit telah dikirim ke email Anda, silakan masukkan untuk verifikasi</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="flex justify-center gap-4 sm:gap-6 mb-10">
                {[1, 2, 3, 4].map((_, i) => (
                    <input
                    key={i}
                    maxLength={1}
                    {...register(`otp${i + 1}`)}
                    ref={(el) => (otpRefs.current[i] = el)}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-primary  rounded-lg text-center text-4xl font-bold text-white focus:outline-none"
                    />
                ))}
                </div>

                <button type="submit" className="w-full sm:w-[340px] py-3 bg-primary text-white text-lg sm:text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Verifikasi
                </button>

                <p className="mt-6 text-sm sm:text-base">
                Belum menerima kode?{" "}
                <button onClick={handleResendCode} type="button" className="text-blue-600 font-medium hover:underline">
                    Kirim ulang kode baru
                </button>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};

export default VerifyOTP;
