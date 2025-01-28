import React, { useState } from "react";
import "./styles/Regisztracio.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Regisztracio() {
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const registerData = { forename, surname, email, password };
            const response = await axios.post("/api/student/register", registerData);

            if (response.data.success) {
                console.log("Sikeres regisztráció:", response.data);
                setIsRegistering(true);
                setTimeout(() => {
                    navigate("/bejelentkezes"); // Átirányítás a bejelentkezési oldalra
                }, 2000); // 2 másodperc késleltetés
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
                        placeholder="Keresztnév"
                        onChange={(e) => setForename(e.target.value)}
                        className="regist-form-el"
                    />

                    <input
                        required
                        type="text"
                        placeholder="Vezetéknév"
                        onChange={(e) => setSurname(e.target.value)}
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

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="form-submit">Regisztrálj</button>
                </form>

                <h3>
                    Már van fiókod?<br />
                    <Link to="../bejelentkezes">Jelentkezz be itt!</Link>
                </h3>
            </div>
        </>
    );
}
