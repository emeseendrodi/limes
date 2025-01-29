import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tananyag from './pages/Tananyag';
import ProbaZH from './pages/ProbaZH'; // ProbaZH oldal importálása
import Profil from './pages/Profil';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import Feladat from './pages/Feladat';
import TananyagLayout from './components/TananyagLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dolgozat from './pages/Dolgozat'; // Dolgozat oldal importálása

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="regisztracio" element={<Regisztracio />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />

            <Route element={<ProtectedRoute />}>
              <Route path="tananyag" element={<TananyagLayout />}>
                <Route index element={<Tananyag />} />
                <Route path="feladat/:weeklyLectureId" element={<Feladat />} />
                
              </Route>

              <Route path="probazh" element={<ProbaZH />} /> 
              <Route path="profil" element={<Profil />} />
              <Route path="dolgozat" element={<Dolgozat />} /> 
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
