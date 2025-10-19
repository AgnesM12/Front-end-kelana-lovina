import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';


const Login = () => {
    // State untuk menampilkan/menyembunyikan kata sandi
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="flex w-full h-screen bg-white">
            
            {/* Kolom Kiri: Gambar Latar */}
            <div className="relative hidden h-full items-center justify-center bg-gray-500 md:flex md:w-3/5">
                <img 
                    src="/login.png" 
                    alt="Latar belakang Kelana Lovina" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            {/* Kolom Kanan: Form Login */}
            <div className="flex w-full items-center justify-center overflow-hidden bg-white md:w-2/5">
                <div className="w-full max-w-md flex-col justify-start items-center">
                    <div className='text-center'>
                        <h2 className="text-3xl font-bold text-zinc-800">Selamat datang kembali!</h2>
                        <p className="mt-3 text-zinc-800">Masuk untuk memulai perjalananmu</p>
                    </div>

                    <form className="space-y-6 w-full mt-8">
                        {/* Input Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-800">Alamat Email</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required className="w-full border-2 border-primary h-11 px-2.5 py-2 rounded-lg focus:border-prima focus:ring-primary" placeholder="Masukan Alamat Email"/>
                            </div>
                        </div>

                       {/* Input Kata Sandi */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-800">
                    Kata Sandi
                </label>
                    <div className="relative mt-1">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border-primary h-11 px-2.5 py-2 border-2 focus:border-primary focus:ring-primary"
                            placeholder="Masukan Kata Sandi"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary hover:text-primary">
                                {showPassword ? (<FiEye size={20} />) : (<FiEyeOff size={20} />)
                };
                    </button>
                    </div>
            </div>
                <div className="text-right text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Lupa kata sandi?</a>
                </div>
                {/* Button Masuk */}
                <div>
                            <button type="submit" className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                                Masuk
                            </button>
                        </div>
                        <p className="text-center text-base font-normal text-black">
                        Tidak memiliki akun?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Buat sekarang</a>
                    </p>
                    </form>

                    <div className="flex items-center text-center w-full my-8">
                        <hr className="flex-grow border-zinc-800"/>
                        <span className="px-4 text-sm font-semibold text-zinc-800">Atau</span>
                        <hr className="flex-grow border-zinc-800"/>
                    </div>
                    
                    {/* Button Google */}
                    <div className='w-full'>
                        <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-primary px-4 py-3 text-sm font-medium text-zinc-800">
                            <img className="h-5 w-5" src="/devicon-google.svg" alt="Google logo" />
                            <span>Lanjutkan dengan Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;