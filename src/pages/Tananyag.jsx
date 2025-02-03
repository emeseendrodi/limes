import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./styles/Tananyag.css";

export default function Tananyag() {
  const [lectures, setLectures] = useState([]);
  const { token } = useContext(AuthContext); 

  useEffect(() => {
    const fetchLectures = async () => {
      if (token) { 
        try {
          const response = await axios.get("/api/lecture/overview", {
            headers: {
              "Authorization": `Bearer ${token}`, 
            },
          });
          setLectures(response.data);
        } catch (error) {
          console.error("Hiba történt az előadások lekérésekor:", error);
        }
      } else {
        console.error("Nincs bejelentkezett felhasználó (token)");
      }
    };

    fetchLectures();
  }, [token]); 

  return (
    <div className="tananyag-box">
      <ul>
        {lectures.length === 0 ? (
          <li>Nincs elérhető tananyag.</li>
        ) : (
          lectures.map((week) => (
            <li key={week.weekTitle}>
              <div className="week">
                <h3>{week.weekTitle}</h3>
                {week.weekylLecture.map((lecture) => (
                  <Link to={`feladat/${lecture.weeklyLectureId}`} key={lecture.weeklyLectureId}>
                    <h2>{lecture.weeklyLectureTitle}</h2>
                  </Link>
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
