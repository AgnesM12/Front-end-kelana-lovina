import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./component/layout.jsx";

// halaman
import Beranda from "./pages/beranda.jsx";
import Acara from "./pages/acara.jsx";
import RencanaPerjalanan from "./pages/rencana-perjalanan.jsx";
import Destinasi from "./pages/destinasi.jsx";
import Ulasan from "./pages/ulasan.jsx";
import Login from "./pages/login.jsx";
import Profil from "./pages/profil.jsx";

import "./index.css";


function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user_data');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        }
      >
        <Route index element={<Beranda />} />
        <Route path="acara" element={<Acara />} />
        <Route path="rencana-perjalanan" element={<RencanaPerjalanan />} />
        <Route path="destinasi" element={<Destinasi />} />
        <Route path="ulasan" element={<Ulasan />} />
        <Route
          path="login"
          element={<Login onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="profil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profil user={user} />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;


