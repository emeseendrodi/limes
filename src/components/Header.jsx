import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext"; 
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { userEmail } = useContext(AuthContext); 

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        if (!menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
    };

    useEffect(() => {
        setMenuOpen(false);
        document.body.style.overflow = "unset";
    }, [location]);

    return (
        <>
            <header>
                <div className="images">
                    <img src="/pte-logo.png" className="pte-logo" alt="PTE logo" />
                        <img src="/limes-logo.png" className="limes-logo" alt="Limes logo" />
                </div>

                {userEmail && (
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
                </>
                )}

            </header>

            {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </>
    );
}
