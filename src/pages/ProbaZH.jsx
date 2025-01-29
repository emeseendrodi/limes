import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../context/AuthContext"; // AuthContext importálása

export default function ProbaZH() {
  const { userEmail } = useContext(AuthContext); // AuthContextből kinyerjük az emailt
  const [testOverview, setTestOverview] = useState([]); // Az API válaszát itt tároljuk

  // Teszt címek átalakítása
  const getTestTitle = (test) => {
    switch (test) {
      case "FIRST":
        return "1. Próbadolgozat";
      case "SECOND":
        return "2. Próbadolgozat";
      case "LAST":
        return "Összetett próbadolgozat";
      default:
        return test; // Ha valami más értéket kapunk, visszaadjuk azt
    }
  };

  useEffect(() => {
    if (userEmail) {
      // Ha van email, meghívjuk az API-t
      Axios.get(`/api/test/overview?email=${userEmail}`)
        .then((response) => {
          // A válasz alapján módosítjuk a test.title értékeit
          const updatedOverview = response.data.map((test) => ({
            ...test,
            title: getTestTitle(test.title), // Teszt címek frissítése
          }));
          setTestOverview(updatedOverview); // Az API válasz tárolása
        })
        .catch((error) => {
          console.error("API hiba:", error);
        });
    }
  }, [userEmail]); // Amikor az email változik, újra lefut

  if (!testOverview.length) {
    return <p>Betöltés...</p>; // Ha még nincs adat, akkor betöltés szöveg
  }

  return (
    <div className="tananyag-box">
      <ul>
        {testOverview.map((test, index) => (
          <li className="week" key={index}>
            <h3>{test.title}</h3>
            {/* Az isTestCompleted alapján döntjük el, hogy az "Oldd meg a tesztet!" linket mutatjuk-e */}
            {test.isTestCompleted ? (
              <p>A tesztet már megoldottad!</p>
            ) : (
              <Link to={`/zh?testType=${test.title}`}>
                Oldd meg a tesztet!
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
