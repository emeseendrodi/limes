import React from "react";

import "./styles/Profil.css"

export default function Profil(){
    return(
        <div className="profil--hero-section">
            <div className="profil--data">
                <h2>Személyes adatok </h2>

                <p>Vezetéknév:</p>
                <div className="profil--el">
                    <p>Endrődi</p>
                </div>

                <p>Keresztnév:</p>
                <div className="profil--el">
                    <p>Emese</p>
                </div>

                <p>Email cím:</p>
                <div className="profil--el">
                    <p>endrodi.emese@gmail.com</p>
                </div>
            </div>

            <div className="profil--progression">
            <h2>Előrehaladás </h2>
                <div className="profil--el">
                    <p>Teljesített hetek:</p>
                    <ul>
                        <li>1. hét</li>
                        <li>2. hét</li>
                        

                    </ul>
                </div>
                <div className="profil--el">
                    <p>Teljesített probadolgozatok</p>
                    <ul>
                        <li>1. zh</li>
                        <li>2. zh</li>
                    </ul>
                </div>
            </div>


        </div>
    )
}