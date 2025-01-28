import React, { useState } from "react";
import "./styles/Regisztracio.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Bejelentkezes() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const response = await axios.post("/api/student/login", loginData);

            if (response.data.success) {
                console.log("Sikeres bejelentkezés:", response.data);
                setIsLoggingIn(true);
                setTimeout(() => {
                    navigate("/profil"); 
                }, 3000);
            } else {
                setErrorMessage(response.data.message || "Hibás bejelentkezési adatok.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Hiba történt a bejelentkezés során. Próbáld újra.");
        }
    };

    if (isLoggingIn) {
        return (
            <div className="regist-box">
                <h1>Sikeres bejelentkezés!</h1>
                <p>Kérlek várj, amíg átirányítunk a profil oldaladra...</p>
            </div>
        );
    }

    return (
        <>
            <div className="regist-box">
                <h1>Bejelentkezés</h1>
                <form className="regist-form" onSubmit={handleLogin}>
                    <input
                        required
                        type="email"
                        placeholder="Email cím"
                        onChange={(e) => setEmail(e.target.value)}
                        className="regist-form-el"
                    />

                    <input
                        required
                        type="password"
                        placeholder="Jelszó"
                        onChange={(e) => setPassword(e.target.value)}
                        className="regist-form-el"
                    />

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="form-submit">Bejelentkezés</button>
                </form>

                <h3>
                    Még nincs fiókod?<br />
                    <Link to="../regisztracio">Regisztrálj itt!</Link>
                </h3>
            </div>
        </>
    );
}
