import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthContext from "../context/AuthContext"; 
import "./styles/Profil.css";

export default function Profil() {
    const navigate = useNavigate(); 
    const { logout, token } = useContext(AuthContext);  // Token használata a userEmail helyett
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`/api/student/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Token átadása az API kérésben
                    }
                });
                if (!response.ok) {
                    throw new Error("Hálózati hiba történt.");
                }
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Hiba a profiladatok betöltésekor:", error);
            }
        };

        fetchProfileData();
    }, [token]);  // A token változásakor újra lefut

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };

    if (!profileData) {
        return <p>Betöltés...</p>;
    }

    return (
        <div className="profil--hero-section">
            <div className="profil--data">
                <h2>Személyes adatok</h2>
                <p>Vezetéknév:</p>
                <div className="profil--el">
                    <p>{profileData.surename}</p>
                </div>

                <p>Keresztnév:</p>
                <div className="profil--el">
                    <p>{profileData.forename}</p>
                </div>

                <p>Email cím:</p>
                <div className="profil--el">
                    <p>{profileData.email}</p>
                </div>
                
                <button className="profil--logout" onClick={handleLogout}>
                    Kijelentkezés
                </button>
            </div>

            <div className="profil--progression">
                <h2>Előrehaladás</h2>
                
                <div className="profil--el">
                    <p>Teljesített hetek:</p>
                    <div className="weeks-grid">
                        {profileData.progression.completedWeeks.map((week, index) => (
                            <div
                                key={index}
                                className={`week-item ${week.completed ? 'completed' : ''}`}
                            >
                                {week.title}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profil--el">
                    <p>Teljesített próbadolgozatok</p>
                    <ul className="exams-list">
                        {profileData.progression.completedTests.map((exam, index) => (
                            <li
                                key={index}
                                className={`exam-item ${exam.completed ? 'completed' : ''}`}
                            >
                                {exam.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
