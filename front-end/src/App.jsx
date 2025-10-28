import { Routes, Route } from 'react-router-dom';
import MenuPaket from './pages/menuPaket';
import DetailPaket from './pages/detailPaket';
import MenuPembayaran from './pages/menuPembayaran';
import Tiket from './pages/tiket';

function App() {
  return (
    <Routes>
      <Route path="/"/>
      <Route path="/menuPaket" element={<MenuPaket />} />
      <Route path="/menuPaket/detailPaket" element={<DetailPaket />} />
      <Route path="/menuPaket/detailPaket/menuPembayaran" element={<MenuPembayaran />} />
      <Route path="/menuPaket/detailPaket/menuPembayaran/tiket" element={<Tiket />} />
    </Routes>
  );
}

export default App;
