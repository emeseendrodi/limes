import React from "react";
import "./Header.css";

import { NavLink, Link } from "react-router-dom";


export default function Header(){

    return(
       
            <header>
                <div>
                    <img src="public/pte-logo.png" width={"80px"} height={"80px"}/>
                    <Link to="/"><img src="public/limes-logo.png" width={"140px"} className="limes-logo"/></Link>
                </div>
                
                
                <nav>
                    <NavLink className="nav-el"
                        to="/tananyag"
                    >Tananyag
                    </NavLink>

                    <NavLink className="nav-el"
                        to="/probazh"
        
                    >Próba ZH
                    </NavLink>
                    <NavLink className="nav-el"
                        to="/profil"
        
                    >Profil
                    </NavLink>
                </nav>
            </header>
       
    )
}