import React from "react";
import "./styles/Regisztracio.css"
import { Link } from "react-router-dom";

export default function Bejelentkezes(){
    return(
        <>
            <div className="regist-box">
                <h1>Bejelentkezés</h1>
                <form className="regist-form">
                    <input type="email" placeholder="Email cím"  className="regist-form-el"/>
                    <input type="password" placeholder="Jelszó"  className="regist-form-el"/>
                    

                    <button type="submit" className="form-submit">Bejelentkezés</button>
                </form>

                <h3>Még nincs fiókod?<br></br> 
                <Link to="../regisztracio">Regisztrálj itt!</Link> </h3>
            </div>
        </>
    )
}