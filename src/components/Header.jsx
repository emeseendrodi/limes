import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);  
    const location = useLocation(); 

    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    
    const closeMenu = () => {
        setMenuOpen(false);
    };

   
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <header>
            <div className="images">
                <img src="public/pte-logo.png" className="pte-logo" />
                <Link to="/"><img src="public/limes-logo.png" className="limes-logo" /></Link>
            </div>

           
            <FontAwesomeIcon icon={faBars} className="fa-bars" onClick={toggleMenu} />

            
            <nav className={` header-nav ${menuOpen ? 'open' : ''}`}>
                <NavLink className="nav-el" to="/tananyag" onClick={closeMenu}>Tananyag</NavLink>
                <NavLink className="nav-el" to="/probazh" onClick={closeMenu}>Próba ZH</NavLink>
                <NavLink className="nav-el" to="/profil" onClick={closeMenu}>Profil</NavLink>
            </nav>
        </header>
    );
}