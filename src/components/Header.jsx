import React from "react";
import "./Header.css";

import { NavLink } from "react-router-dom";


export default function Header(){

    return(
       
            <header>
                <div>
                    <img src="public/pte-logo.png" width={"80px"} height={"80px"}/>
                    <img src="public/limes-logo.png" width={"140px"} className="limes-logo"/>
                </div>
                
                
                <nav>
                    <NavLink
                        to="/tananyag"
                    >Tananyag
                    </NavLink>

                    <NavLink
                        to="/probazh"
        
                    >Próba ZH
                    </NavLink>
                    <NavLink
                        to="/profil"
        
                    >Profil
                    </NavLink>
                </nav>
            </header>
       
    )
}