import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import  AuthContext from "../context/AuthContext"; 
import "./styles/Profil.css";

export default function Profil() {
    const navigate = useNavigate(); 
    const { logout } = useContext(AuthContext); 

    const weeks = Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        completed: i < 2,
    }));

    const exams = [
        { id: 1, name: "1. zh", completed: true },
        { id: 2, name: "2. zh", completed: false },
        { id: 3, name: "Összetett zh", completed: false }
    ];

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };

    return (
        <div className="profil--hero-section">
            <div className="profil--data">
                <h2>Személyes adatok</h2>
                
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

                {/* Logout button */}
            <div >
                <button className="profil--logout" onClick={handleLogout}>
                    Kijelentkezés
                </button>
            </div>
            </div>

            <div className="profil--progression">
                <h2>Előrehaladás</h2>
                
                <div className="profil--el">
                    <p>Teljesített hetek:</p>
                    <div className="weeks-grid">
                        {weeks.map((week) => (
                            <div
                                key={week.week}
                                className={`week-item ${week.completed ? 'completed' : ''}`}
                            >
                                {week.week}. hét
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profil--el">
                    <p>Teljesített próbadolgozatok</p>
                    <ul className="exams-list">
                        {exams.map((exam) => (
                            <li
                                key={exam.id}
                                className={`exam-item ${exam.completed ? 'completed' : ''}`}
                            >
                                {exam.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            
        </div>
    );
}
