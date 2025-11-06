import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


// Layout
import Layout from "./components/layout.jsx";

// halaman
import Beranda from "./pages/beranda.jsx";
import Acara from "./pages/acara.jsx";
import RencanaPerjalanan from "./pages/rencana-perjalanan.jsx";
import Destinasi from "./pages/destinasi.jsx";
import Ulasan from "./pages/ulasan.jsx";
import Login from "./pages/login.jsx";
import Profil from "./pages/profil.jsx";
import HalamanGaleriPenuh from "./pages/galeri.jsx";
import Paket from "./pages/paket.jsx";
import HalamanAcaraLengkap from "./pages/acara-lengkap.jsx";
import DetailAcara from "./pages/detailAcara.jsx";
import DetailPaket from "./pages/detailPaket.jsx";
import RiwayatPemesanan from "./pages/riwayat-pemesanan.jsx";
import ReviewRating from "./pages/review-rating.jsx";
import Album from "./pages/album.jsx";

// login page
import Register from "./pages/register.jsx";
import LupaPassword from "./pages/lupa-password.jsx";
import VerifyOTP from "./pages/verify-otp.jsx";
import ResetSandi from "./pages/reset-sandi.jsx";
import MenuPembayaran from "./pages/menuPembayaran.jsx";
import Tiket from "./pages/tiket.jsx";


import "./index.css";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout/>}
      >
        <Route index element={<Beranda />} />
        <Route path="galeri" element={<HalamanGaleriPenuh />} />
        <Route path="paket" element={<Paket />} />
        <Route path="acara" element={<Acara />} />
        <Route path="acara/lengkap" element={<HalamanAcaraLengkap />} />
        <Route path="rencana-perjalanan" element={<RencanaPerjalanan />} />
        <Route path="destinasi" element={<Destinasi />} />
        <Route path="ulasan" element={<Ulasan />} />
        <Route path="/acara/:slug" element={<DetailAcara />} />
        <Route path="/paket/:slug" element={<DetailPaket isLoggedIn={isLoggedIn} />} />

        <Route
          path="login"
          element={<Login onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} />}
        />
        <Route path="register" element={<Register />} />
        <Route path="lupa-password" element={<LupaPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="reset-sandi" element={<ResetSandi />} />
        <Route
          path="profil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profil user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="riwayat-pemesanan" element={<RiwayatPemesanan />} />
        <Route path="review-rating" element={<ReviewRating />} />
        <Route path="unggah-foto-video" element={<Album />} />

        <Route path="/paket/:slug/menuPembayaran" element={<MenuPembayaran />} />
        <Route path="/paket/:slug/menuPembayaran/tiket" element={<Tiket />} />

      </Route>  
    </Routes>
  );
}

export default App;