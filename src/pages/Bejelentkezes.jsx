import React from "react";
import "./styles/Regisztracio.css"

export default function Bejelentkezes(){
    return(
        <>
            <div className="regist-box">
                <h1>Bejelentkezés</h1>
                <form className="regist-form">
                    <input type="email" placeholder="Email cím"  className="regist-form-el"/>
                    <input type="password" placeholder="Jelszó"  className="regist-form-el"/>
                </form>

                <h3>Még nincs fiókod?<br></br> Regisztrálj itt!</h3>
            </div>
        </>
    )
}