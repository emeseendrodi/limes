import React from "react";
import "./pages-css/Home.css"

export default function Home(){


    return(
        <>
            <div className="home--hero-section">
                <div className="home--hero-textbox">
                    <h1>Szerezd meg az ötöst!</h1>
                    <h2>Gyakorolj minden héten!</h2>
                </div>

            <div className="home--userlogin">
                <div className="home--login">
                    <p>Regisztráció</p>
                </div>

                <div className="home--login">
                    <p>Bejelentkezés</p>
                </div>
            </div>
                
            </div>
        </>
    )
}