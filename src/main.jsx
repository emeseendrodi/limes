import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout'
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Tananyag from './pages/Tananyag'
import ProbaZH from './pages/ProbaZH'
import Profil from './pages/Profil'
import Bejelentkezes from './pages/Bejelentkezes'
import ErrorPage from './pages/ErrorPage'
import Regisztracio from './pages/Regisztracio'
import Feladat from './pages/Feladat'
import TananyagLayout from './components/TananyagLayout'


function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="regisztracio" element={<Regisztracio />}/>
        <Route path="bejelentkezes" element={<Bejelentkezes />}/>

        <Route path="tananyag" element={<TananyagLayout />}>
                        <Route index element={<Tananyag />} />
                        <Route path="feladat" element={<Feladat />} />
        </Route>

        <Route path="probazh" element={<ProbaZH />}/>
        <Route path="profil" element={<Profil />}/>
        <Route path="hiba" element={<ErrorPage />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
