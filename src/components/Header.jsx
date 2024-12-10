import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Header(){
    return(
       
            <div className="header--container">
                <img src="public/pte-logo.png" width={"95px"} height={"95px"}/>
                <h1>Limes</h1>
                <FontAwesomeIcon icon={faArrowRight} />
                <nav>
                    
                </nav>
            </div>
       
    )
}