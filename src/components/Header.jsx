import React from "react";
import "./Header.css";

import { NavLink } from "react-router-dom";


export default function Header(){

    return(
       
            <header>
                <div>
                    <img src="public/pte-logo.png" width={"95px"} height={"95px"}/>
                    <img src="public/limes-logo.png" width={"95px"}/>
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