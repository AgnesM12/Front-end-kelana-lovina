    import React, {useState} from "react";
    import { FiEye, FiEyeOff } from "react-icons/fi";
    import { useForm } from "react-hook-form";
    import { Link } from "react-router-dom";
    import validator from "validator";

    import { useNavigate } from "react-router-dom";
    import { useDispatch } from "react-redux";
    import { loginSuccess } from "../redux/slice";


    const Login = () => {
      
      const {
        register,
        handleSubmit,
        formState: {errors},
      } = useForm();

      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();

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

      const validateEmail = (value) => {
        if (!value) {
          return "Email wajib diisi";
        }
        if (!validator.isEmail(value)) {
          return "Format email tidak valid";
        }
        return true;
      };
      const handleLogin = async (data) => {
        try {
          const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
      
          if (!response.ok || !result.success) {
            alert(result.message || "Login gagal");
            return;
          }
      
          localStorage.setItem("token", result.token);
      
          const userData = {
            id: result.user.id,
            email: result.user.email,
            username: result.user.username || "Pengguna",
            profilePic: result.user.profilePic || "/profileDefault.jpg",
          };
      
          localStorage.setItem("user_data", JSON.stringify(userData));
      
          dispatch(loginSuccess(userData));
          navigate("/"); 
        } 

        catch (error) {
          console.error("Login Error:", error);
          alert("Terjadi kesalahan saat login");
        }
      };
      

      const baseStyle = "w-full h-11 px-2.5 py-2 rounded-lg border-2 focus:ring-primary focus:border-primary placeholder-zinc-400 focus:outline-none";
      const defaultStyle = "border-primary";
      const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";
      const errorMessage = "mt-1 text-xs sm:text-sm text-red-500";

      return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-white">
          {/* Kolom Kiri: latar */}
          <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 items-center justify-center bg-gray-500">
            <img
              src="/login.png"
              alt="Latar belakang Kelana Lovina"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {/* Kolom Kanan: Form Login */}
          <div className="flex w-full md:w-1/2 lg:w-2/5 items-center justify-center bg-white p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">
                  Selamat datang kembali!
                </h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-800">
                  Masuk untuk memulai perjalananmu
                </p>
              </div>
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 w-full">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-800"
                  >
                    Alamat Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      placeholder="Masukan Alamat Email"
                      {...register("email", {
                        required: "Email wajib diisi",
                        validate: validateEmail,
                      })}
                      className={`${baseStyle} ${
                        errors.email ? errorStyle : defaultStyle
                      }`}
                    />
                    {errors.email && (
                      <p className={errorMessage}>{errors.email.message}</p>
                    )}
                  </div>
                </div>
                {/* Kata Sandi */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-800"
                  >
                    Kata Sandi
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukan Kata Sandi"
                      autoComplete="current-password"
                      {...register("password", {
                        require: "Password wajib diisi",
                        validate: validatePassword
                      })}
                      className={`${baseStyle} pr-10 ${
                        errors.password ? errorStyle : defaultStyle
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute  h-11 inset-y-0 right-0 flex items-center pr-3 ${
                        errors.password ? 'text-red-500' : 'text-primary'
                    }`}
                    >
                      {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                    {errors.password && (
                      <p className={errorMessage}>{errors.password.message}</p>
                    )}
                  </div>
                </div>
                {/* Lupa kata sandi */}
                <div className="text-right text-xs sm:text-sm">
                  <Link to={"/lupa-password"}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                {/* Button Masuk */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-blue-700"
                  >
                    Masuk
                  </button>
                </div>
                <p className="text-center tetx-sm sm:text-base text-black">
                  Tidak memiliki akun?{" "}
                  <Link to={"/register"}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Buat sekarang
                  </Link>
                </p>
              </form>

              <div className="flex items-center text-center w-full my-6 sm:my-8">
                <hr className="flex-grow border-zinc-800" />
                <span className="px-3 sm:px-4 text-xs sm:text-sm font-semibold text-zinc-800">
                  Atau
                </span>
                <hr className="flex-grow border-zinc-800" />
              </div>
              {/* Button Google */}
              <div className="w-full">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-primary px-4 py-3 text-sm sm:text-base font-medium text-zinc-800"
                >
                  <img
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    src="/devicon-google.svg"
                    alt="Google logo"
                  />
                  <span>Lanjutkan dengan Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default Login;