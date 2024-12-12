import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout'
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Tananyag from './pages/Tananyag'
import ProbaZH from './pages/ProbaZH'
import Profil from './pages/Profil'



function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="tananyag" element={<Tananyag />}/>
        <Route path="probazh" element={<ProbaZH />}/>
        <Route path="profil" element={<Profil />}/>
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
