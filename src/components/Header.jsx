import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext"; 
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { token } = useContext(AuthContext);  

    //for small screensizes, there is a hamburger menu witch needs a toggle effect for closing and opening
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

            
            {// if the user is authenticated the navbar is shown
            token && (  
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
