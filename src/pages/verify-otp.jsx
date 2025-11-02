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
        <div className="flex w-full h-screen bg-white">
        <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
            <img src="/login.png" alt="Verify OTP" className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="flex w-full items-center justify-center md:w-2/5">
            <div className="w-full max-w-md text-center">
            <h2 className="text-4xl font-bold text-zinc-800 mb-4">Masukkan kode verifikasi</h2>
            <p className="text-zinc-800 text-base font-medium mb-12">Kode 4 digit telah dikirim ke email Anda, silakan masukkan untuk verifikasi</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="flex justify-between px-14 mb-12">
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
                    className="w-14 h-14 bg-primary  rounded-lg text-center text-4xl font-bold text-white focus:outline-none"
                    />
                ))}
                </div>

                <button type="submit" className="w-[340px] py-3 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-blue-700">
                Verifikasi
                </button>

                <p className="mt-6">
                Belum menerima kode?{" "}
                <button onClick={handleResendCode} type="button" className="text-blue-600 text-sm font-medium hover:underline">
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
