import React from "react";
import "./styles/Regisztracio.css"

export default function Regisztracio(){
    return(
        <>
            <div className="regist-box">
                <h1>Regisztráció</h1>
                <form className="regist-form">
                    <input type="text" placeholder="Vezetéknév"  className="regist-form-el"/>
                    <input type="text" placeholder="Keresztnév"  className="regist-form-el" />
                    <input type="email" placeholder="Email cím"  className="regist-form-el"/>
                    <input type="password" placeholder="Jelszó"  className="regist-form-el"/>

                    <button type="submit" className="form-submit">Regisztráció</button>
                </form>

                <h3>Már van fiókod? <br></br>
                Jelentkezz be itt!</h3>
            </div>
        </>
    )
}