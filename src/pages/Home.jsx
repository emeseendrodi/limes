import React from "react";
import "./styles/Home.css"
import { Link } from "react-router-dom";

export default function Home(){

//Home page 
    return(
       
            <div className="home--hero-section">
                <div className="home--hero-textbox">
                    <h1>Szerezd meg az ötöst!</h1>
                    <h2>Gyakorolj minden héten!</h2>
                </div>
   
            <div className="home--login">
            <Link className="home--link" to="/regisztracio"> 
                    <div className="home--login-button">
                        Regisztráció
                    </div>
                </Link>

                <Link className="home--link" to="/bejelentkezes">
                    <div className="home--login-button">
                    Bejelentkezés
                    </div>
                </Link>
            </div>
                
            </div>
        
    )
}