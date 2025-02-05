import React, { useState, useEffect, useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext"; 
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { token } = useContext(AuthContext);  

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <div className="images">
                <img src="/pte-logo.png" className="pte-logo" alt="PTE logo" />
                <img src="/limes-logo.png" className="limes-logo" alt="Limes logo" />
            </div>

            {token && (  
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

                    {menuOpen && <div className="overlay" onClick={closeMenu}></div>}  
                </>
            )}
        </header>
    );
}
