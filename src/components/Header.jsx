import React, { useState, useEffect, useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext"; 
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { token } = useContext(AuthContext);  // Módosítottuk sessionToken-ről token-re

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        setMenuOpen(false);  // Zárja a menüt, amikor a route változik
        document.body.style.overflow = menuOpen ? "hidden" : "unset"; // Állítja az overflow-t menü állapotának megfelelően
    }, [location, menuOpen]); 

    return (
        <header>
            <div className="images">
                <img src="/pte-logo.png" className="pte-logo" alt="PTE logo" />
                <img src="/limes-logo.png" className="limes-logo" alt="Limes logo" />
            </div>

            {token && (  // Használjuk a token-t sessionToken helyett
                <>
                    <FontAwesomeIcon
                        icon={menuOpen ? faTimes : faBars}
                        className={`menu-icon ${menuOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                    />

                    <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                        <NavLink className="nav-el" to="/tananyag" onClick={closeMenu}>
                            Tananyag
                        </NavLink>
                        <NavLink className="nav-el" to="/probazh" onClick={closeMenu}>
                            Próba ZH
                        </NavLink>
                        <NavLink className="nav-el" to="/profil" onClick={closeMenu}>
                            Profil
                        </NavLink>
                    </nav>

                    {menuOpen && <div className="overlay" onClick={closeMenu}></div>}  {/* Ide került az overlay kód */}
                </>
            )}
        </header>
    );
}
