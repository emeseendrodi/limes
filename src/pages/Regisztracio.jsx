import React, { useState } from "react";
import "./styles/Regisztracio.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Regisztracio() {
    const [forename, setForename] = useState("");
    const [surename, setSurename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            setErrorMessage("A regisztrációhoz el kell fogadnod az adatkezelési feltételeket.");
            return;
        }

        try {
            const registerData = { forename, surename, email, password };
            const response = await axios.post("/api/student/register", registerData);

            if (response.data.success) {
                console.log("Sikeres regisztráció:", response.data);
                setIsRegistering(true);
                setTimeout(() => {
                    navigate("/bejelentkezes");
                }, 1500);
            } else {
                setErrorMessage(response.data.message || "Hiba történt a regisztráció során.");
            }
        } catch (error) {
            console.error("Register error:", error);
            setErrorMessage("Hiba történt a regisztráció során. Próbáld újra.");
        }
    };

    if (isRegistering) {
        return (
            <div className="regist-box">
                <h1>Sikeres regisztráció!</h1>
                <p>Kérlek várj, amíg átirányítunk a bejelentkezési oldalra...</p>
            </div>
        );
    }

    return (
        <>
            <div className="regist-box">
                <h1>Regisztráció</h1>
                <form className="regist-form" onSubmit={handleRegister}>
                    <input
                        required
                        type="text"
                        placeholder="Vezetéknév"
                        onChange={(e) => setSurename(e.target.value)}
                        className="regist-form-el"
                    />

                    <input
                        required
                        type="text"
                        placeholder="Keresztnév"
                        onChange={(e) => setForename(e.target.value)}
                        className="regist-form-el"
                    />

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
                    
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="consent"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="consent">Beleegyezek az adataim eltárolásába.</label>
                        
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="form-submit" disabled={!isChecked} style={{ backgroundColor: isChecked ? "white" : "#ccc", cursor: isChecked ? "pointer" : "not-allowed" }}>Regisztrálj</button>
                </form>

                <h3>
                    Már van fiókod?<br />
                    <Link to="../bejelentkezes">Jelentkezz be itt!</Link>
                </h3>
            </div>
        </>
    );
}
